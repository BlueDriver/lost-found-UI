var app = new Vue({
    el: "#app",
    data: {
        showMenu: false,
        tabIndex: 0,
        user: getSession("user") ? JSON.parse(getSession('user')) : {},
        /*   {
           studentNum: "201520180508",
           realName: "cpwu",
           icon: "https://avatars1.githubusercontent.com/u/30117131?s=460&v=4",
           email: "cpwu@foxmail.com",
           schoolName: "东华理工大学",
           gender: 1,
           createTime: "2019-04-10 19:06:10",
           lastLogin: "2019-04-10 19:06:10",
           kind: 0
       },*/
        category: getCategory() || [],
        userIcon: "http://localhost:8080/static/icon/user_icon.png",
        imgPrefix: staticUrl,
        tab: [
            {
                search: {//tab0
                    "kind": -1,
                    "category": "",
                    "keyword": "",
                    "username": "",
                    "pageNum": 0,
                    "pageSize": 10
                },
                totalPage: 0,
                total: 0,
                list: [
                    /* {
                         id: "00000000000000001",
                         icon: "./images/icon.jpg",
                         kind: 0,
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
            {
                search: {//tab1
                    "kind": -1,
                    "category": "",
                    "keyword": "",
                    "username": "",
                    "pageNum": 0,
                    "pageSize": 10
                },
                totalPage: 0,
                total: 0,
                list: []
            },
            {
                search: {//tab2
                    "kind": -1,
                    "category": "",
                    "keyword": "",
                    "username": (getSession("user") ? JSON.parse(getSession('user')) : {}).studentNum,
                    "pageNum": 0,
                    "pageSize": 10
                },
                totalPage: 0,
                total: 0,
                list: [],
            },
            {},
        ],
        tab3: [
            /* {
                 id: "00000000001",
                 userId: "0002",
                 icon: null,
                 username: "2018",
                 time: "2019-04-17 16:20",
                 title: "我的小苹果丢了",
                 content: "你是什么苹果？"
             }*/
        ],
        imgTotal: 3,//最多3张图片
        tab4: {
            applyKind: 0,
            categoryIndex: -1,
            title: "",
            about: "",
            location: null,
            images: [],//srcList
        },
        notice: [
            {
                id: "0000000001",
                title: "every one notice",
                content: "hello, thank u, thank u very much!",
                time: "2019-04-21 18:45",
                fixTop: 1,
            }
        ],
        noticeAll: false,
        feedback: {
            subject: "",
            content: "",
        },
        icon: "",
        password: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    },
    methods: {
        showAllNotice(b) {
            this.noticeAll = b;
        },
        seeNotice(index) {
            let t = app.notice[index];
            layer.open({
                title: t.time + "  " + t.title || "",
                content: t.content || ""
            });

        },
        logout() {
            app.showMenu = false;
            //询问框
            layer.confirm('确定要退出码？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                deleteSession("user");
                window.location.replace("login.html");
            }, function () {

            });

        },
        changeTab(index) {
            //console.log(index);
            this.tabIndex = index;
            if (index == 0) {

            } else if (index == 1) {

            } else if (index == 2) {
                console.log(this.tab[2].search.username);
                pageLostFound(this.tab[2].search, this.tab[2], false);
            } else if (index == 3) {//我的消息
                getMessages(this);
            } else if (index == 4) {

            }
        },
        search() {
            this.tab[1].search.pageNum = 0;
            this.tab[1].totalPage = 0;
            this.tab[1].total = 0;
            pageLostFound(this.tab[1].search, this.tab[1], false);
        },
        changeTab0Kind(index) {
            this.tab[0].search.pageNum = 0;
            // this.tab[0].list = [];
            this.tab[0].search.kind = index;
            pageLostFound(this.tab[0].search, this.tab[0], false);
            console.log(this.tab[0].search, this.tab[0]);
        },
        changeTab0Category(index) {
            this.tab[0].search.pageNum = 0;
            // this.tab[0].list = [];
            if (index < 0) {
                this.tab[0].search.category = "";
            } else {
                this.tab[0].search.category = this.category[index].name;
            }
            pageLostFound(this.tab[0].search, this.tab[0], false);
            console.log(this.tab[0].search, this.tab[0]);
        },
        nextPage(tabIndex) {
            this.tab[tabIndex].search.pageNum++;
            pageLostFound(app.tab[0].search, app.tab[0], true);
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
        removeComment(id) {
            console.log(id);
            layer.confirm('确定要删除码？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                removeComment({
                    idList: [
                        id
                    ]
                });
            }, function () {

            });
        },
        changeTab4EventKind(index) {
            console.log(index);
            this.tab4.applyKind = index;
        },
        changeTab4CategoryIndex(index) {
            this.tab4.categoryIndex = index;
        },
        submitPub() {
            if (this.tab4.categoryIndex < 0) {
                showAlertError("请选择物品类别！")
                return;
            }
            let data = this.tab4;
            data.categoryName = this.category[data.categoryIndex < 0 ? 0 : data.categoryIndex].name;
            console.log(data);
            pubLostFound(data);
            //console.log(this.tab4);
        },
        changeImg() {
            console.log('change div');
            $("#imgInput").click();//模拟点击
        },
        removeImg(index) {
            console.log('remove img' + index);
            this.tab4.images.splice(index, 1);
        },
        jumpDetail(id) {
            //跳转详情页面
            window.open("./detail.html?id=" + id, "_self");
        },
        showFeedback() {
            app.showMenu = false;
            layer.open({
                btn: ['确定', '取消'],
                type: 1,
                area: ['50vw', 'auto'],
                //shade: true,
                title: "反馈", //不显示标题
                content: $('#editorDiv') //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                , yes: function () {
                    console.log(app.feedback);
                    pubFeedback(app.feedback);
                }, cancel: function () {

                }
            });
        },
        setPassword() {
            app.showMenu = false;
            layer.open({
                btn: ['确定'],
                type: 1,
                area: ['300px', 'auto'],
                //shade: true,
                title: "修改密码", //不显示标题
                content: $('#pwdDiv'),  //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                yes: function () {
                    console.log(app.password);
                    let pwd = app.password;
                    if (pwd.newPassword != pwd.confirmPassword) {
                        showAlertError("新密码不一致！");
                        return;
                    }
                    setPassword(app.password);
                },
                cancel: function () {
                    app.password = {
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    }
                }
            });
        },
        setPhone() {
            app.showMenu = false;
            layer.prompt({title: '请输入手机号码：'}, function (phone, index) {
                showOK(phone);
                //layer.close(index);
                setPhone(phone);
            });
        },
        setIcon() {
            app.showMenu = false;
            $("#iconInput").click();
        },
        showAbout() {
            app.showMenu = false;
            showAlert("ECUT失物招领系统", "关于");
        }
    }
});

$(function () {
    pageLostFound(app.tab[0].search, app.tab[0], true);

    getNoticeList(app);
});


//设置手机号
function setPhone(phone) {
    //console.log(data);
    $.ajax({
        url: baseUrl + "/user/setPhone?phone=" + phone,
        //data: JSON.stringify(data),
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    layer.closeAll();
                    showOK();
                    app.user.phoneNumber = res.data.phone;
                    saveSession("user", app.user);
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

//新增反馈
function pubFeedback(data) {
    console.log(data);
    $.ajax({
        url: baseUrl + "/user/addFeedback",
        data: JSON.stringify(data),
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    layer.closeAll();
                    showOK();
                    app.feedback = {
                        subject: "",
                        content: ""
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

//修改密码
function setPassword(data) {
    console.log(data);
    $.ajax({
        url: baseUrl + "/user/setPassword",
        data: JSON.stringify(data),
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    layer.closeAll();
                    showOK();
                    app.password = {
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: ""
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
                    pageLostFound(app.tab[2].search, app.tab[2], false);
                    layer.closeAll();
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
                    app.notice = res.data.list;
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

//删除消息（评论）
function removeComment(data) {
    $.ajax({
        url: baseUrl + "/user/removeComment",
        method: "POST",
        data: JSON.stringify(data),
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    getMessages(app);
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

//我的消息(与我发布的信息相关的评论）
function getMessages(app) {
    $.ajax({
        url: baseUrl + "/user/messages",
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    app.tab3 = res.data.list;
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

//选择上传头像图片
function changeIcon(obj) {
    console.log('change img')
    console.log(obj);
    let file = obj.files[0];

    //console.log(file);
    console.log("file.size = " + file.size);  //file.size 单位为byte

    let reader = new FileReader();

    reader.onload = function (e) {
        app.icon = this.result;
        //app.tab4.images.push(e.target.result);
        //或者 img.src = this.result;  //e.target == this
    };
    reader.readAsDataURL(file);

    layer.open({
        btn: ['确定', '取消'],
        type: 1,
        area: ['auto', 'auto'],
        //shade: true,
        title: "修改头像", //不显示标题
        content: $('#iconDiv') //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        , yes: function () {
            setIcon(app.icon);
        }, cancel: function () {
            app.icon = "";
        }
    });
}

function setIcon(icon) {
    $.ajax({
        url: baseUrl + "/user/setIcon",
        data: {icon: icon},
        contentType: "application/x-www-form-urlencoded",
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    layer.closeAll();
                    showOK();
                    app.user.icon = res.data.icon;
                    saveSession("user", app.user);
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

//选择上传图片
function changeInput(obj) {
    console.log('change img')
    console.log(obj);
    let file = obj.files[0];

    //console.log(file);
    console.log("file.size = " + file.size);  //file.size 单位为byte

    let reader = new FileReader();

    //读取文件过程方法
    /* reader.onloadstart = function (e) {
         console.log("开始读取....");
     }
     reader.onprogress = function (e) {
         console.log("正在读取中....");
     }
     reader.onabort = function (e) {
         console.log("中断读取....");
     }
     reader.onerror = function (e) {
         console.log("读取异常....");
     }*/
    reader.onload = function (e) {
        //console.log("成功读取....");

        //var img = document.getElementById("image1");
        //img.src = e.target.result;
        app.tab4.images.push(e.target.result);
        //console.log(img.src)
        //或者 img.src = this.result;  //e.target == this
    }

    reader.readAsDataURL(file)
}

//发布启事
function pubLostFound(data) {
    console.log(data);
    $.ajax({
        url: baseUrl + "/user/pub",
        data: JSON.stringify(data),
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    showOK("发布成功！");
                    app.tab4 = {
                        applyKind: 0,
                        categoryIndex: -1,
                        title: "",
                        about: "",
                        location: null,
                        images: [],//srcList
                    };
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

//获取物品类别list
function getCategory() {
    $.ajax({
        url: baseUrl + "/common/category",
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    app.category = res.data.list
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

$('.ui.radio.checkbox')
    .checkbox()
;
$('select.dropdown')
    .dropdown()
;
//滚动到底部触发事件
// $(window).scroll(function(){
//     var scrollTop = $(this).scrollTop();
//     var scrollHeight = $(document).height();
//     var windowHeight = $(this).height();
//     if(scrollTop + windowHeight == scrollHeight){
//         alert("you are in the bottom");
//     }
// });