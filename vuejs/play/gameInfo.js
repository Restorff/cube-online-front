var app = new Vue({
    el:".main",
    data:{
      optional:[],
      chosen:[],
      isShow:false,
    },
    mounted:function(){
      this.createcode();//需要触发的函数
    },
    methods:{
      getUrlParam(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
          var r = window.location.search.substr(1).match(reg);  //匹配目标参数
          if (r != null) return decodeURI(r[2]); return null; //返回参数值
      },
      createcod(){
          var that = this;
          axios.get("http://cube-online.lstf666.cn:8083/Cube-Online/player/queryGame?pid="+this.getUrlParam('pId')+"")
              .then(function(res){
                  console.log(res);
                  that.optional = res.data.data1;
                  that.chosen = res.data.data2;      
          },function(err){
              console.log(err);
          })
      }, 
      toGameDetail(cId) {
        window.location.href = "gameDetail.html?cId="+cId+"&&pId="+this.getUrlParam("pId")+"";
      },
      toGameApply(cId) {
        location.href = "apply.html?cId="+cId+"&&pId="+this.getUrlParam("pId")+"";
      }
    },
  })