var app = new Vue({
    el: "#app",
    data: {
        imgPrefix: staticUrl,
        schoolIcon: './images/icon-school.png',
        user: getSession("user") ? JSON.parse(getSession('user')) : {},
        result: {
            search: {//tab0
                "kind": -1,
                "category": "",
                "keyword": "",
                "username": "",
                "pageNum": 0,
                "pageSize": 3
            },
            totalPage: 0,
            total: 0,
            list: [
                /*  {
                      id: "00000000000000001",
                      icon: "./images/icon.jpg",
                      kind: 0,
                      status: 1,
                      username: "201520180508",
                      realName: "Alice",
                      time: "2019-04-16 09:27:10",
                      location: "研一的门口",
                      title: "丢了一只篮球",
                      images: ["./images/icon.jpg"],
                      category: "电子数码",
                      lookCount: 12,
                      commentCount: 2,
                  }*/
            ]
        },
        userInfo: {
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
            status: "正常"
        }
    },
    computed: {
        currentPage: function () {
            return this.result.search.pageNum + 1;
        }
    },
    methods: {
        freezeUser(userId){
            layer.confirm('冻结后该用户将无法再登录系统，确定要冻结码？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                freezeUser(userId)
            }, function () {

            });
        },
        seeInfo(userId){
            console.log(userId);
            getUserInfo(userId, this);

        },
        submit() {
            let pgNum = $('#pgNum').val() - 1;
            this.result.search.pageNum = pgNum < 0 ? 0 : pgNum;
            pageLostFound(app.result.search, app.result, false);
        },
        deletePub(id) {
            console.log(id);
            layer.confirm('确定要删除码？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                deletePub({
                    idList: [
                        id
                    ]
                });
            }, function () {

            });

        },
        changePage(e) {
            console.log(e);
        },
        toPage(pageNum) {
            console.log(pageNum);
            if (pageNum < 0 || pageNum > this.result.totalPage) {
                return;
            }
            this.result.search.pageNum = pageNum;
            pageLostFound(app.result.search, app.result, false);
        },
        jumpDetail(id) {
            //跳转详情页面
            window.open("./detail.html?id=" + id, "_blank");
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

$(function () {
    //console.log('index');
    //console.log(app.user);
    pageLostFound(app.result.search, app.result, false);

    var menuLeft = document.getElementById('cbp-spmenu-s1'),
        showLeftPush = document.getElementById('showLeftPush'),
        body = document.body;

    showLeftPush.onclick = function () {
        //console.log('close');
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
//冻结用户
function freezeUser(userId){
    $.ajax({
        url: baseUrl + "/admin/freezeUser?userId=" + userId,
        method: "POST",
        //data: JSON.stringify(data),
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    showOK("操作成功！")
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

//查询用户信息
function getUserInfo(userId, app){
    $.ajax({
        url: baseUrl + "/admin/userInfo?userId=" + userId,
        method: "POST",
        //data: JSON.stringify(data),
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    app.userInfo = res.data.user;
                    //$("#infoDiv").show(1000);
                    //页面层
                    layer.open({
                        type: 1,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['400px', 'auto'], //宽高
                        content: $("#infoDiv")
                    });
                    //$("#infoDiv").hide();
                    //console.log(app.userInfo);
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

//删除招领信息
function deletePub(data) {
    $.ajax({
        url: baseUrl + "/user/removeLost",
        method: "POST",
        data: JSON.stringify(data),
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    pageLostFound(app.result.search, app.result, false);
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

//分页查寻启事列表
function pageLostFound(data, result, append) {
    //console.log(data);
    $.ajax({
        url: baseUrl + "/user/page",
        data: JSON.stringify(data),
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    result.search.pageNum = res.data.page.pageNum;
                    result.search.pageSize = res.data.page.pageSize;
                    result.totalPage = res.data.page.totalPage;
                    result.total = res.data.page.total;
                    if (append) {
                        for (let v in res.data.page.list) {
                            //console.log(v);
                            result.list.push(res.data.page.list[v]);
                        }
                    } else {
                        result.list = res.data.page.list;
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