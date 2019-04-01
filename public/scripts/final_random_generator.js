(function(){
 var startT = performance.now();
    var pages = ['http://104.248.70.89:8084','http://104.248.70.89:8084/goslow','http://104.248.70.89:8084/random','http://104.248.70.89:8084/error','http://104.248.70.89:8084/interactive'];
    function randomSelect(){
      var pageIdx = parseInt(Math.random() * 4);
      return pages[pageIdx];
      
    }
    function init(){ 
      var i = 0;
      while(i<1000){
        window.location.href = randomSelect();
        i++;
      }    
    }
    
  init();
    
})();
for ((i=1;i<=1000;i++)); do   ; done