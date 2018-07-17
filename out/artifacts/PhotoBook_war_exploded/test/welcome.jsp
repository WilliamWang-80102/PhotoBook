<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false" %>

<%String  %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>PhotoBook</title>
    <link rel="stylesheet" type="text/css" href="css/pic_mystyle.css">
    <link rel="stylesheet" type="text/css" href="css/index_mystyle.css">
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
    
    <script src="https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/new.js" type="text/javascript" charset="utf-8"></script>
    <script>
    	 function myFun(sId) {
    var oImg = document.getElementsByTagName('img');

    for (var i = 0; i < oImg.length; i++) {
      if (oImg[i].id == sId) {
        oImg[i].previousSibling.previousSibling.checked = true;
        oImg[i].style.border = '8px solid #4682B4';
      } else {
        oImg[i].style.border = '0px solid #008800';

      }
    }
  } 
    </script>
</head>

<body background="img/background.jpg">
	<div class="rgba">
    <div id="header">
        <div class="header_warpper">
            <a href="javascript:;" class="ft_black home"><font size=5 color="white">PhotoBook</font></a>
            <ul class="header_top">
                <li><a href="registerpage.html" class="register has_right_line"><font size=3 color="white">注册</font></a></li>
                <li><a href="loginpage.html" class="signin has_right_line"><font size=3 color="white">登录</font></a></li>
                <li><a href="welcome.jsp" class="photobook has_right_line"><font size=3 color="white">照片书</font></a></li>
                <li>
                	<div class="dropdown">
                		<button class ="dropbtn">
                			<div class="custom_center has_right_line">
                				<font size=3 color="white">
                					个人中心
                				</font>
                			</div>
                		</button>
                		<div class="dropdown-content">
                			<a href="javascript:;">个人信息</a>
                			<a href="javascript:;">修改资料</a>
                			<a href="javascript:;">我的好友</a>
                		</div>
                	</div>
                </li>
             </ul>
         </div>
    </div>
    
<div style="position:absolute; height:800px; overflow:auto">
 <div class="display">
 	
 <div class="row">
            <div class="col-md-3 col-sm-6 col-xs-12">
                 <div class="thumbnail">
                     <img src="img/add.png" width="280" alt="...">
                     <div class="caption">
                        <a href="index3.html"><button class="btn btn-primary">创建新相册</button></a>
                     </div>
                 </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12 ">
                <div class="thumbnail">
                     <img src="img/Macau.JPG" alt="...">
                     <div class="caption">
                         <h3>澳门</h3>
                         <p>旅行日记</p>
                     </div>
                 </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="thumbnail">
                     <img src="img/Japan.JPG" alt="...">
                     <div class="caption">
                         <h3>日本</h3>
                         <p>旅行日记</p>
                     </div>
                 </div>
            </div>
         
</div>

<div class="row">
            <div class="col-md-3 col-sm-6 col-xs-12">
                 <div class="thumbnail">
                     <img src="img/WHU.JPG" alt="...">
                     <div class="caption">
                         <h3>校园</h3>
                         <p>青春纪念册</p>
                     </div>
                 </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="thumbnail">
                     <img src="img/Food.JPG" alt="...">
                     <div class="caption">
                         <h3>美食</h3>
                         <p>舌尖盛宴</p>
                     </div>
                 </div>
            </div>
</div>
    

</div>
</div>
</div>


</body>
</html>