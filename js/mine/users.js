var app = new Vue({
    el: "#app",
    data: {
        imgPrefix: staticUrl,
        schoolIcon: './images/icon-school.png',
        user: getSession("user") ? JSON.parse(getSession('user')) : {},
        search: {
            keyword: "",
            pageNum: 0,
            pageSize: 10
        },
        result: {
            totalPage: 0,
            total: 0,
            list: [
                /*{
                    userId: "001",
                    name: "Alice",
                    username: "201520180508",
                    gender: "male",
                    email: "cpwu@foxmail.com",
                    phoneNumber: "15911112222",
                    classNum: "1521805",
                    major: "soft making",
                    academy: "soft academy",
                    campus: "gl",
                    lastLogin: "2019-4-20 13:00",
                    status: "正常",
                    kind: 0
                }*/
            ]
        }
    },
    computed: {
        currentPage: function () {
            return this.search.pageNum + 1;
        }
    },
    methods: {
        toPage(pageNum) {
            console.log(pageNum);
            if (pageNum < 0 || pageNum > this.result.totalPage) {
                return;
            }
            this.search.pageNum = pageNum;
            getUserList(app.search, app, false);
        },
        submit() {
            let pgNum = $('#pgNum').val() - 1;
            this.search.pageNum = pgNum < 0 ? 0 : pgNum;
            getUserList(app.search, app, false);
        },
        freezeUser(userId) {
            layer.confirm('冻结后该用户将无法再登录系统，确定要冻结码？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                freezeUser(userId)
            }, function () {

            });
        },
        unfreezeUser(userId) {
            layer.confirm('解冻后用户可正常登录并发布信息，确定要解冻码？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                unfreezeUser(userId)
            }, function () {

            });
        },
        setAsManager(userId, flag) {
            layer.confirm('设置为管理员的账号可登录后台，请谨慎操作，确定要将其设置为管理员吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                setAsAdmin(userId, flag);
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
        },
        resetPassword(userId) {
            //询问框
            layer.confirm('确定码？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                resetPassword(userId);
            }, function () {

            });
        }
    }
});


$(function () {
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

    getUserList(app.search, app, false);
});

//获取用户列表
function getUserList(data, app, append) {
    $.ajax({
        url: baseUrl + "/admin/userList",
        data: JSON.stringify(data),
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    app.search.pageNum = res.data.page.pageNum;
                    app.search.pageSize = res.data.page.pageSize;
                    app.result.totalPage = res.data.page.totalPage;
                    app.result.total = res.data.page.total;
                    if (append) {
                        for (let v in res.data.page.list) {
                            //console.log(v);
                            app.result.list.push(res.data.page.list[v]);
                        }
                    } else {
                        app.result.list = res.data.page.list;
                    }
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

//重置密码
function resetPassword(userId) {
    $.ajax({
        url: baseUrl + "/admin/resetPassword?userId=" + userId,
        method: "POST",
        //data: JSON.stringify(data),
        beforeSend: function () {
            showLoading();
        },
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    showOK();
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

//设置/取消用户为管理员
function setAsAdmin(userId, flag) {
    $.ajax({
        url: baseUrl + "/admin/setAsAdmin?userId=" + userId + "&flag=" + flag,
        method: "POST",
        //data: JSON.stringify(data),
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    showOK();
                    getUserList(app.search, app, false);
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

//冻结用户
function freezeUser(userId) {
    $.ajax({
        url: baseUrl + "/admin/freezeUser?userId=" + userId,
        method: "POST",
        //data: JSON.stringify(data),
        beforeSend: function () {
            showLoading();
        },
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    showOK();
                    getUserList(app.search, app, false);
                } else {
                    showAlertError(res.msg)
                }
            } else {
                console.log(res);
                alert(res)
            }
        },
        complete: function () {
            hideLoading();
        }
    });
}

//解冻用户
function unfreezeUser(userId) {
    $.ajax({
        url: baseUrl + "/admin/unfreezeUser?userId=" + userId,
        method: "POST",
        //data: JSON.stringify(data),
        beforeSend: function () {
            showLoading();
        },
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    showOK();
                    getUserList(app.search, app, false);
                } else {
                    showAlertError(res.msg)
                }
            } else {
                console.log(res);
                alert(res)
            }
        },
        complete: function () {
            hideLoading();
        }
    });
}