new Vue({
    el: "#form",
    data: {
        cId: 0
    },
    mounted: function() {
        this.cId = sessionStorage.getItem('cId')
    },
    methods: {
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

            var formser = $('#form').serialize();
            var cId = this.getQueryVariable("cId")
            var event = this.getQueryVariable("event");
            var rounds = this.getQueryVariable("rounds");
            formser += "&cId=" + cId + "&event=" + event + "&rounds=" + rounds
                // console.log(formser);

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
                url: 'http://localhost:8084/admin/add',
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
                        alert(res.msg)
                    }
                },
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
    }
})