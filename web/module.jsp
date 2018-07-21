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
        function getInfo(cId) {

            var buttonNode = document.getElementById(cId);
            cover = buttonNode.previousElementSibling.src;
        }
        function getBack(bId) {

            var buttonBack = document.getElementById(bId);
            background = buttonBack.previousElementSibling.src;
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

<!--左侧固定siebar，还不知道填什么，嘤嘤嘤-->
<div style="width:200px;height:0px;text-align:left;">
    <ul id="myTab" class="nav nav-pills nav-stacked">
        <li class="active"><a href="#cover" data-toggle="tab"><font size=3>封面</font></a></li>
        <li><a href="#content" data-toggle="tab"><font size=3>内容</font></a></li>
    </ul>
    <form action="ModuleServlet">
        <input id="input_cover" name="cover" type="hidden" value="">
        <input id="input_background" name = background type="hidden" value="">
        <button id="selection" type="submit" class="btn btn-primary" style="margin-top: 40px; margin-left: 50px;">确定</button>
        <a href="/theme.jsp">
            <button type="button" class="btn btn-primary" style="margin-top: 40px; margin-left: 50px;">返回</button>
        </a>
    </form>

</div>

<div style="position:relative; height:800px; overflow:auto">
    <div id="myTabContent" class="tab-content">


        <!--封面图-->
        <div class="tab-pane fade in active" id="cover" align="center">
            <div class="container" align="center">
                <!--缩略图列表-->
                <ul class="gallery-wrapper">

                    <c:forEach items="${listCover}" var="cover1Key" varStatus="cover">
                        <li>
                            <a href="#${cover.count}">
                                <input type="radio" id="${cover.count+100}" name="" style="display:none">
                                <img id="${cover.count+700}" src="/${cover1Key}" onclick="myFun(this.id)">
                            </a>
                        </li>
                    </c:forEach>
                </ul>

                <div class="hidden-images-wrapper">

                    <c:forEach items="${listCover}" var="cover2Key" varStatus="cover">
                        <div id="${cover.count}">
                            <img class="img" src="/${cover2Key}">
                            <button class="choBtn" id="${cover.count+600}" onclick="getInfo(this.id)">选用</button>
                            <a class="img-close" href="#"></a>
                        </div>
                    </c:forEach>
                </div>
            </div>
        </div>



        <!--内容-->
        <div class="tab-pane fade in active" id="content" align="center">
            <div class="container">
                <ul class="gallery-wrapper">

                    <c:forEach items="${listContent}" var="content1Key" varStatus="content">
                        <li>
                            <a href="#${content.count+200}">
                                <input type="radio" name="b" id="${content.count+300}"  style="display:none">
                                <img id="${cover.count+400}" src="/${content1Key}" onclick="myFun(this.id)">
                            </a>
                        </li>
                    </c:forEach>
                </ul>

                <div class="hidden-images-wrapper">

                    <c:forEach items="${listContent}" var="content2Key" varStatus="content">
                        <div id="${content.count+200}">
                            <img class="img" src="/${content2Key}">
                            <button class="choBtn" id="${content.count+500}" onclick="getBack(this.id)">选用</button>
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
