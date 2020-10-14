new Vue({
    el: ".admin-navbar",
    data: {
        adminUser: "",
        cId: "",
    },
    mounted: function() {
        this.adminUser = sessionStorage.getItem('adminUser');
        if (this.adminUser == null) {
            javaex.message({
                content: "当前权限不足，请登录后操作",
                type: "error"
            });
            setTimeout(function() {
                location.href = "adminLogin.html"
            }, 2000);
            return;
        }
        // this.adminUser = sessionStorage.getItem('adminUser');
        // alert(this.username);
        // alert(cId)
        // this.checkGame();
    },
    methods: {
        logout: function() {
            // axios.post("http://cube-online.lstf666.cn:8083/Cube-Online/admin/logout").then(
            //     function(response) {
            sessionStorage.removeItem('adminUser');
            // console.log(response);
            window.location.href = "/adminLogin.html";
            //     }
            // ).catch(
            //     function(error) {
            //         console.log("发生了错误：" + error);
            //     })
        },

    },

})

new Vue({
    el: ".list",
    data: {
        cId: "",
        eventList: [],
        scoreList: [],
    },
    mounted: function() {
        this.cId = sessionStorage.getItem("cId");
        this.checkGame();
    },
    methods: {
        checkGame() {
            var _this = this;
            axios.post("http://cube-online.lstf666.cn:8083/Cube-Online/admin/manage?cId=" + _this.cId).then(
                function(response) {
                    // console.log(response);
                    _this.eventList = response.data.data
                }
            ).catch(
                function(error) {
                    console.log("发生了错误：" + error);
                })
        },
    }
})