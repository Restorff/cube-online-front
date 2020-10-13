new Vue({
    el: ".list",
    data: {
        cId: 0,
        playerList: [],
        eventList: [],
    },
    mounted: function() {
        this.cId = sessionStorage.getItem('cId')
        this.checkGame();
        this.getPlayerList(this.cId);
    },
    methods: {

        getPlayerList(cId) {
            var _this = this;
            axios.get("http://localhost:8084/admin/getPlayers?cId=" + cId).then(
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

    }
})