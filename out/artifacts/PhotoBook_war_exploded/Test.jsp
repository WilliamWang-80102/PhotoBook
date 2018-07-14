<%--
  Created by IntelliJ IDEA.
  User: wang
  Date: 2018/7/14
  Time: 16:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>$Title$</title>
    <script type="text/javascript" src="utils/jquery-3.3.1.min.js"></script>
    <script type="text/javascript">
        $(function () {
            var arr1 = new Array();
            for (var i = 0; i < 5; i++){
                var temp = new Array();
                for(var j = 0 ; j < 5 ;j++){
                    temp.push(j);
                }
                arr1.push(temp);
            }
            $('.myAjax').click(function () {
                $.ajax({
                    type:"POST", //请求方式
                    url:"/SaveServlet", //请求路径
                    cache: false,
                    data:{//传参
                        "photobook":arr1,
                    },
                    tradition: true,
                    dataType: 'json',   //返回值类型
                    success:function(){
                        alert("success!");    //弹出返回过来的List对象
                    },
                    error:function () {
                        alert("failure!");
                    }
                });
            })
            })

    </script>
</head>
<body>
    <button class="myAjax"></button>
</body>
</html>

