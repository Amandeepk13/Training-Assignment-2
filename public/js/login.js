const loginForm = document.getElementById('main-login-form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/api/login', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({username,password})

        })
        if(response.ok){
            window.location.href = '/dashboard';
        }
    }
    catch(err){
        console.error('Error during login:', err);
    }
    
});
