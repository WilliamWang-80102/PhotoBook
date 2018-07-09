//左侧固定siebar
			 window.onload=function(){
            var siebar = document.getElementById("siebar");
            var Height=document.documentElement.clientHeight;//取得浏览器页面可视区域的宽度
            var Width=document.documentElement.clientWidth;//取得浏览器页面可视区域的宽度
            var gao1 = siebar.offsetHeight;
            var gao2 = siebar.offsetWidth;
            var Sgao1= (Height - gao1)/2+"px";
            var Sgao2= (Width - gao2)/2+"px";
            siebar.style.top=Sgao1;
            siebar.style.left=Sgao2;
            
			//按下添加键
			function Pushadd() {
        // window.open('Untitled-2.html');
        window.location.href = '';}
			