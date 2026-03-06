const classForm = document.querySelector('.class-form');

classForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newClass = {
        name : document.getElementById('form-class-title').value,
        startDate : document.getElementById('start-date').value,
        endDate : document.getElementById('end-date').value
        
    }
    try {
        const response = await fetch('/api/create-class', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newClass)
        });

        if (response.ok) {
            window.location.href = '/dashboard';
        }
        
            
    } catch (err) {
        console.error('Error while creating class:', err);
    }

    
});

document.addEventListener('DOMContentLoaded', async () => {
    const usertypeSelect = document.getElementById('user-type');

    try{
        const response = await fetch('/api/user');

        if(!response.ok){
            window.location.href = '/login';
            return;
        }

        const userData = await response.json();
        const storedUsername = userData.username;

        
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