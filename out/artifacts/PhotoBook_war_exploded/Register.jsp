<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/7/9 0009
  Time: 17:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>注册</title>
</head>
<body>
<form action="RegisterServlet" method="GET">
    账号：
    <input type="text" name="id_register" required="required">
    <br/>
    密码：
    <input type="password" name="password_register" required="required">
    <br/>
    请确认密码：
    <input type="password" name="password_register_2" required="required">
    <br/>
    <p style="color:red;">${message}</p>
    <input type="submit" value="提交" >
</form>
</body>
</html>
