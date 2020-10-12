new Vue({
    el: ".main",
    data: {
        gameList: []
    },
    mounted: function() {
        this.checkGame();
    },
    methods: {
        checkGame: function() {
            var _this = this;
            axios.post("http://cube-online.lstf666.cn:8083/Cube-Online/admin/checkGame").then(
                function(response) {
                    _this.gameList = response.data.data
                        // console.log(response);
                }
            ).catch(
                function(error) {
                    console.log("发生了错误：" + error);
                })

        },
        toGameDetail: function(cId) {
            sessionStorage['cId'] = cId;
            // alert(cId),

            window.location.href = "/backstageIndex.html?cId=" + cId;
        }
    }
})