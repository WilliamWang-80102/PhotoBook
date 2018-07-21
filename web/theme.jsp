<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/7/19 0019
  Time: 9:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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

<body background="img/background.jpg" style="background-size:100% 100%">
<div class="rgba">
    <div id="header">
        <div class="header_warpper">
            <a href="javascript:;" class="ft_black home"><font size=5 color="white">PhotoBook</font></a>
            <ul class="header_top">
                <li><a href="Register.jsp" class="register has_right_line"><font size=3 color="white">注册</font></a></li>
                <li><a href="Login.jsp" class="signin has_right_line"><font size=3 color="white">登录</font></a></li>
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
        <div class="selection">

            <div class="row">
                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="thumbnail">
                        <a href="ModulDownLoadServlet?moduleName=img/travel&type=travel"><img src="img/IMG_3973.JPG" alt="..."></a>
                        <div class="caption">
                            <h3>旅行日记</h3>
                            <p>将美好的旅行回忆珍藏起来。</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6 col-xs-12 col-sm-offset-2">
                    <div class="thumbnail">
                        <a href="ModulDownLoadServlet?moduleName=img/love&type=love"><img src="img/IMG_1180.JPG" alt="..."></a>
                        <div class="caption">
                            <h3>恋爱回忆</h3>
                            <p>记录你们的每个幸福瞬间。</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="thumbnail">
                        <a href="ModulDownLoadServlet?moduleName=img/school&type=youth"><img src="img/IMG_2347.JPG" alt="..."></a>
                        <div class="caption">
                            <h3>青春纪念册</h3>
                            <p>年少记忆从未走远。</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12 col-sm-offset-2">
                    <div class="thumbnail">
                        <a href="ModulDownLoadServlet?moduleName=img/food&type=food"><img src="img/IMG_4246.jpg" alt="..."></a>
                        <div class="caption">
                            <h3>舌尖盛宴</h3>
                            <p>让好吃的东西填满味蕾。</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>


</body>
</html>