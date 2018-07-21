<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ page import="com.whu.database.Photo2Database" %>
<%@ page import="com.whu.database.Book2Database" %>
<%@ page import="com.whu.entity.PhotoBook" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>PhotoBook</title>
    <style type="text/css">
        .box:before {
            content: "";
            width: 0;
            height: 100%;
            background: #000;
            padding: 14px 18px;
            position: absolute;
            top: 0;
            left: 50%;
            opacity: 0;
            transition: all 500ms cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
        }
        .box:hover:before {
            width: 100%;
            left: 0;
            opacity: 0.5;
        }
        #thumbnail .box-Content {
            width: 100%;
            height:100%;
        //padding: 14px 18px;
            color: #fff;
            position: absolute;
            top: 0;
            left: 0;
        }
        #thumbnail .title {
            font-size: 50px;
            font-weight: 600;
            line-height: 300px;
            text-transform: uppercase;
            text-align:center;
            margin: 0;
            opacity: 0;
            transition: all 0.5s ease 0s;
        }
        #thumbnail:hover .title {
            opacity: 1;
            transition-delay: 0.7s;
        }
        .bookPage {
            position: absolute;
            width: 527.19px;
            height: 676.76px;
            top: 11.62px;
            -webkit-transform-style: preserve-3d;
            -moz-transform-style: preserve-3d;
            -ms-transform-style: preserve-3d;
            -o-transform-style: preserve-3d;
            transform-style: preserve-3d;
            -webkit-transition: all linear 2s;
            -moz-transition: all linear 2s;
            -ms-transition: all linear 2s;
            -o-transition: all linear 2s;
            transition: all linear 2s;
        }

        .bookCover {
            position: absolute;
            width: 550px;
            height: 700px;
            top: 0;
            -webkit-transform-style: preserve-3d;
            -moz-transform-style: preserve-3d;
            -ms-transform-style: preserve-3d;
            -o-transform-style: preserve-3d;
            transform-style: preserve-3d;
            -webkit-transition: all linear 2s;
            -moz-transition: all linear 2s;
            -ms-transition: all linear 2s;
            -o-transition: all linear 2s;
            transition: all linear 2s;
        }

        .bookPage .bookContent {
            position: absolute;
            top: 0;
            left: 0;
            width: 527.19px;
            height: 676.76px;
            background-repeat:  no-repeat;
            background-size: 100% 100%;
        //background-position: 0px 11.62px;
        }

        .bookCover .bookContent {
            position: absolute;
            top: 0;
            left: 0;
            width: 550px;
            height: 700px;
            background-size: 100% 100%;
        }

        .runPage {
            left: 550px;
            -webkit-transform-origin: 0 0;
            -moz-transform-origin: 0 0;
            -ms-transform-origin: 0 0;
            -o-transform-origin: 0 0;
            transform-origin: 0 0;
        }



        .runClass {
            -webkit-transform: rotateY(-180deg);
            -moz-transform: rotateY(-180deg);
            -ms-transform: rotateY(-180deg);
            -o-transform: rotateY(-180deg);
            transform: rotateY(-180deg);
        }

        .afterBtn {
        //display: none;
            position: absolute;
            top: 300px;
            cursor: pointer;
            z-index: 4000000;
            font-size: 50px;
            line-height: 100px;
            color: #fff;
            text-decoration: none;
            background-color: rgba(0,0,0,.5);
        }
        .beforeBtn {
            display: none;
            position: absolute;
            top: 300px;
            cursor: pointer;
            z-index: 4000000;
            font-size: 50px;
            line-height: 100px;
            color: #fff;
            text-decoration: none;
            background-color: rgba(0,0,0,.5);
        }
        .beforeBtn {
            left: 0;
        }

        .afterBtn {
            right: 0;
        }
        .beforeBtn:hover,.afterBtn:hover{
            text-decoration:none;
        }

    </style>

    <link rel="stylesheet" type="text/css" href="css/pic_mystyle.css">
    <link rel="stylesheet" type="text/css" href="css/index_mystyle.css">
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-grid.min.css" />
    <script src="https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/skimPhotoBook.js"></script>
    <script src="js/new.js" type="text/javascript" charset="utf-8"></script>
    <script>
	 //画图用到的全局变量
	 var skimCan;
	 var skimCvs;
    	 function myFun(sId) {
              pageNum = 0;
             var book_id = document.getElementById(sId).nextElementSibling.getElementsByTagName("h3")[0].innerHTML;
             $.ajax(
                 {
                     url:"/WelcomeServlet",
                     type:"post",
                     datatype:"json",
                     data:{
                         book_id:book_id,
                     },
                     success:function (data) {
                         var jsonArr = JSON.parse(data.photos);                   //三维数组
                         var cover = data.cover;                     //封面
                         var background =data.background;                 //背景

                         //删除Cover后的所有兄弟结点
                         var bookCover = document.getElementById("pBook").getElementsByClassName("bookCover")[0];
                         var coverParent = bookCover.parentNode;
                         while(bookCover.nextElementSibling != null){
                             document.getElementById("pBook").removeChild(bookCover.nextElementSibling);
                         }
                         coverParent.removeChild(bookCover);
                         bookCover.classList.remove("runClass");
                         coverParent.appendChild(bookCover);

                         var coverImg1=document.getElementById("bookContentF").getElementsByTagName("img");
                         coverImg1[0].src= cover;
                         var coverImg2=document.getElementById("bookContentB").getElementsByTagName("img");
                         coverImg2[0].src= cover;
                         //将书的页数传给翻页的js文件
                         totalPage=jsonArr.length;
                         //开始动态生成书及其属性
                         var skimPhoBook=document.getElementById("pBook");
                         for(var a=1;a <= jsonArr.length;a++){
                             if(a%2==1) {
                                 var childPage = document.createElement("div");
                                 var f = (a + 1) / 2;
                                 childPage.className = "bookPage runPage";
                                 childPage.id = "bookPage" + f;

                                 var childContent1=document.createElement("div");
                                 childContent1.className="bookContent";
                                 childContent1.style.backgroundImage="url(" + background + ")";
                                 var b=2*f-1;
                                 childContent1.id="bookContent"+b;
                                 var childCanvas1=document.createElement("canvas");
                                 childCanvas1.id="myCanvas"+b;
                                 childCanvas1.height="677";
                                 childCanvas1.width="527";
                                 childContent1.appendChild(childCanvas1);
                                 childPage.appendChild(childContent1);

                                 var childContent2=document.createElement("div");
                                 childContent2.className="bookContent";
                                 childContent2.style.backgroundImage="url(" + background + ")";
                                 var c=2*f;
                                 childContent2.id="bookContent"+c;
                                 var childCanvas2=document.createElement("canvas");
                                 childCanvas2.id="myCanvas"+c;
                                 childCanvas2.height="677";
                                 childCanvas2.width="527";
                                 childContent2.appendChild(childCanvas2);
                                 childPage.appendChild(childContent2);

                                 skimPhoBook.appendChild(childPage);
                             }
                         }

                         for (var i = 0; i < $('.runPage').length; i++) {                           //将所有页排序
                             $('.runPage').eq(i).css('z-index', 2000001 - 2 * i);
                             $('.runPage').eq(i).children().eq(0).css('z-index', 2000001 - 2 * i);
                             $('.runPage').eq(i).children().eq(1).css('z-index', 2000000 - 2 * i);
                         }

                         /*画出一本书*/
                         //首先将背面的画布反过来
                         for(var d=1;d<=jsonArr.length;d++)
                         {
                             if(d%2==0)
                             {
                                 skimCan = document.getElementById('myCanvas' + d);
                                 skimCvs = skimCan.getContext("2d");
                                 skimCvs.translate(skimCan.width, 0);
                                 skimCvs.scale(-1, 1);
                             }
                             else{
                                 skimCan=document.getElementById('myCanvas'+d);
                                 skimCvs=skimCan.getContext("2d");
                             }

                             for(var r=0;r<jsonArr[d-1].length;r++)
                             {
                                 var skimImg=new Image();
                                 skimImg.src=jsonArr[d-1][r][0];
                                 skimCvs.save();
                                 skimCvs.translate(jsonArr[d-1][r][5],jsonArr[d-1][r][6]);
                                 skimCvs.rotate(jsonArr[d-1][r][7]);
                                 skimCvs.translate(-jsonArr[d-1][r][5],-jsonArr[d-1][r][6]);
                                 skimCvs.drawImage(skimImg,jsonArr[d-1][r][1],jsonArr[d-1][r][2],jsonArr[d-1][r][3],jsonArr[d-1][r][4]);
                                 skimCvs.restore();
                             }
                         }
                     },
                     error:function (jqXHR, textStatus, errorThrown) {
                         /*弹出jqXHR对象的信息*/
                         alert(jqXHR.responseText);
                         alert(jqXHR.status);
                         alert(jqXHR.readyState);
                         alert(jqXHR.statusText);
                         /*弹出其他两个参数的信息*/
                         alert(textStatus);
                         alert(errorThrown);
                     }
                 }
             )
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
                                    <img src="img/add.png" width="1000" alt="...">
                                    <div class="caption">
                                        <a href="theme.jsp"><button class="btn btn-primary">创建新相册</button></a>
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
                            <%PhotoBook book = (PhotoBook)books.get(i-1);%>
                            <a class="box" id="<%= i %>" href="#photoBook" onclick="myFun(this.id)">
                                <img src="<%= book.getCover()%>" alt="..." />
                                <div class="box-Content">
                                    <h4 class="title">点我浏览</h4>
                                </div>
                            </a>
                            <div class="caption">
                                <h3><%= book.getBookId()%></h3>
                                <p><%= book.getType()%></p>
                            </div>
                        </div>
                    </div>
                <%}else{%><%-- 未转行 --%>
                    <div class="col-md-3 col-sm-6 col-xs-12 ">
                        <div class="thumbnail">
                            <%PhotoBook book = (PhotoBook)books.get(i-1);%>
                            <a class="box" id="<%= i %>" href="#photoBook" onclick="myFun(this.id)">
                                <img src="<%= book.getCover()%>" alt="..." />
                                <div class="box-Content">
                                    <h4 class="title">点我浏览</h4>
                                </div>
                            </a>
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
                <div class="hidden-images-wrapper">
                    <div id="photoBook">
                        <div class="photoBook-1" id="pBook">
                            <a class="beforeBtn"><</a>
                            <a class="afterBtn">></a>

                            <div class="bookCover runPage">
                                <div id="bookContentF" class="bookContent">
                                    <img src="" width="550" height="700"/><%--src动态 + cover--%>
                                </div>
                                <div id="bookContentB" class="bookContent">
                                    <img src="" width="550" height="700"/><%--src动态 + cover--%>
                                </div>
                            </div>
                        </div>
                        <a class="img-close" href="#"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>