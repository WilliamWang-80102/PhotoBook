<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>

<!-- Head -->
<head>

	<title>注册登录</title>

	<!-- Meta-Tags -->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<!--再回到此页面时置顶-->
		<script type="application/x-javascript"> addEventListener("load", function()
		{ 
		setTimeout(hideURLbar, 0); 
		}, false); 
		function hideURLbar()
		{
		window.scrollTo(0,1); 
		}
		</script>
	<!-- //Meta-Tags -->

	<!-- Style --> 
	<link rel="stylesheet" href="css/style.css" type="text/css" media="all">
	<link rel="stylesheet" href="css/amazeui.css" />
	<script src="js/check.js"></script>

</head>
<!-- Body -->
<body class="login-reg-bg">
	<div class="container w3layouts agileits">
		<ul class="am-avg-sm-2 am-padding-top-sm">
			<li class="login-reg-link am-text-right am-padding-right">
			<a href="Register.jsp" id="registerPage">注&nbsp;册</a></li>
			<li class="login-reg-link am-text-left am-padding-left">
			<a href="Login.jsp" class="active" id="loginPage">登&nbsp;录</a></li>
    	</ul>
		<form action="LoginServlet" method="post" class="am-margin-top am-padding-horizontal-xl">
			<input type="text" Name="id_login" placeholder="用户名" required="required" minlength="2" maxlength="32" />
			<input type="password" Name="password_login" placeholder="密码" required="required" minlength="6" maxlength="32" />
			<br/>
			<p style="color:red">${messageLogin}</p>
			<div class="send-button w3layouts agileits ">
				<input type="submit" value="登 录">
			</div>
		</form>
	</div>
</body>
<!-- //Body -->
</html>