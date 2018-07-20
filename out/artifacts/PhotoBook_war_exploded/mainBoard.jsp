<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
     <head>
         <meta charset="utf-8" />
         <style type="text/css">
             .button1{
                 position:absolute;
                 left:0px;
                 top:40px;
                 font-size: 18px;
                 background-color: #158533;
                 color: black;
                 border: 2px solid #064f27;
                 height: 50px;
                 width: 150px;
                 -webkit-transition-duration: 0.4s;
                 transition-duration: 0.4s;
             }
             .button2 {
                 position: absolute;
                 left: 150px;
                 top: 40px;
                 font-size: 18px;
                 background-color: #158533;
                 color: black;
                 border: 2px solid #064f27;
                 height: 50px;
                 width: 150px;
                 -webkit-transition-duration: 0.4s;
                 transition-duration: 0.4s;
             }
             .save {
                 position: absolute;
                 left: 870px;
                 top: 850px;
                 font-size: 18px;
                 background-color: #532d9a;
                 color: black;
                 border: 2px solid #a82f2f;
                 height: 50px;
                 width: 150px;
                 -webkit-transition-duration: 0.4s;
                 transition-duration: 0.4s;
             }
             .save:hover {
                     box-shadow: 0 12px 16px 0 rgba(0,0,0,0.35),0 17px 50px 0 rgba(0,0,0,0.35);
                 }
             .button1:hover {
                     box-shadow: 0 12px 16px 0 rgba(0,0,0,0.35),0 17px 50px 0 rgba(0,0,0,0.35);
                 }

             .button2:hover {
                     box-shadow: 0 12px 16px 0 rgba(0,0,0,0.35),0 17px 50px 0 rgba(0,0,0,0.35);
                 }
             #viewWrapper {
                 width: 300px;
                 height: 850px;
                 position: absolute;
                 top: 90px;
                 left: 0px;
                 overflow: hidden;
                 background: url(l_img/table.jpg) no-repeat 0 0;
                 background-size: 100% 100%;
             }

             .pt-page {
                 margin: 0px;
                 padding: 0px;
                 border: 0;
                 position: absolute;
                 top: 0px;
                 left: 0px;
                 visibility: hidden;
                 -webkit-backface-visibility: hidden;
                 -moz-backface-visibility: hidden;
                 backface-visibility: hidden;
                 -webkit-transform: translate3d(0, 0, 0);
                 -moz-transform: translate3d(0, 0, 0);
                 transform: translate3d(0, 0, 0);
                 -webkit-transform-style: preserve-3d;
                 -moz-transform-style: preserve-3d;
                 transform-style: preserve-3d;
             }

             .pt-page-current, .no-js .pt-page {
                 visibility: visible;
                 z-index: 1;
             }


             #photoBook {
                 float: left;
                 border: 0
             }

             .bookPage .bookContent{
                 background-image: url(<%= request.getSession().getAttribute("background") %>);
                 background-repeat-x: no-repeat;
                 background-repeat-y: no-repeat;
             }
         </style>
		 <title>PhotoBook</title>
		 <link rel="stylesheet" href="l_css/style.css" type="text/css" media="all" />
         <link rel="stylesheet" type="text/css" href="l_css/book.css" />
         <script type="text/javascript" src="l_js/jquery-3.3.1.js"></script>
         <script src="l_js/modernizr.custom.js"></script>
         <script type="text/javascript" src="l_js/jquery.min.js"></script>
         <script type="text/javascript" src="l_js/bookTurn.js"></script>

     </head>
     
     <body>

	 <div id="header">
         <div class="header_warpper">
             <a href="javascript:;" class="ft_black home"><font size=5 color="white">PhotoBook</font></a>
             <ul class="header_top">
                 <li><a href="javascript:;" class="register "><font size=3 >注册</font></a></li>
                 <li><a href="javascript:;" class="signin "><font size=3 >登录</font></a></li>
                 <li><a href="javascript:;" class="photobook "><font size=3 >照片书</font></a></li>
                 <li><a href="javascript:;" class="custom_center "><font size=3 >个人中心</font></a></li>
             </ul>
         </div>
     </div>

	


     <input class="button1" type="button" onclick="changeView('#photoTable')" value="图片" />
     <input class="button2" type="button" onclick="changeView('#illustration')" value="插图" />


         <div id="viewWrapper">
             <div id="photoTable" class="pt-page" style="overflow:auto;height:850px;width:300px" ondrop="drop(event)" ondragover="allowDrag(event)">
                 <%--动态生成图片--%>
                 <%--待解决问题：每次点击图片按钮都会刷新界面导致之前平移到照片书上的内容消失--%>
             <table border="2px">

                 <c:forEach items="${fileList}" var="key" varStatus="ID">
                     <tr>
                         <td height="200px">
                             <img src="/${key}" style="max-width:100%;max-height:100%" draggable="true" ondragstart="drag(event)" id="${ID.count+a}"/>
                         </td>
                     </tr>
                 </c:forEach>
             </table>
         </div>

             <div id="illustration" class="pt-page" style="overflow:auto;height:850px;width:300px" ondrop="drop(event)" ondragover="allowDrag(event)">
                 <table border="2px">
                     <tr>
                         <th height="50px"><b>表情</b></th>
                     </tr>

                     <tr>
                         <c:forEach items="${MapList}" var="mapKey" varStatus="map">
                             <td height="100px" width="100px">
                                 <img src="/${mapKey}" style="max-width:100%;max-height:100%" draggable="true" ondragstart="drag(event)" id=${map.count}"/>
                          </td>
                          <c:if test="${map.count%3==0}"></tr></c:if>
                       </c:forEach>
                     </tr>
                 </table>
             </div>
         </div>

     <%--照片书界面--%>

            <div id="photoBook" style="height:700px;width:1100px">
                 <a class="lastBtn"><</a>
                 <a class="nextBtn">></a>

                 <div class="bookCover runPage">
                     <div id="bookContentF" class="bookContent">
                         <img width="550" height="700" src="<%= request.getSession().getAttribute("cover") %>" />
                     </div>
                     <div id="bookContentB" class="bookContent">
                         <img width="550" height="700" src="<%= request.getSession().getAttribute("cover") %>"/>
                     </div>
                 </div>

                 <div class="bookPage runPage" id="bookPage1" ondrop="drop(event)" ondragover="allowDrag(event)">
                     <div id="bookContent1" class="bookContent">
                         <canvas id="myCanvas1" height="677" width="527"></canvas>
                     </div>
                     <div id="bookContent2" class="bookContent">
                         <canvas id="myCanvas2" height="677" width="527"></canvas>
                     </div>
                 </div>

                 <div class="bookPage runPage" id="bookPage2" ondrop="drop(event)" ondragover="allowDrag(event)">
                     <div id="bookContent3" class="bookContent">
                         <canvas id="myCanvas3" height="677" width="527"></canvas>
                     </div>
                     <div id="bookContent4" class="bookContent">
                         <canvas id="myCanvas4" height="677" width="527"></canvas>
                     </div>
                 </div>

                 <div class="bookPage runPage" id="bookPage3" ondrop="drop(event)" ondragover="allowDrag(event)">
                     <div id="bookContent5" class="bookContent">
                         <canvas id="myCanvas5" height="677" width="527"></canvas>
                     </div>
                     <div id="bookContent6" class="bookContent">
                         <canvas id="myCanvas6" height="677" width="527"></canvas>
                     </div>
                 </div>

                 <div class="bookPage runPage" id="bookPage4" ondrop="drop(event)" ondragover="allowDrag(event)">
                     <div id="bookContent7" class="bookContent">
                         <canvas id="myCanvas7" height="677" width="527"></canvas>
                     </div>
                     <div id="bookContent8" class="bookContent">
                         <canvas id="myCanvas8" height="677" width="527"></canvas>
                     </div>
                 </div>
             </div>


            <form action="/SaveServlet" method="post">
                <input id="myBook_id" type="hidden" name="book_id" value="" />
                <input id="myPhotobook" type="hidden" name="photobook" value="" />
                <input class="save" type="submit" onclick="" value="保存" />
            </form>

             <script src="l_js/mainBoard.js"></script>

     </body>
</html>