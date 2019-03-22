const signIn = event => {
  event.preventDefault();
  const post = {
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

  fetch('http://localhost:3000/api/v1/auth/signin/', params)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.status === 'Success') {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('fullname', data.data.fullname);
        window.localStorage.setItem('image', data.data.image);
        window.location.replace('./entries.html');
      } else if (data.message == 'The credentials you provided is incorrect') {
        invalidUser(data.message);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

const invalidUser = errorMessage => {
  document.getElementById('errorMessage').innerHTML = errorMessage;
  document.getElementById('email').style.cssText = 'border: 1px solid red';
  document.getElementById('password').style.cssText = 'border: 1px solid red';
};

document.getElementById('signIn').addEventListener('submit', signIn);
