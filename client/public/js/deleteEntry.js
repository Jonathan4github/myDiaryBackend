const deleteEntry = () => {
  document.getElementById('confirm-delete').style.cssText = 'display:block; position:fixed';

  const cancelButton = document.getElementById('cancel-btn');
  const yesButton = document.getElementById('yes-btn');

  cancelButton.onclick = () => {
    document.getElementById('confirm-delete').style.cssText = 'display:none';
  };

  yesButton.onclick = () => {
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
    document.getElementById('confirm-delete').style.cssText = 'display:none';
    document.getElementById('info').innerHTML = `<i class="fa fa-check teal"></i> Deleted successfully`;
    document.getElementById('myModal').style.cssText = 'display:block; position:fixed';
    setTimeout(() => {
      window.location.replace('./entries.html');
    }, 2000);
  };
};

document.getElementById('delete').addEventListener('click', deleteEntry);
