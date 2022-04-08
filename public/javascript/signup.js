async function signupFormHandler(event) {
    event.preventDefault();
  
    const user_name = document.querySelector('.signup-username').value.trim();
    const email = document.querySelector('.signup-email').value.trim();
    const password = document.querySelector('.signup-password').value.trim();
  
    if (user_name && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          user_name,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
          // check the response status
        if (response.ok) {
        console.log('success');
      } else {
        alert(response.statusText);
      }
    }
  }

  document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);