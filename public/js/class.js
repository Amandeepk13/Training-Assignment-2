document.addEventListener("DOMContentLoaded", async () => {
  const uuid = window.location.pathname.split("/").pop();
  const classContent = document.getElementById("class-content");
  const classInfo = document.getElementById("class-info");
  const toggleBtn = document.getElementById("toggle-btn");
  const tableContainer = document.getElementById("class-table-container");

  const fetchData = async () => {
    const isqueryTrue = toggleBtn.checked;

    try {
      const res = await fetch(`/api/class/${uuid}?flag=${isqueryTrue}`);

      if (!res.ok) {
        classContent.innerHTML = "<p>Error</p>";
        return;
      }

      const classData = await res.json();

      classContent.textContent = `
         Welcome to class ${classData.name}!
      `;

      classInfo.textContent = `
         From ${new Date(classData.startDate).toDateString()} to ${new Date(classData.endDate).toDateString()}
      `;

      let rowsHtml = "";
      classData.rows.forEach(row => {
         rowsHtml += `
            <tr>
               <td> ${row.rowName} </td>
               <td> ${row.flag} </td>
            </tr>
         `;
      });

      tableContainer.innerHTML = `
         <table class = "basic-table">
            <thead>
                <tr>
                   <th> Row Name </th>
                   <th> Flag </th>
               </tr>
            </thead>
            <tbody>
               ${rowsHtml}
            </tbody>
         </table>
      `;


    } catch (err) {
      console.error("Error:", err);
    }
  };

  toggleBtn.addEventListener('change', fetchData);
  fetchData();

});

document.addEventListener("DOMContentLoaded", async () => {
  const usertypeSelect = document.getElementById("user-type");

  try {
    const response = await fetch("/api/user");

    if (!response.ok) {
      window.location.href = "/login";
      return;
    }

    const userData = await response.json();
    const storedUsername = userData.username;

    usertypeSelect.options[0].textContent = storedUsername;
  } catch (err) {
    console.error("Error:", err);
  }

  usertypeSelect.addEventListener("change", async (e) => {
    if (e.target.value === "logout") {
      const response = await fetch("/logout");
      if (response.ok) {
        window.location.href = "/login";
      }
    }
  });
});

