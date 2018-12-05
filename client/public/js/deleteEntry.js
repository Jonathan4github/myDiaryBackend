const deleteEntry = () => {
  const option = {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    }
  };
  fetch(`http://localhost:3000/api/v1/entries/${entryId}`, option)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });

  window.location.replace('./entries.html');
};

document.getElementById('delete').addEventListener('click', deleteEntry);
