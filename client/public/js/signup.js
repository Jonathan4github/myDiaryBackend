const signup = event => {
  event.preventDefault();
  const post = {
    fullname: document.getElementById('fullname').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  };

  fetch('http://localhost:3000/api/v1/auth/signup/', params)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'Success') {
        window.localStorage.setItem('token', data.token);
        window.location.replace('./entries.html');
      } else if (data.message == 'User with the given EMAIL already exist') {
        document.getElementById('emailError').innerHTML = data.message;
        document.getElementById('email').style.cssText = 'border: 1px solid red';
      }
    })
    .catch(error => {
      console.log(error);
    });
};

document.getElementById('signup').addEventListener('submit', signup);
