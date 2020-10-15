var form_login = new Vue({
    el: "#form_login",

    methods: {
        login: function() {
            var formser = $('#form_login').serialize();
            console.log(formser)
            javaex.dialog({
                type : "dialog",	// 弹出层类型
                width : "330",
                height : "230",
                url : "check.html?"+formser+"&isAdmin=1"
            });
        }
    }
})