const token = localStorage.getItem('token');
const fullname = localStorage.getItem('fullname');
const image = localStorage.getItem('image');
if (!token) {
  window.location.href = './signin.html';
}
const compose = event => {
  event.preventDefault();
  const post = {
    date: document.getElementById('date').value,
    title: document.getElementById('title').value,
    entry: document.getElementById('entry').value
  };

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(post)
  };
  const saveBtn = document.getElementById('submit');
  fetch('http://localhost:3000/api/v1/entries/', params)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'Success') {
        document.getElementById('myModal').style.cssText = 'display:block; position:fixed';
        setTimeout(() => {
          window.location.replace('./entries.html');
        }, 2000);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const getUserinfo = () => {
  document.getElementById('user-name').innerHTML = fullname.split(' ')[0];
  document.getElementById('passport').src = image;
};

document.getElementById('compose').addEventListener('submit', compose);
