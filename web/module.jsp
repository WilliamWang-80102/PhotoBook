<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/7/18 0018
  Time: 17:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
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
        var cover;
        var background;
        function getCover(myImg) {
            cover = myImg.src;
        }
        function getBackground(myImg) {
            background = myImg.src;
        }
        $(function(){
            document.getElementById("selection")
                .addEventListener("click",function (ev) {
                        /*
                        $.ajax({
                            type: "POST", //请求方式
                            url: "/ModuleServlet", //请求路径
                            cache: false,
                            data: {//传参
                                "cover": cover,
                                "background": background,
                            },
                            dataType: 'json',   //返回值类型
                            success: function () {
                                alert("success!");    //弹出返回过来的List对象
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log(jqXHR);
                                console.log(textStatus);
                                console.log(errorThrown);
                            },
                        })
                        */
                        document.getElementById("input_cover").value = cover;
                        document.getElementById("input_background").value = background;
                    }
                )
        })
    </script>
</head>

<body>
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
<!--
    <div class="header">
  <ul class="nav nav-tabs">
         <li class="active"><a href="#"><font size=3>注册</font></a></li>
         <li><a href="#"><font size=3>登录</font></a></li>
         <li><a href="#"><font size=3>照片书</font></a></li>
         <li class="dropdown">
             <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                 <font size=3>个人中心</font> <span class="caret"></span>
             </a>
             <ul class="dropdown-menu">
                 <li><a href="#a">个人信息</a></li>
                 <li><a href="#">修改资料</a></li>
                 <li><a href="#">我的好友</a></li>
             </ul>
         </li>
     </div>
    -->
<!--左侧固定siebar，还不知道填什么，嘤嘤嘤-->
<div style="width:200px;height:0px;text-align:left;">
    <ul id="myTab" class="nav nav-pills nav-stacked">
        <li class="active">
            <a href="#cover" data-toggle="tab"><font size=3>封面</font></a></li>
        <li><a href="#pre" data-toggle="tab"><font size=3>序言</font></a></li>
        <li><a href="#content" data-toggle="tab"><font size=3>内容</font></a></li>
    </ul>
    <form action="ModuleServlet">
        <input id="input_cover" name="cover" type="hidden" value="">
        <input id="input_background" name = background type="hidden" value="">
        <button id="selection" type="submit" class="btn btn-primary" style="margin-top: 40px; margin-left: 50px;">选择模版</button>
    </form>

</div>

<div style="position:relative; height:800px; overflow:auto">
    <div id="myTabContent" class="tab-content">


        <!--封面图-->
        <div class="tab-pane fade in active" id="cover" align="center">
            <div class="container" align="center">
                <!--缩略图列表-->
                <ul class="gallery-wrapper">
                    <%--
                    <li>
                        <a href="#image-1">
                            <input type="radio" id= "111" name="aaa" style="display:none">
                            <img id="3" src="img/3.JPG" onclick="getCover(this)">
                        </a>
                    </li>
                    <li>
                        <a href="#image-2">
                            <input type="radio" id= "222" name="aaa" style="display:none">
                            <img id="5" src="img/5.JPG" onclick="getCover(this)">
                        </a>
                    </li>
                    <li>
                        <a href="#image-3">
                            <input type="radio" id= "333" name="aaa" style="display:none">
                            <img id="8" src="img/8.JPG" onclick="getCover(this)">
                        </a>
                    </li>
                    <li>
                        <a href="#image-4">
                            <input type="radio" id= "444" name="aaa" style="display:none">
                            <img id="1" src="img/1.JPG" onclick="getCover(this)">
                        </a>
                    </li>
                    <li>
                        <a href="#image-5">
                            <input type="radio" id= "555" name="aaa" style="display:none">
                            <img id="4" src="img/4.JPG" onclick="getCover(this)">
                        </a>
                    </li>
                    <li>
                        <a href="#image-6">
                            <input type="radio" id= "666" name="aaa" style="display:none">
                            <img id="7" src="img/7.JPG" onclick="getCover(this)">
                        </a>
                    </li>
                    <li>
                        <a href="#image-7">
                            <input type="radio" id= "777" name="aaa" style="display:none">
                            <img id="a" src="img/a.JPG" onclick="getCover(this)">
                        </a>
                    </li>
                    <li>
                        <a href="#image-8">
                            <input type="radio" id= "888" name="aaa" style="display:none">
                            <img id="b" src="img/b.JPG" onclick="getCover(this)">
                        </a>
                    </li>
                    --%>
                    <c:forEach items="${listCover}" var="cover1Key" varStatus="cover">
                        <li>
                            <a href="#${cover.count}">
                                <input type="radio" id="${cover.count+100}" name="" style="display:none">
                                <img src="/${cover1Key}" onclick="getCover(this)">
                            </a>
                        </li>
                    </c:forEach>
                </ul>

                <div class="hidden-images-wrapper">
                    <%--
                    <div id="image-1">
                        <img src="img/3.JPG">
                        <a class="img-close" href="#"></a>
                    </div>
                    <div id="image-2">
                        <img src="img/5.JPG">
                        <a class="img-close" href="#"></a>
                    </div>
                    <div id="image-3">
                        <img src="img/8.JPG">
                        <a class="img-close" href="#"></a>
                    </div>
                    <div id="image-4">
                        <img src="img/1.JPG">
                        <a class="img-close" href="#"></a>
                    </div>
                    <div id="image-5">
                        <img src="img/4.JPG">
                        <a class="img-close" href="#"></a>
                    </div>
                    <div id="image-6">
                        <img src="img/7.JPG">
                        <a class="img-close" href="#"></a>
                    </div>
                    <div id="image-7">
                        <img src="img/a.JPG">
                        <a class="img-close" href="#"></a>
                    </div>
                    <div id="image-8">
                        <img src="img/b.JPG">
                        <a class="img-close" href="#"></a>
                    </div>
                    --%>
                    <c:forEach items="${listCover}" var="cover2Key" varStatus="cover">
                        <div id="${cover.count}">
                            <img src="/${cover2Key}">
                            <a class="img-close" href="#"></a>
                        </div>
                    </c:forEach>
                </div>
            </div>
        </div>
        <!--
        <div class="hidden-images-wrapper">
             <div id="image">
            <img src = "img/"+this+".jpg">
            <a class="img-close" href="#"></a>
        </div>
        </div>
        -->

        <!--序-->
        <div class="tab-pane fade in active" id="pre" align="center">
            <div class="container">
                <ul class="gallery-wrapper">
                    <li>
                        <a href="#image-11">
                            <input type="radio" id= "1111" name="aaaa" style="display:none">
                            <img id="11" src="img/1.png" onclick="getBackground(this)">
                        </a>
                    </li>

                    <li>
                        <a href="#image-22">
                            <input type="radio" id= "2222" name="bbbb" style="display:none">
                            <img id="22" src="img/2.png" onclick="getBackground(this)">
                        </a>
                    </li>

                    <li>
                        <a href="#image-33">
                            <input type="radio" id= "3333" name="cccc" style="display:none">
                            <img id="33" src="img/3.png" onclick="getBackground(this)">
                        </a>
                    </li>

                    <li>
                        <a href="#image-44">
                            <input type="radio" id= "4444" name="dddd" style="display:none">
                            <img id="44" src="img/4.png" onclick="getBackground(this)">
                        </a>
                    </li>
                </ul>

                <div class="hidden-images-wrapper">
                    <div id="image-11">
                        <img src="img/1.png">
                        <a class="img-close" href="#"></a>
                    </div>

                    <div id="image-22">
                        <img src="img/2.png">
                        <a class="img-close" href="#"></a>
                    </div>

                    <div id="image-33">
                        <img src="img/3.png">
                        <a class="img-close" href="#"></a>
                    </div>

                    <div id="image-44">
                        <img src="img/4.png">
                        <a class="img-close" href="#"></a>
                    </div>
                </div>
            </div>
        </div>


        <!--内容-->
        <div class="tab-pane fade in active" id="content" align="center">
            <div class="container">
                <ul class="gallery-wrapper">
                    <%--
                    <li>
                        <a href="#image-111">
                            <input type="radio" id= "11111" name="aaaaa" style="display:none">
                            <img id="111" src="img/Jan.jpg" onclick="getBackground(this)">
                        </a>
                    </li>
                    <li>
                        <a href="#image-222">
                            <input type="radio" id= "22222" name="bbbbb" style="display:none">
                            <img id="222" src="img/Feb.jpg" onclick="getBackground(this)">
                        </a>
                    </li>
                    <li>
                        <a href="#image-333">
                            <input type="radio" id= "33333" name="ccccc" style="display:none">
                            <img id="33w" src="img/Mar.jpg" onclick="getBackground(this)">
                        </a>
                    </li>
                    --%>
                    <c:forEach items="${listContent}" var="content1Key" varStatus="content">
                        <li>
                            <a href="#${content.count+200}">
                                <input type="radio" name="b" id="${content.count+300}"  style="display:none">
                                <img src="/${content1Key}" onclick="getBackground(this)">
                            </a>
                        </li>
                    </c:forEach>
                </ul>

                <div class="hidden-images-wrapper">
                    <%--
                    <div id="image-111">
                        <img src="img/Jan.jpg">
                        <a class="img-close" href="#"></a>
                    </div>

                    <div id="image-222">
                        <img src="img/Feb.jpg">
                        <a class="img-close" href="#"></a>
                    </div>

                    <div id="image-333">
                        <img src="img/Mar.jpg">
                        <a class="img-close" href="#"></a>
                    </div>
                    --%>
                    <c:forEach items="${listContent}" var="content2Key" varStatus="content">
                        <div id="${content.count+200}">
                            <img src="/${content2Key}">
                            <a class="img-close" href="#"></a>
                        </div>
                    </c:forEach>
                </div>
            </div>
        </div>
    </div>

</div>

</body>
</html>
