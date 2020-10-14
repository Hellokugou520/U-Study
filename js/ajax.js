// 参数：请求方式，请求地址，发给后端的数据，回调
function ajax(method, url, data, callback) {
    var xhr = new XMLHttpRequest();

    if (method === 'get') {
        if (data) {
            url += '?' + data;
        }
        xhr.open('get', url, true);
        xhr.send();
    }
    else {
        xhr.open('post', url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        if (data) {
            xhr.send(data);
        }
        else {
            xhr.send();
        }
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            }
            else {
                throw new Error('请求失败：' + xhr.status);
            }
        }
    }
}