new Vue({
    el: ".list-content",
    data: {
        cId: "",
        event: "",
        scoreList: [],
        rounds: 0,
        isChecked: false
    },
    mounted: function() {
        // alert(this.getQueryVariable("event"));
        this.event = this.getQueryVariable("event");
        this.cId = sessionStorage.getItem("cId");
        // alert(this.cId)
        this.getRounds();
        this.getScore();

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
            console.log("---------" + _this.rounds);

            axios.post("http://localhost:8084/admin/getScores?cId=" + _this.cId + "&event=" + _this.event).then(
                function(response) {
                    _this.scoreList = response.data.scoreList
                    console.log(response);
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
        // addChecked() {
        //     // alert(this.isChecked)
        //     this.isChecked = !this.isChecked;
        // },
        deleteOneScore(rId) {
            // var rId = 3
            alert(rId)
            var _this = this;
            axios.post("http://localhost:8084/admin/delete?rId=" + rId).then(
                function(response) {
                    console.log(response.data.rounds);

                    _this.rounds = response.data.rounds;
                    location.reload();
                }
            ).catch(
                function(error) {
                    console.log("发生了错误: " + error);

                }
            )
        },
        test() {
            alert("test")
        },
        addOneScore(n) {
            var _this = this;
            // var rId = 3
            javaex.dialog({
                title: "添加成绩",
                scrolling: "no",
                type: "window",
                id: "test", // 指定id，仅当页面存在多个弹出层，需要关闭指定弹出层时才使用
                url: "addOneScore.html?cId=" + _this.cId + "&event=" + _this.event + "&rounds=" + n, // 页面地址或网址或请求地址
                width: "1100", // 弹出层宽度
                height: "300", // 弹出层高度
            });
            // alert(_this.event)
        }

    }
})