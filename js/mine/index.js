var app = new Vue({
    el: "#app",
    data: {
        imgPrefix: staticUrl,
        schoolIcon: './images/icon-school.png',
        user: getSession("user") ? JSON.parse(getSession('user')) : {}
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

        }
    }
});
$(function () {
    //console.log('index');
    //console.log(app.user);
    var menuLeft = document.getElementById('cbp-spmenu-s1'),
        showLeftPush = document.getElementById('showLeftPush'),
        body = document.body;

    showLeftPush.onclick = function () {
        classie.toggle(this, 'active');
        classie.toggle(body, 'cbp-spmenu-push-toright');
        classie.toggle(menuLeft, 'cbp-spmenu-open');
        disableOther('showLeftPush');
        $("#bar1").css("width", "100%");
        $("#line1").css("width", "100%");
        $("#pie1").css("width", "100%");
        $("#line2").css("width", "100%");
        $("#line3").css("width", "100%");
        $("#pie2").css("width", "100%");
    };

    function disableOther(button) {
        if (button !== 'showLeftPush') {
            classie.toggle(showLeftPush, 'disabled');
        }
    }
});