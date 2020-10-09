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
            axios.post("http://localhost:8084/admin/checkGame").then(
                function(response) {
                    _this.gameList = response.data.data
                    console.log(response.data.data);
                }
            ).catch(
                function(error) {
                    console.log("发生了错误：" + error);
                })

        },
        toGameDetail: function(cId) {
            // alert(cId),
            window.location.href = "/backstageIndex.html?cId=" + cId;
        }
    }
})