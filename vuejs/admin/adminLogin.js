var form_login = new Vue({
    el: "#form_login",

    methods: {
        login: function() {
            // alert(sessionStorage.getItem('username'));
            var _this = this;
            var formser = $('#form_login').serialize();
            // console.log(formser)
            axios.post("http://cube-online.lstf666.cn:8083/Cube-Online/admin/login", formser).then(
                function(response) {
                    console.log(response);
                    if (response.data.type == "error") {
                        alert(response.data.msg + ',请重新输入')
                    } else {
                        if (response.data.isRoot == '1') {
                            alert('您是本站超级管理员,' + response.data.msg + ",点击确定，跳转到主页面");
                            window.location.href = "/rootLogined.html";
                        } else {
                            alert('您是本站普通管理员,' + response.data.msg + ",点击确定，跳转到主页面");
                            window.location.href = "/gameList.html";
                        }
                        // 将信息存入session
                        sessionStorage['username'] = response.data.admin.username;
                        // alert(sessionStorage.getItem('username'));
                    }
                }
            ).catch(
                function(error) {
                    console.log("发生了错误：" + error);
                })

        }
    }
})