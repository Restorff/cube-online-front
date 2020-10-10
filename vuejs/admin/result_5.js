new Vue({
    el: ".list",
    data: {
        cId: "",
        event: "",
        scoreList: [],
        rounds: "",
    },
    mounted: function() {
        // alert(this.getQueryVariable("event"));
        this.event = this.getQueryVariable("event");
        this.cId = sessionStorage.getItem("cId");
        // alert(this.cId)
        this.getScore();
        this.getRounds();
    },
    methods: {
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
        getScore() {
            var _this = this;
            axios.post("http://localhost:8084/admin/getScores?cId=" + _this.cId + "&event=" + _this.event).then(
                function(response) {
                    _this.scoreList = response.data.scoreList
                    console.log(_this.scoreList);
                }
            ).catch(
                function(error) {
                    console.log("发生了错误：" + error);
                })
        },
        getRounds() {
            var _this = this;
            axios.post("http://localhost:8084/admin/getRounds?cId=" + _this.cId + "&event=" + _this.event).then(
                function(response) {
                    console.log(response.data.rounds);

                    _this.rounds = response.data.rounds;
                }
            ).catch(
                function(error) {
                    console.log("发生了错误: " + error);

                }
            )
        },
    }
})