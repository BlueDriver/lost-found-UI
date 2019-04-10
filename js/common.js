//请求前缀
const baseUrl = "http://localhost:8080//api/v1/";

//全局设置ajax
$.ajaxSetup({
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    xhrFields: {"withCredentials": true},//携带cookie
    beforeSend: function () {
        showLoading();
    },
    error: function (req, status, e) {
        hideLoading();
        console.log("ajax error --------------------------- start");
        console.log(this);
        console.log(req);
        console.log(status);
        console.log(e);
        console.log("ajax error ----------------------------- end");
        alert("请求发生错误：\n" + this.url);
    },
    complete: function () {
        hideLoading();
    }
})

//将对象的value置为空串
function cleanObj(obj) {
    for (let k in obj) {
        obj[k] = "";
    }
}
//是否可用LocalStorage
function canUseLocal() {
    if (!window.localStorage) {
        console.log('浏览器不支持localStorage');
        alert("浏览器不支持localStorage");
        return false;
    } else {
        return true;
    }
}
//存入都是String
function saveLocal(key, value) {
    if (canUseLocal()) {
        let storage = window.localStorage;
        if (typeof value == "object") {
            storage.setItem(key, JSON.stringify(value));
            return;
        }
        storage.setItem(key, value);
    }
}
//返回时String，如果是json要转换，没有则是undefined
function getLocal(key) {
    if (canUseLocal()) {
        let storage = window.localStorage;
        return storage.getItem(key);
    }
    return null;
}

function deleteLocal(key) {
    storage.removeItem(key);
}

function canUseSession() {
    if(sessionStorage){
        return true;
    }else{
        console.log("can not user sessionStorage");
        alert("浏览器不支持sessionStorage");
        return false;
    }
}

function saveSession(key, value) {
    if (canUseSession()) {
        if (typeof value == "object") {
            sessionStorage.setItem(key, JSON.stringify(value));
            return;
        }
        sessionStorage.setItem(key, value)
    }
}
function getSession() {
    if (canUseSession()) {
        return sessionStorage.getItem(key);
    }
    return null;
}
function deleteLocal(key) {
    sessionStorage.removeItem(key);
}

//显示loading
function showLoading(title) {
    //加载层-风格4
    layer.msg(title || '加载中', {
        icon: 16,
        shade: 0.4
    });
}

//隐藏loading
function hideLoading() {
    layer.closeAll('loading');
}

//无icon消息弹出框
function showAlert(msg, title) {
    layer.open({
        title: title || '消息'
        , content: msg
    });
}

//红色叉叉消息弹出框
function showAlertError(msg, title) {
    layer.open({
        title: title || '消息',
        content: msg,
        icon: 2
    });
}

//吐司一下
function showToast(msg) {
    layer.msg(msg, {icon: -1});
}

//橙色叹号
function showInfo(msg) {
    layer.msg(msg, {icon: 0});
}

//绿色的勾
function showOK(msg) {
    layer.msg(msg, {icon: 1});
}

//红色叉叉
function showError(msg) {
    layer.msg(msg, {icon: 2});
}

//黄色问号
function showAsk(msg) {
    layer.msg(msg, {icon: 3});
}

//4灰色锁，5红色瘪嘴表情，6绿色笑脸

