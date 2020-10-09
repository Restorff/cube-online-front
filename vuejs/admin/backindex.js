new Vue({
    el: ".admin-navbar",
    data: {
        username: "",
        cId: "",
    },
    mounted: function() {
        this.username = sessionStorage.getItem('username');
        // alert(this.username);
        cId = this.getQueryVariable("cId");
        // alert(cId)
        // this.checkGame();
    },
    methods: {
        logout: function() {
            axios.post("http://localhost:8084/admin/logout", cId).then(
                function(response) {
                    sessionStorage.removeItem('username');
                    console.log(response);
                    window.location.href = "/adminLogin.html";
                }
            ).catch(
                function(error) {
                    console.log("发生了错误：" + error);
                })
        },
        getQueryVariable(variable) {
            let query = window.location.search.substring(1);
            let vars = query.split("&");
            for (let i = 0; i < vars.length; i++) {
                let pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return (false);
        },
        // checkGame() {
        //     axios.post("http://localhost:8084/admin/manage?cId=" + cId).then(
        //         function(response) {
        //             // console.log(response);
        //         }
        //     ).catch(
        //         function(error) {
        //             console.log("发生了错误：" + error);
        //         })
        // }
    },


})

new Vue({
    el: ".list",
    data: {
        eventList: []
    },
    mounted: function() {
        this.checkGame();
    },
    methods: {
        checkGame() {
            var _this = this;
            axios.post("http://localhost:8084/admin/manage?cId=" + cId).then(
                function(response) {
                    // console.log(response.data.data);
                    _this.eventList = response.data.data
                }
            ).catch(
                function(error) {
                    console.log("发生了错误：" + error);
                })
        }
    }
})