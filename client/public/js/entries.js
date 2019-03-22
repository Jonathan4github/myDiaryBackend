const token = localStorage.getItem('token');
const fullname = localStorage.getItem('fullname');
const image = localStorage.getItem('image');
if (!token) {
  window.location.href = './signin.html';
}

const getAllEntry = () => {
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  fetch('http://localhost:3000/api/v1/entries', option)
    .then(res => res.json())
    .then((data) => {
      let userEntry = '';
      const datas = data.entries;
      console.log(datas);
      document.getElementById('total-entries').innerHTML = `Total entries: ${datas.length}`;
      datas.map((entry) => {
        userEntry += `<tr>
        <td>${entry.created_date}</td>
        <td>${entry.title}</td>
        <td>${entry.entry.split(' ')[0]} ${entry.entry.split(' ')[1]} ${entry.entry.split(' ')[2]}...</td>
        <td align="center"><button class="icon-btn" onclick="getEntry(this.id)" id=${
          entry.id
          } ><i class="fa fa-eye"></i></button></td>
      </tr > `;
      });
      document.getElementById('tbody').innerHTML = userEntry;
      document.getElementById('user-name').innerHTML = fullname.split(' ')[0];
      document.getElementById('passport').src = image;
    });
};

const getEntry = (id) => {
  const entryId = document.getElementById(id).getAttribute('id');
  if (entryId) {
    window.localStorage.setItem('entryId', entryId);
    window.location.href = './detail.html';
  }
};
