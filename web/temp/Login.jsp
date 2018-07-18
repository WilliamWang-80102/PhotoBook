<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/7/9 0009
  Time: 17:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>
</head>
<body>
<form action="LoginServlet" method="GET">
    账号：
    <input type="text" name="id_login" required="required">
    <br/>
    密码：
    <input type="password" name="password_login" required="required">
    <br/>
    <p style="color:red">${message}</p>
    <input type="submit" value="登录">
    <input type="button" value="注册" onclick="window.open('Register.jsp')">
</form>


</body>
</html>
