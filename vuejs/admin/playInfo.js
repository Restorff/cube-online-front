new Vue({
    el: ".list",
    data: {
        cId: 0,
        playerList: [],
        eventList: [],
    },
    mounted: function() {
        var root = sessionStorage.getItem('adminUser');
        if (root == null) {
            javaex.message({
                content: "当前权限不足，请登录后操作",
                type: "error"
            });
            setTimeout(function() {
                location.href = "adminLogin.html"
            }, 2000);
            return;
        }
        this.cId = sessionStorage.getItem('cId')
        this.checkGame();
        this.getPlayerList(this.cId);
    },
    methods: {

        getPlayerList(cId) {
            var _this = this;
            axios.get("http://cube-online.lstf666.cn:8083/Cube-Online/admin/getPlayers?cId=" + cId).then(
                function(response) {
                    // console.log(response.data.data);
                    _this.playerList = response.data.data
                }
            ).catch(
                function(error) {
                    console.log("发生了错误：" + error);
                })
        },
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

    },

})