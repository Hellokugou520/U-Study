window.onload = function () {
    var user = document.querySelectorAll('nav .right .user');
    var userObj = JSON.parse(localStorage.getItem('user')); // 本地存储数据

    if (userObj && userObj.tel) {
        user[0].style.display = 'none';
        user[1].style.display = 'none';
        user[2].style.display = 'block';
        user[2].innerText = userObj.tel;
    } else {
        user[0].style.display = 'block';
        user[1].style.display = 'block';
        user[2].style.display = 'none';
        user[2].innerText = '';
    }
}