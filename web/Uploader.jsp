<%--
  Created by IntelliJ IDEA.
  User: wang
  Date: 2018/7/13
  Time: 10:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <title>上传</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <!--
        CDN资源
        <script scr="http://cdn.staticfile.org/webuploader/0.1.0/webuploader.js"></script>
        <script scr="http://cdn.staticfile.org/webuploader/0.1.0/webuploader.min.js"></script>
    -->
    <!-- 本地资源，要加载webuploader.js、webuploader.css、webuploader.min.js、jquery.js -->
    <script type="text/javascript" src="utils/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="utils/webuploader/webuploader.css" type="text/css" />
    <script type="text/javascript" src="utils/webuploader/webuploader.min.js"></script>
    <script type="text/javascript" src="utils/webuploader/webuploader.js"></script>

    <!--前端实现-->
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
                <li><a href="registerpage.html" class="register has_right_line"><font size=3 color="white">注册</font></a></li>
                <li><a href="loginpage.html" class="signin has_right_line"><font size=3 color="white">登录</font></a></li>
                <li><a href="welcome.html" class="photobook has_right_line"><font size=3 color="white">照片书</font></a></li>
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

    <div style="overflow:scroll;width:400px;height:400px;">
<div id="uploader" class="wu-example" >
    <!--用来存放文件信息-->
    <div id="thelist" class="uploader-list"></div>
    <div class="btns">
        <div class="subbg">
            <img src="img/rec.png" height="500" width="1000" align="middle">
        </div>
        <div class="addbtn">
            <div align="center">
            <img src="img/upload.png" height="200" width="200" >
            </div>
        <div id="picker" align="center" style="margin-top: 30px">
            <h4>上传照片</h4>
        </div>

        <div align="center" style="margin-top: 10px">
            <button id="ctlBtn" class="btn btn-default">开始上传</button>
        </div>
            <div align="center" style="margin-top:10px">
        <form name="file" action="/FileDownLoadServlet" method="GET">
            <button class="btn btn-default" type="submit">go to mainboard</button>
        </form>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</body>

<script type="text/javascript">

    $(function () {
        /******  初始化    ******/
        var $ = jQuery,
            $list = $('#thelist'),
            $btn = $('#ctlBtn'),
            state = 'pending',
            ratio = window.devicePixelRatio || 1,
            thumbnailWidth = 100 * ratio,
            thumbnailHeight = 100 * ratio,
            uploader;
        //初始化
        uploader = WebUploader.create({

            // 选完文件后，是否自动上传。
            auto: false,

            // swf文件路径
            //swf: BASE_URL + '/js/Uploader.swf',

            // 文件接收服务端。
            server: 'UploadTestServlet',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#picker',

            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });

        /******  选择文件    ******/
        // 当有文件添加进来的时候
        uploader.on( 'fileQueued', function( file ) {
            var $li = $(
                '<div style="position:absolute;margin-left:400px;margin-top:225px;z-index:3"><div id="' + file.id + '" class="file-item thumbnail">' +
                '<img>' +
                '<div class="info">' + file.name + '</div>' +
                '</div></div>'
                ),
                $img = $li.find('img');


            // $list为容器jQuery实例
            $list.append( $li );

            // 创建缩略图
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                $img.attr( 'src', src );
            }, thumbnailWidth, thumbnailHeight );
        });

        /******  上传状态    ******/
        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            var $li = $( '#'+file.id ),
                $percent = $li.find('.progress span');

            // 避免重复创建
            if ( !$percent.length ) {
                $percent = $('<p class="progress"><span></span></p>')
                    .appendTo( $li )
                    .find('span');
            }

            $percent.css( 'width', percentage * 100 + '%' );
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on( 'uploadSuccess', function( file ) {
            $( '#'+file.id ).addClass('upload-state-done');
        });

        // 文件上传失败，显示上传出错。
        uploader.on( 'uploadError', function( file ) {
            var $li = $( '#'+file.id ),
                $error = $li.find('div.error');

            // 避免重复创建
            if ( !$error.length ) {
                $error = $('<div class="error"></div>').appendTo( $li );
            }

            $error.text('上传失败');
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on( 'uploadComplete', function( file ) {
            $( '#'+file.id ).find('.progress').remove();
        });

        /******  上传按钮    ******/
        //上传的按键
        $btn.on( 'click', function() {
            if ( state === 'uploading' ) {
                uploader.stop();
            } else {
                uploader.upload();
            }
        });
    });
</script>
</html>