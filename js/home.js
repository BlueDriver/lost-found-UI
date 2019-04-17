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
        }
    },
    methods: {
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
        changeTab(index) {
            //console.log(index);
            this.tabIndex = index;
            if (index == 0) {

            } else if (index == 1) {

            } else if (index == 2) {
                console.log(this.tab[2].search.username);
                pageLostFound(this.tab[2].search, this.tab[2]);
            } else if (index == 3) {

            } else if (index == 4) {

            }
        },
        search() {
            this.tab[1].search.pageNum = 0;
            this.tab[1].totalPage = 0;
            this.tab[1].total = 0;
            pageLostFound(this.tab[1].search, this.tab[1]);
        },
        changeTab0Kind(index) {
            this.tab[0].search.kind = index;
            pageLostFound(this.tab[0].search, this.tab[0]);
            console.log(this.tab[0].search, this.tab[0]);
        },
        changeTab0Category(index) {
            if (index < 0) {
                this.tab[0].search.category = "";
            } else {
                this.tab[0].search.category = this.category[index].name;
            }
            pageLostFound(this.tab[0].search, this.tab[0]);
            console.log(this.tab[0].search, this.tab[0]);
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
        }
    }
});

$(function () {
    pageLostFound(app.tab[0].search, app.tab[0]);
});

//选择上传图片
function changeInput(obj) {
    console.log('change img')
    console.log(obj);
    var file = obj.files[0];

    //console.log(file);
    console.log("file.size = " + file.size);  //file.size 单位为byte

    var reader = new FileReader();

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
function pageLostFound(data, result) {
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
                    result.list = res.data.page.list;
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