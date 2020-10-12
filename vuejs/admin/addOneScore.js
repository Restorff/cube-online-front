new Vue({
    el: "#form_add",
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
                location.reload();
                parent.javaex.close();
                parent.window.location.reload();
                return;
            }
            if ($("#t1").val() == '' || $("#t2").val() == '' || $("#t3").val() == '' || $("#t4").val() == '' || $("#t5").val() == '') {
                alert("请输入五次成绩");
                location.reload();
                parent.javaex.close();
                parent.window.location.reload();
                return;
            }
            //成绩非字符检验
            if (isNaN($("#t1").val()) || isNaN($("#t2").val()) || isNaN($("#t3").val()) || isNaN($("#t4").val()) || isNaN($("#t5").val())) {
                alert("请输入有效的成绩");
                location.reload();
                parent.javaex.close();
                parent.window.location.reload();
                return;
            }
            // let query = window.location.search;
            // console.log(query);

            var formser = $('#form_add').serialize();
            var cId = this.getQueryVariable("cId")
            var event = this.getQueryVariable("event");
            var rounds = this.getQueryVariable("rounds");
            formser += "&cId=" + cId + "&event=" + event + "&rounds=" + rounds
                // if (cId == false) {
                //     return;
                // }
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
                        // parent.javaex.close();
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