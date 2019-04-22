var app = new Vue({
    el: "#app",
    data: {
        imgPrefix: staticUrl,
        schoolIcon: './images/icon-school.png',
        user: getSession("user") ? JSON.parse(getSession('user')) : {},
        notice: {
            title: "",
            content: "",
            fixTop: false
        },
        list: [
           /* {
                id: "0000000001",
                title: "every one notice",
                content: "hello, thank u, thank u very much!",
                time: "2019-04-21 18:45",
                fixTop: 1,
            }*/
        ]
    },
    methods: {
        showAdd() {
            //捕获页
            layer.open({
                type: 1,
                title: false,
                skin: 'layui-layer-rim', //加上边框
                area: ['500px', 'auto'], //宽高
                content: $('#addDiv') //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            });
        },
        submit() {
            addNotice(app.notice);
        },
        switchFix(id, index){
            let ask;
            if (this.list[index].fixTop==1){
                ask = "确定要取消置顶吗？";
            }else{
                ask = "确定要设置为置顶吗？";
            }
            layer.confirm(ask, {
                btn: ['确定', '取消'] //按钮
            }, function () {
                switchFix(id);
            }, function () {

            });
        },
        deleteNotice(id) {
            layer.confirm('确定要删除吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                deleteNotice(id);
            }, function () {

            });
        },
        logout() {
            //询问框
            layer.confirm('确定要退出码？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                deleteSession("user");
                window.location.replace("login.html");
            }, function () {

            });
        }
    }
});
function switchFix(id){
    $.ajax({
        url: baseUrl + "/admin/noticeSwitch?id=" + id,
        //data: JSON.stringify(data),
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    showOK();
                    getNoticeList(app);
                } else {
                    showAlertError(res.msg)
                }
            } else {
                console.log(res);
                alert(res)
            }
        }
    });
}

//删除通知
function deleteNotice(id) {
    $.ajax({
        url: baseUrl + "/admin/noticeDelete?id=" + id,
        //data: JSON.stringify(data),
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    showOK();
                    getNoticeList(app);
                } else {
                    showAlertError(res.msg)
                }
            } else {
                console.log(res);
                alert(res)
            }
        }
    });
}

//新增通知
function addNotice(notice) {
    //console.log(data);
    $.ajax({
        url: baseUrl + "/admin/noticeAdd",
        method: "POST",
        data: JSON.stringify(notice),
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    showOK();
                    layer.closeAll(); //疯狂模式，关闭所有层
                    app.notice = {
                        title: "",
                        content: "",
                        fixTop: false,
                    };
                    getNoticeList(app);
                } else {
                    showAlertError(res.msg)
                }
            } else {
                console.log(res);
                alert(res)
            }
        }
    });
}

//查询通知列表
function getNoticeList(app) {
    $.ajax({
        url: baseUrl + "/common/noticeList",
        //data: JSON.stringify(data),
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    app.list = res.data.list;
                } else {
                    showAlertError(res.msg)
                }
            } else {
                console.log(res);
                alert(res)
            }
        }
    });
}

$(function () {
    getNoticeList(app);

    var menuLeft = document.getElementById('cbp-spmenu-s1'),
        showLeftPush = document.getElementById('showLeftPush'),
        body = document.body;

    showLeftPush.onclick = function () {
        classie.toggle(this, 'active');
        classie.toggle(body, 'cbp-spmenu-push-toright');
        classie.toggle(menuLeft, 'cbp-spmenu-open');
        disableOther('showLeftPush');
    };

    function disableOther(button) {
        if (button !== 'showLeftPush') {
            classie.toggle(showLeftPush, 'disabled');
        }
    }
});