var app = new Vue({
    el: "#app",
    data: {
        showMenu: false,
        tabIndex: 0,
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
    }
});

// $(window).scroll(function(){
//     var scrollTop = $(this).scrollTop();
//     var scrollHeight = $(document).height();
//     var windowHeight = $(this).height();
//     if(scrollTop + windowHeight == scrollHeight){
//         alert("you are in the bottom");
//     }
// });