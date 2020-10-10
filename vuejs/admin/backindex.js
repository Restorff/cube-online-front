new Vue({
    el: ".admin-navbar",
    data: {
        username: "",
        cId: "",
    },
    mounted: function() {
        this.username = sessionStorage.getItem('username');
        // alert(this.username);
        // alert(cId)
        // this.checkGame();
    },
    methods: {
        logout: function() {
            axios.post("http://localhost:8084/admin/logout").then(
                function(response) {
                    sessionStorage.removeItem('username');
                    // console.log(response);
                    window.location.href = "/adminLogin.html";
                }
            ).catch(
                function(error) {
                    console.log("发生了错误：" + error);
                })
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
            axios.post("http://localhost:8084/admin/manage?cId=" + _this.cId).then(
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