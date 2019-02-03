if (!token) {
  window.location.href = './signin.html';
}

const getUserAccount = () => {
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  fetch(`http://localhost:3000/api/v1/user/account`, option)
    .then(res => res.json())
    .then(data => {
      const user = data.account;
      document.getElementById('user-fullname').value = user.fullname;
      document.getElementById('user-email').value = user.email;
      document.getElementById('reminder').value = user.reminder;
      document.getElementById('user-name').innerHTML = user.fullname.split(' ')[0];
      document.getElementById('passport').src = user.image;
    });
};

const updateUserAccount = () => {
  event.preventDefault();
  const post = {
    fullname: document.getElementById('user-fullname').value,
    email: document.getElementById('user-email').value,
    reminder: document.getElementById('reminder').value,
    password: document.getElementById('password').value
  };
  const option = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(post)
  };
  fetch(`http://localhost:3000/api/v1/user/account`, option)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'Success') {
        document.getElementById('info-modal').style.cssText = 'display:block; position:fixed';
        setTimeout(() => {
          window.location.replace('./account.html');
        }, 2300);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const enableEdit = () => {
  document.getElementById('hide-upload-btn').style.display = 'block';
  document.getElementById('hide-update-btn').style.display = 'block';
  document.getElementById('user-fullname').removeAttribute('disabled');
  document.getElementById('user-email').removeAttribute('disabled');
  document.getElementById('reminder').removeAttribute('disabled');
  document.getElementById('password').removeAttribute('disabled');
};

const cancelEdit = () => {
  window.location.href = './account.html';
};

const updateImage = e => {
  e.preventDefault();

  // fetch the 1st file on the node's file list a File object:
  const imageInput = document.getElementById('image');
  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  document.getElementById('myModal').style.cssText = 'display:block; position:fixed'; /* Stay in place */
  const option = {
    method: 'PUT',
    headers: {
      'x-access-token': token
    },
    body: formData
  };
  fetch('http://localhost:3000/api/v1/user/account/upload', option)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.getElementById('passport').src = data.imageUrl;
      if (data.status === 'Success') {
        window.location.replace('./account.html');
      }
    })
    .catch(err => console.log(err));
};

document.getElementById('update-image').addEventListener('change', updateImage);
document.getElementById('account').addEventListener('submit', updateUserAccount);
