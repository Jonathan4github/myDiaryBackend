const logOut = () => {
  localStorage.removeItem('entryId');
  localStorage.removeItem('strignifiedData');
  localStorage.removeItem('token');
  window.location.href = './signin.html';
};

document.getElementById('logout').addEventListener('click', logOut);
