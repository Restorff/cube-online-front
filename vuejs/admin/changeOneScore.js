new Vue({
    el: "#form_change",
    data: {
        rId: 0,
        result_5: "",
    },
    mounted: function() {
        this.rId = this.getQueryVariable("rId");
        // alert(this.rId)
        if (this.rId != false)
            this.getOneScore(this.rId);
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
        getOneScore(rId) {
            var _this = this

            $.ajax({
                url: 'http://localhost:8084/admin/getOneScore',
                data: {
                    rId: rId
                },
                type: 'GET',
                dataType: 'json',
                // async: false,
                contentType: 'application/json;charset=utf-8',
                success: function(res) {
                    console.log(res)
                    if (res.type == 'success') {
                        _this.result_5 = res.result_5;

                    } else {

                    }
                },
                error: function(error) {
                    console.log(error);

                },
            })
        },
        commit() {
            $.each($(".t"), function() {
                if ($(this).val() === 'DNF' || $(this).val() === 'dnf') {
                    $(this).val(67373);
                }
            })
            var pId = $("#pId").val();
            if (pId == '') {
                pId = 0;
                $("#pId").val(0);
                // alert(pId)
            }
            //非空检验
            if (pId == '' && $("#name").val() == '') {
                alert("请输入选手id或姓名");
                return;
            }
            if ($("#t1").val() == '' || $("#t2").val() == '' || $("#t3").val() == '' || $("#t4").val() == '' || $("#t5").val() == '') {
                alert("请输入五次成绩");
                return;
            }
            //成绩非字符检验
            if (isNaN($("#t1").val()) || isNaN($("#t2").val()) || isNaN($("#t3").val()) || isNaN($("#t4").val()) || isNaN($("#t5").val())) {
                alert("请输入有效的成绩");
                return;
            }
            // let query = window.location.search;
            // console.log(query);

            var formser = $('#form_change').serialize();
            // console.log(formser);

            var cId = this.getQueryVariable("cId")
            var event = this.getQueryVariable("event");
            var rounds = this.getQueryVariable("rounds");
            //没有获取到参数就不往下进行
            if (cId == false) {
                return;
            }
            formser += "&cId=" + cId + "&event=" + event + "&rounds=" + rounds
                // console.log("-----" + formser);

            /*                 axios.post("http://localhost:8084/admin/add", formser).then(
                                function(res) {
                                    console.log(res);
                                    alert("mm")
                                    if (res.type == 'success') {
                                        location.reload();
                                        parent.javaex.close();
                                        parent.window.location.reload();
                                    } else {
                                        alert(res.msg)
                                    }
                                }
                            ).catch(
                                function(error) {
                                    console.log("发生了错误: " + error);

                                }
                            ) */
            $.ajax({
                url: 'http://localhost:8084/admin/change',
                data: formser,
                type: 'GET',
                dataType: 'json',
                async: false,
                contentType: 'application/json;charset=utf-8',
                success: function(res) {
                    // alert(res)
                    if (res.type == 'success') {
                        location.reload();
                        parent.javaex.close();
                        parent.window.location.reload();
                    } else {
                        alert(res.msg);
                        location.reload();
                        parent.window.location.reload();
                    }
                },
                error: function(error) {
                    console.log("发生了错误" + error);

                },
            })
        },
    },
})