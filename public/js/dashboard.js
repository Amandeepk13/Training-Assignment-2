document.addEventListener('DOMContentLoaded', () => { 

const cardHolder = document.getElementById('card-holder');
const filterOptions = document.querySelector('.filter-options');

async function displayClasses() {

    try{
        const response = await fetch('/api/classes');
        const presentClasses = await response.json();

        

        if(!presentClasses || presentClasses.length === 0){
            cardHolder.innerHTML = `<p class="no-class">No classes available, First create a class.</p>`;
            return;
        }
        
        presentClasses.forEach(data => {
        const card = `
           <div class="card" data-uuid="${data.uuid}" data-startDate="${data.startDate}" data-endDate="${data.endDate}">
                    <div class="card-header">
                        <div class="left-header">
                            <h4>${data.name}</h4>
                        </div>
                        
                    </div>
                    <div class="card-body">
                        <div class="card-add">
                            <div class="add-box btn-to-add">
                                <div class="add-box-icon">+</div>
                                <div class="add-box-text">Add</div>
                            </div>
                            

                        </div>
                        <div class="course-info">
                            <div class="card-icons">
                                <div class="icon-item data">
                                    <i class="fas fa-chart-bar"></i>
                                    <span>Class Data</span>
                                </div>
                                <div class="icon-item">
                                    <i class="fas fa-tasks"></i>
                                    <span>Assignments</span>
                                </div>
                                <div class="icon-item">
                                    <i class="fas fa-book"></i>
                                    <span>Materials</span>
                                </div>
                            </div>

                        </div>

                    </div>
             </div>
         `;
         cardHolder.insertAdjacentHTML('beforeend', card);

        if(filterOptions){
            const newfilterChoice = document.createElement('div');
            newfilterChoice.className = "filter-choice";
            newfilterChoice.innerHTML = ` <input type="checkbox" class="filter-check" value="${data.name}"> ${data.name}`;

        filterOptions.appendChild(newfilterChoice);
        }

       });
   } catch(err) {
        console.error('Error while fetching classes:', err); 
   }
}
displayClasses();

});

document.addEventListener('DOMContentLoaded', async () => {
    const usertypeSelect = document.getElementById('user-type');
    const welcomeMsg = document.querySelector('.welcome-msg');

    try{
        const response = await fetch('/api/user');

        if(!response.ok){
            window.location.href = '/login';
            return;
        }

        const userData = await response.json();
        const storedUsername = userData.username;

        welcomeMsg.textContent = `Hi ${storedUsername}!`;
        
        usertypeSelect.options[0].textContent = storedUsername;

    } catch(err){
        console.error('Error:', err);
    }

    usertypeSelect.addEventListener('change', async (e) => {
         if(e.target.value === 'logout'){
            const response = await fetch('/logout');
            if(response.ok){
                window.location.href = '/login';
            }
         }
    });

});

document.addEventListener('DOMContentLoaded', () => {
   const cardHolder = document.getElementById('card-holder');

   if(cardHolder){
       cardHolder.addEventListener('click', (e) => {

           const addBtn = e.target.closest('.btn-to-add');
           if(addBtn){
               const parentEle = addBtn.parentElement;
               const newBox = document.createElement('div');
               newBox.classList = 'add-box';
               newBox.innerHTML = `
                   <div class="add-box-icon">
                      <i class="fas fa-book"></i>
                   </div>
                   <div class="add-box-text">Course</div>
               `;
               parentEle.insertBefore(newBox, addBtn);
               return;
           }

           const card = e.target.closest('.card');
           if(card){
               const uuid = card.dataset.uuid;
               window.location.href = `/class/${uuid}`;
           }

       });
   }

});
