<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/7/8 0008
  Time: 17:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
  <script>
      function  upLoad() {
          alert("文件上传中......")
      }
      function downLoad() {
          alert("文件下载中......")
      }
  </script>
  <form action="FileUpLoadServlet" method="GET" >
    选择文件上传：<input type="file" name="name" id="file" />
    <br />
    <input type="submit" onclick="upLoad()" value="提交" />
  </form>
      <input type="button" value="查看图片" onclick="window.open('DB2Web.jsp')">
  </body>
</html>
