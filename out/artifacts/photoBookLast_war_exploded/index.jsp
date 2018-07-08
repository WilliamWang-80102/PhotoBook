<%--
  Created by IntelliJ IDEA.
  User: luoheng
  Date: 2018/7/8
  Time: 13:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
  <script>
      function  myFunction() {
          alert("文件上传中......")
      }
  </script>
  <form action="FileUpLoadServlet" method="GET" >
    选择文件上传：<input type="file" name="name">
    <br />
    <input type="submit" onclick="myFunction()" value="提交" />
  </form>
  </body>
</html>
