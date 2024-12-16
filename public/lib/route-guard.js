(() => {
  const isAuth = getStorage('isAuth');
  if (!isAuth) {
    logout();
    alert('Log in to upload art.');
    window.location.href = '/login.html';
  }
})();