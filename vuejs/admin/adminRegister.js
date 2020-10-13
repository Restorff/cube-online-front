  new Vue({
      el: "#form_register",
      methods: {
          checkName: function() {
              var _this = this;
              var formser = $('#form_register').serialize();
              // console.log(formser)
              axios.post("http://cube-online.lstf666.cn:8083/Cube-Online/admin/register", formser).then(
                  function(response) {
                      //   console.log(response);
                      if (response.data.type == "error") {
                          alert(response.data.msg + ',请重新输入')
                      } else {
                          javaex.message({
                              content: "注册成功,超级管理员审核完毕后即可登录，即将跳转到登录页面。",
                              type: "success"
                          });
                          setTimeout(function() {
                              location.href = "adminLogin.html"
                          }, 2000);

                      }
                  }
              ).catch(
                  function(error) {
                      console.log("发生了错误：" + error);
                  })

          }
      }
  })