var app = new Vue({
    el: "#app",
    data: {
        imgPrefix: staticUrl,
        userIcon: "http://localhost:8080/static/icon/user_icon.png",
        comment: "",//发布评论
        images: {
            "title": "", //相册标题
            "id": "", //相册id
            "start": 0, //初始显示的图片序号，默认0
            "data": [   //相册包含的图片，数组格式
                /* {
                     "alt": "图片名",
                     "pid": 666, //图片id
                     "src": "", //原图地址
                     "thumb": "" //缩略图地址
                 }*/
            ]
        },
        item: {
            /*    id: null,
                icon: "./images/icon.jpg",
                kind: 0,
                username: "201520180508",
                userId: "000000000001",
                time: "2019-04-16 09:27:10",
                location: "研一的门口",
                title: "丢了一只篮球",
                about: "我的世界只有你没有她",
                images: ["./images/icon.jpg"],
                category: "电子数码",
                lookCount: 12,
                status: 1,
                dealTime: null,
                isSelf: false,
                email: "cpwu@foxmail.com",
                phoneNumber: "15912345678",*/

        },
        comments: [
            /* {
                 id: "00000000000001",
                 icon: "./images/icon.png",
                 username: "201520180508",
                 time: "2019-04-16 09:27:10",
                 content: "我觉得很对"
             }*/
        ],
        page: {
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
            list: [
                /*  {
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
    },
    methods: {
        share(){
            console.log(location.href);
            //捕获页
            layer.open({
                type: 1,
                //shade: true,
                title: "保存或扫描二维码", //不显示标题
                content: $('#shareDiv') //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            });
        },
        viewImages(index) {
            //相册层
            this.images.data = [];
            this.images.start = index;
            let i = 0;
            let t = this.item.images.length;
            for (; i < t; i++) {
                let src = this.item.images[i];
                let d = {"src": staticUrl + src};
                this.images.data.push(d);
            }
            console.log(this.images);

            layer.photos({
                photos: this.images,//格式见API文档手册页
                anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
            });
        },
        pubComment() {
            console.log(this.comment);
            let data = {
                "targetId": this.item.id,
                "content": this.comment
            };
            console.log(data);
            pubComment(data, this);
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
        jumpDetail(id) {
            //跳转详情页面
            window.open("./detail.html?id=" + id, "_self");
        },
        claim(){
            claim(this.item.id);
        }
    }
});

$(function () {
    let id = getUrlParam("id");
    if (!id) {
        showAlertError("缺少请求参数！");
    } else {
        getDetail(id, app);
    }
    var qrcode = new QRCode(document.getElementById("imgDiv"), location.href);
});

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
                    window.open("./home.html", "_self");
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

//查询相关类别
function pageLostFound(data, result) {
    $.ajax({
        url: baseUrl + "/user/page",
        data: JSON.stringify(data),
        method: "POST",
        beforeSend: function () {
        },
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

//发布评论
function pubComment(data, app) {
    $.ajax({
        url: baseUrl + "/user/comment",
        data: JSON.stringify(data),
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    showOK("发布成功！");
                    app.comment = "";
                    getDetail(app.item.id, app);
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

//获得启事评论列表
function getComments(id, app) {
    //console.log(data);
    $.ajax({
        url: baseUrl + "/user/comments?id=" + id,
        method: "POST",
        beforeSend: function () {

        },
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    //console.log(result.item);
                    app.comments = res.data.comments;
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

//获得启事详情
function getDetail(id, result) {
    //console.log(data);
    $.ajax({
        url: baseUrl + "/user/detail?id=" + id,
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    //console.log(result.item);
                    result.item = res.data.item;
                    //console.log(result.item);
                    app.page.search.category = res.data.item.category;
                    console.log(app.page.search);
                    if (getSession('user')) {
                        getComments(result.item.id, app);
                        pageLostFound(app.page.search, app.page);
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

//认领物品
function claim(id) {
    $.ajax({
        url: baseUrl + "/user/claim?id=" + id,
        method: "POST",
        success: function (res, status) {
            console.log(res);
            if (status == "success") {
                if (res.success) {
                    showAlert("认领成功！");
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