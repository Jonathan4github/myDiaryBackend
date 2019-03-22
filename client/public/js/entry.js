const entryId = localStorage.getItem('entryId');
const token = localStorage.getItem('token');
const fullname = localStorage.getItem('fullname');

if (!token) {
  window.location.href = './signin.html';
}
const getEntry = () => {
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  fetch(`http://localhost:3000/api/v1/entries/${entryId}`, option)
    .then(res => res.json())
    .then(data => {
      const entry = data.entries;
      document.getElementById('title').value = entry[0].title;
      document.getElementById('entry').value = entry[0].entry;
      document.getElementById('date').value = entry[0].created_date;
      document.getElementById('user-name').innerHTML = fullname.split(' ')[0];
    });
};

const modifyEntry = event => {
  event.preventDefault();
  const post = {
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    entry: document.getElementById('entry').value
  };
  const params = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(post)
  };
  fetch(`http://localhost:3000/api/v1/entries/${entryId}`, params)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'Success') {
        document.getElementById('myModal').style.cssText = 'display:block; position:fixed';
        setTimeout(() => {
          window.location.reload();
        }, 2300);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const enableEdit = () => {
  document.getElementById('hide-update-btn').style.display = 'block';
  document.getElementById('title').removeAttribute('disabled');
  document.getElementById('date').value = '';
  document.getElementById('date').setAttribute('type', 'date');
  document.getElementById('date').removeAttribute('disabled');
  document.getElementById('entry').removeAttribute('readonly');
};

const cancelEdit = () => {
  window.location.href = './detail.html';
};
document.getElementById('modify-entry').addEventListener('submit', modifyEntry);
