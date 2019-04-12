var app = new Vue({
    el: "#app",
    data: {
        showMenu: false,
        tabIndex: 2,
        user: {
            studentNum: "201520180508",
            realName: "cpwu",
            icon: "https://avatars1.githubusercontent.com/u/30117131?s=460&v=4",
            email: "cpwu@foxmail.com",
            schoolName: "东华理工大学",
            gender: 1,
            createTime: "2019-04-10 19:06:10",
            lastLogin: "2019-04-10 19:06:10",
        },
    },
    methods: {
        changeTab(index) {
            console.log(index);
            this.tabIndex = index;
        },
        changeDiv(){
            console.log('change div');
            $("#in1").click();
        }
    }
});

function changeImg(obj){
    console.log('change img')
    console.log(obj);
    var file = obj.files[0];

    console.log(obj);console.log(file);
    console.log("file.size = " + file.size);  //file.size 单位为byte

    var reader = new FileReader();

    //读取文件过程方法
    reader.onloadstart = function (e) {
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
    }
    reader.onload = function (e) {
        console.log("成功读取....");

        var img = document.getElementById("img1");
        img.src = e.target.result;
        console.log(img.src)
        //或者 img.src = this.result;  //e.target == this
    }

    reader.readAsDataURL(file)
}
$('.ui.radio.checkbox')
    .checkbox()
;
$('select.dropdown')
    .dropdown()
;
// $(window).scroll(function(){
//     var scrollTop = $(this).scrollTop();
//     var scrollHeight = $(document).height();
//     var windowHeight = $(this).height();
//     if(scrollTop + windowHeight == scrollHeight){
//         alert("you are in the bottom");
//     }
// });