<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ page import="com.whu.database.Photo2Database" %>
<%@ page import="com.whu.database.Book2Database" %>
<%@ page import="com.whu.entity.PhotoBook" %>

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
            <div class="display">
                <%-- 根据用户名找到用户已建照片书 --%>
                <% List books = Book2Database.selectAllBook((String)request.getSession().getAttribute("id")); %>
                <% for(int i = 0; i <= books.size(); i++){ %>
                    <%-- 第一个 --%>
                    <% if(i == 0){%>
                        <div class="row">
                            <div class="col-md-3 col-sm-6 col-xs-12">
                                <div class="thumbnail">
                                    <img src="img/add.png" width="280" alt="...">
                                    <div class="caption">
                                        <a href="theme.html"><button class="btn btn-primary">创建新相册</button></a>
                                    </div>
                                </div>
                            </div>
                            <%-- 没有书本，直接结束标签 --%>
                            <%if(0==books.size()){%>
                        </div>
                            <%}%>
                    <% continue;}%>
                <%-- 每一行的第一个元素 --%>
                <%if(i%3 == 0){%>
                </div>
                <div class="row">
                    <div class="col-md-3 col-sm-6 col-xs-12 ">
                        <div class="thumbnail">
                            <%PhotoBook book = (PhotoBook)books.get(i);%>
                            <img src="<%= book.getCover()%>" alt="...">
                            <div class="caption">
                                <h3><%= book.getBookId()%></h3>
                                <p><%= book.getType()%></p>
                            </div>
                        </div>
                    </div>
                <%}else{%><%-- 未转行 --%>
                    <div class="col-md-3 col-sm-6 col-xs-12 ">
                        <div class="thumbnail">
                            <%PhotoBook book = (PhotoBook)books.get(i);%>
                            <img src="<%= book.getCover()%>" alt="...">
                            <div class="caption">
                                <h3><%= book.getBookId()%></h3>
                                <p><%= book.getType()%></p>
                            </div>
                        </div>
                    </div>
                <%}%>
                <%-- 行末元素 --%>
                <%if(i==books.size()){%>
                    </div>
                <%}%>
            <%}%>
            </div>
        </div>
    </div>


</body>
</html>