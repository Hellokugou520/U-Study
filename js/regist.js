// 注册
var tel = document.getElementById('tel');
var pword1 = document.getElementById('pword1');
var pword2 = document.getElementById('pword2');
var yzm = document.getElementById('yzm');
var vCode = document.getElementById('vCode');
var btn = document.getElementById('btn');
var onOff = [false, false, false, false];
var testCode = {
    tel: /^1\d{10}$/,
    pass: /^\w{6,20}$/
}

// 手机号
tel.onblur = function () {
    var val = this.value;
    var em = this.nextElementSibling;

    if (testCode.tel.test(val)) {
        em.className = 'ok';
        em.innerText = '';
        onOff[0] = true;
    } else if (val !== '') {
        em.className = '';
        em.style.display = 'inline-block';
        em.style.color = '#FF4A00';
        em.innerText = '请输入正确的手机号!';
        onOff[0] = false;
    }
    else {
        em.className = '';
        em.style.display = 'inline-block';
        em.style.color = '';
        em.innerText = '请输入手机号!';
        onOff[0] = false;
    }
}

// 密码框1
pword1.onblur = function () {
    var val = this.value;
    var em = this.nextElementSibling;

    if (testCode.pass.test(val)) {
        em.className = 'ok';
        em.innerText = '';
        onOff[1] = true;
    } else if (val !== '') {
        em.className = '';
        em.style.display = 'inline-block';
        em.style.color = '#FF4A00';
        em.innerText = '请输入6-20位的英文、数字、下划线!';
        onOff[1] = false;
    }
    else {
        em.className = '';
        em.style.display = 'inline-block';
        em.style.color = '';
        em.innerText = '请输入密码!';
        onOff[1] = false;
    }
}

// 密码框2
pword2.onblur = function () {
    var val = this.value;
    var em = this.nextElementSibling;

    if ((val === pword1.value) && val !== '') {
        em.className = 'ok';
        em.innerText = '';
        onOff[2] = true;
    } else if (val !== '') {
        em.className = '';
        em.style.display = 'inline-block';
        em.style.color = '#FF4A00';
        em.innerText = '两次密码必须一致!';
        onOff[2] = false;
    }
    else {
        em.className = '';
        em.style.display = 'inline-block';
        em.style.color = '';
        em.innerText = '请再次输入密码!';
        onOff[2] = false;
    }
}

// 验证码
yzm.innerText = random(5);
yzm.onclick = function () {
    yzm.innerText = random(5);
}

// 验证码输入框
vCode.onblur = function () {
    var val = this.value;
    var em = this.nextElementSibling;

    if (this.value === yzm.innerText) {
        em.className = 'ok';
        em.innerText = '';
        onOff[3] = true;
    }
    else if (this.value == '') {
        em.style.display = 'inline-block';
        em.className = '';
        em.innerText = '请输入验证码!';
        onOff[3] = false;
    }
    else if (this.value !== yzm.innerText) {
        em.style.display = 'inline-block';
        em.className = '';
        em.style.color = '#FF4A00';
        em.innerText = '验证码错误!';
        onOff[3] = false;
    }
}

// 生成验证码
function random(m) {
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var s = '';
    for (var i = 0; i < m; i++) {
        var n = getRandom(0, str.length - 1);
        s += str[n];
    }
    return s;
}

// 注册
btn.onclick = function (ev) {
    // 阻止默事件
    var ev = event;
    ev.preventDefault();

    tel.onblur();
    pword1.onblur();
    pword2.onblur();
    vCode.onblur();

    var v = onOff.every(function (item) {
        return item;
    });

    var s = 'tel=' + tel.value + '&pass=' + pword1.value;

    var json = {
        tel: tel.value,
        pass: pword1.value
    }

    if (v) {
        ajax('get','', s, function (data) {
            localStorage.setItem('user', JSON.stringify(json));
            open('../index.html', '_self');
        })
    }
}