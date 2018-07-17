//定义一些全局变量，以后会用得到
var photoPP = new Array();                      //这个厉害了，存储各个画布所有图片各个信息,是个三维数组。。。（没想到好的办法，暂时用扩充数组的方法。。。）

//var photoParent = new Array();    //这个数组用于保存整个画布中所有图片的src,dx,dy,dw,dh,图片的中心坐标,图片的旋转角度
//var photoCount = 0;         //用于保存已经在画布上绘制的图片的数量
var position_x;             //鼠标在画布上的相对位置x
var position_y;             //鼠标在画布上的相对位置y
var Location_x;             //拖动图片到照片书上时鼠标相对于浏览器的坐标
var Location_y;             //同上
var TTsx;                   //拉伸时重定位中心点用到的全局变量
var TTsy;                   //同上
var canNum2;            //右边画布页数（canNum1为左边画布页数）
var bookPageNum1;       //左边bookPage页数
var bookPageNum2;       //右边bookPage页数
var pageFlag;                              //用于判断鼠标位于左页还是右页的BOOL型变量
var can;                               //表示鼠标所在的画布的全局变量
var cvs;
var Loc_x;                            //表示鼠标在photoBook中的位置
var Loc_y;
var photoPP_i;                         //表示当前是第几个画布
var chooseFlag = 0;           //表示是否有图片被选中    BOOL
var deleteFlag = 0;           //表示是否进行了删除操作    BOOL
var canFlag;              //表示当前哪个画布处于激活状态，是一个画布的下标


//var can = document.getElementById('myCanvas1');
//var cvs = can.getContext("2d"); 

const RECT_SIDE= 8;
const CIRCLE_RADIUS = 5;
const HANDLER_X = 0;
const HANDLER_Y = -40;
const MIN_LENGTH = 20;



$('.save').click(function () {
    //背景
    var background = window.getComputedStyle(document.getElementById("bookContentF")).backgroundImage;
    //书名
    var book_id = prompt("请输入照片书名：");
	var jsonArr = JSON.stringify(photoPP);
	//封面
    var cover = document.getElementById("bookContentF").getElementsByTagName("img")[0].src;


    $.ajax({
        type: "POST", //请求方式
        url: "/SaveServlet", //请求路径
        cache: false,
        data: {//传参
            "photobook": jsonArr,
            "book_id":book_id,
            "cover":cover,
            "background":background,
        },
        dataType: 'json',   //返回值类型
        success: function () {
            alert("success!");    //弹出返回过来的List对象
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        },
    })
})


window.onload = function(){

	var myCan;
	var myCtx;
	for (var i = 0; i < 7; i++) {
        photoPP[i] = new Array();
    }
    for (var j = 1; j < 4; j++)
    {
        var k = 2 * j;
        myCan = document.getElementById('myCanvas' + k);
        myCtx = myCan.getContext("2d");
        myCtx.translate(myCan.width, 0);
        myCtx.scale(-1, 1);
    }
	//光标样式变换
	window.addEventListener('mousemove',function(ev){
		var e = ev || event;
		getMouseLocation(e);
		can_i = -1;
		var relative_x;
		var relative_y;
        if (Loc_x >= 0 && Loc_x < 550 && Loc_y >= 0 && Loc_y < 700) {                                         //左边
            if (canNum1 == 0 || canNum1==-2) return;
	        can_i = canNum1 - 1;
	        bookPageNum1 = canNum1 / 2;
	        myCan = document.getElementById('myCanvas' + canNum1);
	        myCtx = myCan.getContext("2d");
	        relative_x = Loc_x;
	        relative_y = Loc_y;
		}
        else if (Loc_x >= 550 && Loc_x < 1100 && Loc_y >= 0 && Loc_y < 700) {                                  //右边
            
            canNum2 = canNum1 + 1;
            if (canNum2 == -1) return;
	        can_i = canNum2 - 1;
	        bookPageNum2 = (canNum1 + 2) / 2;
	        myCan = document.getElementById('myCanvas' + canNum2);
	        myCtx = myCan.getContext("2d");
	        relative_x = Loc_x - document.getElementById('bookPage' + bookPageNum2).offsetLeft;
	        relative_y = Loc_y - document.getElementById('bookPage' + bookPageNum2).offsetTop;
	    }
	    else
	    {
	        return;
	    }
	    if(photoPP[can_i].length == 0) return;

		var tempX = photoPP[can_i][photoPP[can_i].length - 1][5] + (relative_x - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (relative_y - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x
	    var tempY = photoPP[can_i][photoPP[can_i].length - 1][6] + (relative_x - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (relative_y - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y
	   	if(//右边框拖拽
	   		(tempX >=  (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] - RECT_SIDE / 2)) && 
	    	(tempX <=  (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] + RECT_SIDE / 2)) && 
	    	(tempY >= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] / 2 - RECT_SIDE / 2)) &&
	    	(tempY <= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] / 2 + RECT_SIDE / 2))
	    ){
	   		can.style.cursor = 'e-resize';
	    }else if (//左边框拖拽
	    	(tempX >=  (photoPP[can_i][photoPP[can_i].length - 1][1] - RECT_SIDE / 2)) && 
		    (tempX <=  (photoPP[can_i][photoPP[can_i].length - 1][1] + RECT_SIDE / 2)) && 
		    (tempY >= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] / 2 - RECT_SIDE / 2)) &&
		    (tempY <= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] / 2 + RECT_SIDE / 2))
	    ){
	    	can.style.cursor = 'w-resize';
	    }else if(//上边框拖拽
	    	(tempX >=  (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] / 2 - RECT_SIDE / 2)) && 
	    	(tempX <=  (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] / 2 + RECT_SIDE / 2)) && 
	    	(tempY >= (photoPP[can_i][photoPP[can_i].length - 1][2] - RECT_SIDE / 2)) &&
	    	(tempY <= (photoPP[can_i][photoPP[can_i].length - 1][2] + RECT_SIDE / 2))
	    ){
	    	can.style.cursor = 'n-resize';
	    }else if(//下边框拖拽
	    	(tempX >=  (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] / 2 - RECT_SIDE / 2)) && 
	    	(tempX <=  (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] / 2 + RECT_SIDE / 2)) && 
	    	(tempY >= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] - RECT_SIDE / 2)) &&
	    	(tempY <= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] + RECT_SIDE / 2))
	    ){
	    	can.style.cursor = 's-resize';
	    }else if(Math.pow(tempX - photoPP[can_i][photoPP[can_i].length - 1][1],2) + 
	    	Math.pow(tempY - photoPP[can_i][photoPP[can_i].length - 1][2] - photoPP[can_i][photoPP[can_i].length - 1][4],2) < Math.pow(CIRCLE_RADIUS,2)){//左下角
	    	can.style.cursor = 'sw-resize';
	    }else if(Math.pow(tempX - photoPP[can_i][photoPP[can_i].length - 1][1],2) + 
	    Math.pow(tempY - photoPP[can_i][photoPP[can_i].length - 1][2],2) < Math.pow(CIRCLE_RADIUS,2)){//左上角
	    	can.style.cursor = 'nw-resize';
	    }else if(Math.pow(tempX - photoPP[can_i][photoPP[can_i].length - 1][1] - photoPP[can_i][photoPP[can_i].length - 1][3],2) + 
	    	Math.pow(tempY - photoPP[can_i][photoPP[can_i].length - 1][2],2) < Math.pow(CIRCLE_RADIUS,2)){//右上角
	    	can.style.cursor = 'ne-resize';
	    }else if(Math.pow(tempX - photoPP[can_i][photoPP[can_i].length - 1][1] - photoPP[can_i][photoPP[can_i].length - 1][3],2) + 
    	Math.pow(tempY - photoPP[can_i][photoPP[can_i].length - 1][2] - photoPP[can_i][photoPP[can_i].length - 1][4],2) < Math.pow(CIRCLE_RADIUS,2)){//右下角
	    	can.style.cursor = 'se-resize';
	    }else {
	    	can.style.cursor = 'auto';
	    }
	},false);
}
/*键盘监听事件*/
document.onkeydown = function (e) {
    var keyNum = window.event ? e.keyCode : e.which;   //考虑浏览器的兼容性
    if (keyNum == 8) {
        if (deleteFlag == 1) {
            photoPP[photoPP_i].splice(photoPP[photoPP_i].length - 1, 1);
            redraw(photoPP_i, canFlag);
            deleteFlag = 0;
        }
        else {
            alert("请选中一张图片再删除");
        }
    }
}


/*实时获取鼠标在photoBook上的位置，用于判断鼠标是在左页还是右页*/
function getMouseLocation(e) {
    var e = e || event;
     Loc_x = e.pageX - document.getElementById('photoBook').offsetLeft;
     Loc_y = e.pageY - document.getElementById('photoBook').offsetTop;
    if (Loc_x >= 0 && Loc_x < 550 && Loc_y >= 0 && Loc_y < 700)
    {
        pageFlag = 0;
    }
    else if (Loc_x >= 550 && Loc_x < 1100 && Loc_y >= 0 && Loc_y < 700)
    {
        pageFlag = 1;
    }
    else
    {
        pageFlag = 2;
    }
}

/* 实时获取鼠标在画布上的位置*/
//function getMouseLocation(e){
//    var e = e || event;
//    Location_x = e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById('bookPage1').offsetLeft;
//    Location_y = e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById('bookPage1').offsetTop;
//	position_x = Location_x;
//	position_y = Location_y;
//}


function allowDrag(ev) {
	ev.preventDefault();
}
function drag(ev) {
	ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    getMouseLocation(ev);
    if (pageFlag == 0)            //在左边的page
    {
        if (canNum1 == 0) return;            //鼠标在封面，什么都不做
        if (canNum1 == -2) return;           //书还未打开，鼠标点在了左边外面
        else if (canNum1 > 0)
        {
            can = document.getElementById('myCanvas' + canNum1);
            cvs = can.getContext("2d");
            bookPageNum1 = canNum1 / 2;
            Location_x = Loc_x; //- document.getElementById('bookPage' + bookPageNum1).offsetLeft;                //得到鼠标在画布上的位置
            Location_y = Loc_y; //- document.getElementById('bookPage' + bookPageNum1).offsetTop;      这个地方先这么写，之后加样式了再改
            position_x = Location_x;
            position_y = Location_y;
            photoPP_i = canNum1 - 1;
        }
    }
    else if (pageFlag == 1)        //在右边的page
    {
        canNum2 = canNum1 + 1;
        can = document.getElementById('myCanvas' + canNum2);
        cvs = can.getContext("2d");
        bookPageNum2 = (canNum1 + 2) / 2;
        Location_x = Loc_x - document.getElementById('bookPage' + bookPageNum2).offsetLeft;                    //得到鼠标在画布上的位置
        Location_y = Loc_y - document.getElementById('bookPage' + bookPageNum2).offsetTop;
        position_x = Location_x;
        position_y = Location_y;
        photoPP_i = canNum2 - 1;
    }
    else if (pageFlag == 2)        //鼠标不在photoBook中，什么都不做
    {
        return;
    }
    //判断指针是否在画布范围内
 //   if (!((ev.pageX >= document.getElementById('photoBook').offsetLeft + document.getElementById('bookPage1').offsetLeft) && (ev.pageX <= (document.getElementById('photoBook').offsetLeft + document.getElementById('bookPage1').offsetLeft + parseFloat(window.getComputedStyle(can).width))) &&
 //       (ev.pageY >= document.getElementById('photoBook').offsetTop + document.getElementById('bookPage1').offsetTop) && (ev.pageY <= document.getElementById('photoBook').offsetTop + document.getElementById('bookPage1').offsetTop + parseFloat(window.getComputedStyle(can).height)))) {
	//	return;
	//}
	//获取释放鼠标时指针坐标
	//getMouseLocation(ev);

	ev.preventDefault();
	var photoChildren = new Array();
	var data = ev.dataTransfer.getData("Text");
	var src1 = document.getElementById(data).src;
	var img = new Image();
    img.src = src1;
    var dw, dh;
    if (isNaN(data)) {
        dw = 80;
        dh = 80;
    }
    else {
        dw = 250;
        dh = 404;
    }
	cvs.drawImage(img, Location_x, Location_y, dw, dh);
	photoChildren[0] = src1;
	photoChildren[1] = Location_x;
	photoChildren[2] = Location_y;
	photoChildren[3] = dw;
	photoChildren[4] = dh;
	photoChildren[5] = Location_x + (dw / 2);
	photoChildren[6] = Location_y + (dh / 2);
    photoChildren[7] = 0;
    photoPP[photoPP_i].push(photoChildren);
}

/*将一张图片浮出的函数*/
function floatPhoto(float_x, float_y, can_i) {
    if (can_i < 0)                 //点的不是画布，你乱点什么呢。。。
    {
        return;
    }
    if (photoPP[can_i].length == 0)             //点到了空白的画布（什么图片都没有)
    {
        return;
    }
    var photoLAP = new Array();            //保存鼠标所在位置的图片信息
    var a = 0;                             //初始化重叠部分图片数组下标(用时需要减1，你懂得)

    for (var i = 0; i < photoPP[can_i].length; i++) {
        var tempX = photoPP[can_i][i][5] + (float_x - photoPP[can_i][i][5]) * Math.cos(-photoPP[can_i][i][7]) - (float_y - photoPP[can_i][i][6]) * Math.sin(-photoPP[can_i][i][7]); //鼠标按图片旋转角还原的临时坐标x
        var tempY = photoPP[can_i][i][6] + (float_x - photoPP[can_i][i][5]) * Math.sin(-photoPP[can_i][i][7]) + (float_y - photoPP[can_i][i][6]) * Math.cos(-photoPP[can_i][i][7]); //鼠标按图片旋转角还原的临时坐标y
        //若指针在该图片范围内
        if (Math.abs(tempX - photoPP[can_i][i][5]) <= (photoPP[can_i][i][3] / 2) && Math.abs(tempY - photoPP[can_i][i][6]) <= (photoPP[can_i][i][4] / 2)) {
            a = photoLAP.push(photoPP[can_i][i]);
        }
    }

    //重叠数组最后一个即符合上述条件,将此图片移到总图片数组的最后面
    for (var i = photoPP[can_i].length - 1; i >= 0; i--) {
        if (a == 0) {                                 //点击空白处的操作
            /*将所有页中的选中状态取消*/
            chooseFlag = 0;
            deleteFlag = 0;
            return;
        }
        if ((photoPP[can_i][i][0] == photoLAP[a - 1][0]) && (photoPP[can_i][i][1] == photoLAP[a - 1][1]) && (photoPP[can_i][i][2] == photoLAP[a - 1][2]) && (photoPP[can_i][i][3] == photoLAP[a - 1][3]) && (photoPP[can_i][i][4] == photoLAP[a - 1][4]) && (photoPP[can_i][i][5] == photoLAP[a - 1][5]) && (photoPP[can_i][i][6] == photoLAP[a - 1][6]) && (photoPP[can_i][i][7] == photoLAP[a - 1][7])) {
            var temp = photoPP[can_i][i];
            for (var b = i; b < photoPP[can_i].length - 1; b++) {
                photoPP[can_i][b] = photoPP[can_i][b + 1];
            }
            photoPP[can_i][photoPP[can_i].length - 1] = temp;
            break;         //防止出现两个图片完全重叠的情况（完全重叠这个if条件语句会执行两次，不应该执行两次，用break跳出）
        }
    }

    photoPP_i = can_i;
    //重绘图片
    /*将所有页中的选中状态取消*/
    chooseFlag = 1;
    deleteFlag = 1;                //可以删除
    redraw(can_i, canFlag);
}

/* 鼠标在画布上点击时*/
//实现图片的平移（先用鼠标将层叠的图片区分开，想平移的绘制到最上面)
window.onmousedown = function (ev) {  
    var e = ev || event;
    var drag_x;
    var drag_y;
    var bookPageNum3;               //暂存页数
    var operaFlag;                //告诉后面的操作函数这是左边还是右边
    var can_i= -1;           //将点击到的canvas信息(canvas下标)传给相应的函数
    var Ldown_x = e.pageX - document.getElementById('photoBook').offsetLeft;             //获取鼠标在photoBook中的位置，用于后面判断属于哪个画布
    var Ldown_y = e.pageY - document.getElementById('photoBook').offsetTop;
    if (Ldown_x >= 0 && Ldown_x < 550 && Ldown_y >= 0 && Ldown_y < 700) {                                         //左边           
        bookPageNum1 = canNum1 / 2;
        bookPageNum3 = bookPageNum1;
        if (bookPageNum3 == 0 || bookPageNum3 == -1)                                      //点到了封面或是书未打开而没点到书，什么都不做
        {
            return;
        }
        drag_x = e.pageX - document.getElementById('photoBook').offsetLeft;// - document.getElementById("bookPage" + bookPageNum1).offsetLeft;
        drag_y = e.pageY - document.getElementById('photoBook').offsetTop;// - document.getElementById("bookPage" + bookPageNum1).offsetTop;
        can_i = canNum1 - 1;
        canFlag = can_i;
        for (var m = 0; m < 7; m++)                                                                                                                                                                   //一共多少页还没定，目前当成7页
        {
            var n = m + 1;
            can = document.getElementById('myCanvas' + n);
            cvs = can.getContext("2d");
            redraw(m, canFlag);
        }
        can = document.getElementById('myCanvas' + canNum1);
        cvs = can.getContext("2d");
        operaFlag = 0;
    }
    else if (Ldown_x >= 550 && Ldown_x < 1100 && Ldown_y >= 0 && Ldown_y < 700) {                                  //右边
        if (canNum1 == -2) return;                                     //书未打开
        bookPageNum2 = (canNum1 + 2) / 2;
        bookPageNum3 = bookPageNum2;
        drag_x = e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById("bookPage" + bookPageNum3).offsetLeft;
        drag_y = e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById("bookPage" + bookPageNum3).offsetTop;
        canNum2 = canNum1 + 1;
        can_i = canNum2 - 1;
        canFlag = can_i;
        for (var m = 0; m < 7; m++)                                                                                                                                                                   //一共多少页还没定，目前当成7页
        {
            var n = m + 1;
            can = document.getElementById('myCanvas' + n);
            cvs = can.getContext("2d");
            redraw(m, canFlag);
        }
        can = document.getElementById('myCanvas' + canNum2);
        cvs = can.getContext("2d");
        operaFlag = 1;
    }
    else
    {
        return;
    }
    floatPhoto(drag_x, drag_y, can_i);
    dragPhoto(drag_x, drag_y, can_i, bookPageNum3, operaFlag);              //将点的是哪个canvas，在哪个bookPage上点的，都传给相应的函数
    rotatePhoto(drag_x, drag_y, can_i, bookPageNum3, operaFlag);
    scalePhoto(drag_x, drag_y, can_i, bookPageNum3, operaFlag);
};

//拖拽函数
function dragPhoto(drag_x, drag_y,can_i,bookPageNum3,operaFlag) {
    //无图片则返回
    if (photoPP[can_i].length == 0) 
        return;
    var tempX = photoPP[can_i][photoPP[can_i].length - 1][5] + (drag_x - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (drag_y - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x
    var tempY = photoPP[can_i][photoPP[can_i].length - 1][6] + (drag_x - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (drag_y - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y
    if ((Math.abs(tempX - photoPP[can_i][photoPP[can_i].length - 1][5]) < photoPP[can_i][photoPP[can_i].length - 1][3] / 2) &&
        (Math.abs(tempY - photoPP[can_i][photoPP[can_i].length - 1][6]) < 1 / 2 * photoPP[can_i][photoPP[can_i].length - 1][4])
        ) 
    {
        var tempPPx = photoPP[can_i][photoPP[can_i].length - 1][1];
        var tempPPy = photoPP[can_i][photoPP[can_i].length - 1][2];
    	window.onmousemove = function (ev) {
            var e = ev || event;
            var cx;
            var cy;
            if (operaFlag == 1) {
                cx = (e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById("bookPage" + bookPageNum3).offsetLeft) - drag_x;
                cy = (e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById("bookPage" + bookPageNum3).offsetTop) - drag_y;
            }
            else if (operaFlag == 0)
            {
                cx = (e.pageX - document.getElementById('photoBook').offsetLeft) - drag_x;
                cy = (e.pageY - document.getElementById('photoBook').offsetTop) - drag_y;
            }
            photoPP[can_i][photoPP[can_i].length - 1][1] = tempPPx + cx;
            photoPP[can_i][photoPP[can_i].length - 1][2] = tempPPy + cy;
            photoPP[can_i][photoPP[can_i].length - 1][5] = photoPP[can_i][photoPP[can_i].length - 1][1] + (photoPP[can_i][photoPP[can_i].length - 1][3] / 2);
            photoPP[can_i][photoPP[can_i].length - 1][6] = photoPP[can_i][photoPP[can_i].length - 1][2] + (photoPP[can_i][photoPP[can_i].length - 1][4] / 2);
            //清空重画
            redraw(can_i, canFlag);
        };
        window.onmouseup = function () {
            window.onmousemove = null;
            window.onmouseup = null;
            chooseFlag = 0;
        };
    }
}

//旋转函数
function rotatePhoto(rotate_x, rotate_y, can_i, bookPageNum3,operaFlag) {      //这个参数里面的x,y实际上是图片被点击瞬间一个角的坐标
    //无图片则返回
    if (photoPP[can_i].length == 0)                           //画布中什么都没有，直接返回，防止后面判断时用到改画布中的元素，因为没有而出错
        return;
    var tempX = photoPP[can_i][photoPP[can_i].length - 1][5] + (rotate_x - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (rotate_y - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x
    var tempY = photoPP[can_i][photoPP[can_i].length - 1][6] + (rotate_x - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (rotate_y - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y

    var handlerX = photoPP[can_i][photoPP[can_i].length - 1][5];
    var handlerY = photoPP[can_i][photoPP[can_i].length - 1][2] - 40;

    if(Math.pow(tempX - handlerX,2) + Math.pow(tempY - handlerY,2) <= 25)
    {
        chooseFlag = 1;
        var tempPPa = photoPP[can_i][photoPP[can_i].length - 1][7];
        window.onmousemove = function (ev) {
            var e = ev || event;
            var rx;
            var ry;
            if (operaFlag == 1) {                              //右边
                rx = e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById("bookPage" + bookPageNum3).offsetLeft;      //鼠标在移动，当前鼠标的x坐标
                ry = e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById("bookPage" + bookPageNum3).offsetTop;        //同上
            }
            else if (operaFlag == 0)
            {
                rx = e.pageX - document.getElementById('photoBook').offsetLeft;
                ry = e.pageY - document.getElementById('photoBook').offsetTop;
            }
            /*保存临时角cos值的变量*/
            var tempCosValue = (Math.pow((rx - photoPP[can_i][photoPP[can_i].length - 1][5]), 2) + Math.pow((ry - photoPP[can_i][photoPP[can_i].length - 1][6]), 2) + Math.pow((rotate_x - photoPP[can_i][photoPP[can_i].length - 1][5]), 2) + Math.pow((rotate_y - photoPP[can_i][photoPP[can_i].length - 1][6]), 2) - Math.pow((rx - rotate_x), 2) - Math.pow((ry - rotate_y), 2)) / (2 * Math.sqrt((Math.pow((rx - photoPP[can_i][photoPP[can_i].length - 1][5]), 2) + Math.pow((ry - photoPP[can_i][photoPP[can_i].length - 1][6]), 2)) * (Math.pow((rotate_x - photoPP[can_i][photoPP[can_i].length - 1][5]), 2) + Math.pow((rotate_y - photoPP[can_i][photoPP[can_i].length - 1][6]), 2))));
            var tempAngle = Math.acos(tempCosValue);
            //判断是顺时针还是逆时针
            if (((rx - photoPP[can_i][photoPP[can_i].length - 1][5]) * (rotate_y - photoPP[can_i][photoPP[can_i].length - 1][6]) - (ry - photoPP[can_i][photoPP[can_i].length - 1][6]) * (rotate_x - photoPP[can_i][photoPP[can_i].length - 1][5])) >= 0)
            {
                //逆时针
                photoPP[can_i][photoPP[can_i].length - 1][7] = -tempAngle + tempPPa;
            }
            else if (((rx - photoPP[can_i][photoPP[can_i].length - 1][5]) * (rotate_y - photoPP[can_i][photoPP[can_i].length - 1][6]) - (ry - photoPP[can_i][photoPP[can_i].length - 1][6]) * (rotate_x - photoPP[can_i][photoPP[can_i].length - 1][5])) < 0)
            {
                //顺时针
                photoPP[can_i][photoPP[can_i].length - 1][7] = tempAngle + tempPPa;
            }
            //清空重画
            redraw(can_i, canFlag);
        };
        window.onmouseup = function () {
            window.onmousemove = null;
            window.onmouseup = null;
            chooseFlag = 0;
        };
    }
}

//canvas的重绘
function redraw(can_i,can_Flag){
    cvs.clearRect(0, 0, can.width, can.height);
    for (var i = 0; i < photoPP[can_i].length; i++)
	{
		var rotaImg = new Image();
        rotaImg.src = photoPP[can_i][i][0];
		cvs.save();
        cvs.translate(photoPP[can_i][i][5], photoPP[can_i][i][6]);
        cvs.rotate(photoPP[can_i][i][7]);
        cvs.translate(-photoPP[can_i][i][5], -photoPP[can_i][i][6]);
        cvs.drawImage(rotaImg, photoPP[can_i][i][1], photoPP[can_i][i][2], photoPP[can_i][i][3], photoPP[can_i][i][4]);
		cvs.restore();
	}
    //为焦点图片绘制边框
    if (can_i == can_Flag) {                   //如果是激活的页面，就根据情况画边框
        borederRender(can_i, chooseFlag, deleteFlag);
    }
}

/**
 * 为焦点图片绘制边框
 * 四角圆半径5
 * 四边正方形边长8
 * 顶部把柄半径5
 * 把柄距上边40
 */

function borederRender(can_i,chooseFlag,deleteFlag){
    //无图片则返回
    if (photoPP[can_i].length == 0) 
		return;
    if (chooseFlag == 0) return;            //是否被选中，不被选中则不画边框
	cvs.save();
	//考虑旋转,且设坐标轴原点在图片的左上角坐标处
    cvs.translate(photoPP[can_i][photoPP[can_i].length - 1][5], photoPP[can_i][photoPP[can_i].length - 1][6]);
    cvs.rotate(photoPP[can_i][photoPP[can_i].length - 1][7]);
    cvs.translate(-photoPP[can_i][photoPP[can_i].length - 1][3] / 2, -photoPP[can_i][photoPP[can_i].length - 1][4]/2);

	//虚线矩形
	cvs.save();
	cvs.beginPath();
    cvs.rect(0, 0, photoPP[can_i][photoPP[can_i].length - 1][3], photoPP[can_i][photoPP[can_i].length - 1][4]);
	cvs.lineWidth = 1;
	cvs.setLineDash([5,15]);
	cvs.stroke();
	cvs.restore();

	//四个小原点
	cvs.save();
	for(var i = 0; i < 2; i++){
		for (var j = 0; j < 2; j++) {
			cvs.beginPath();
            cvs.arc(photoPP[can_i][photoPP[can_i].length - 1][3] * i, photoPP[can_i][photoPP[can_i].length - 1][4] * j,CIRCLE_RADIUS,0,2*Math.PI,true);
			cvs.stroke();
		}
	}
	cvs.restore();

	//四个小矩形
	cvs.save();
	//top
	cvs.beginPath();
	cvs.rect(photoPP[can_i][photoPP[can_i].length - 1][3] / 2 - RECT_SIDE / 2,-RECT_SIDE / 2,RECT_SIDE,RECT_SIDE);
	cvs.stroke();

	//bottom
	cvs.beginPath();
	cvs.rect(photoPP[can_i][photoPP[can_i].length - 1][3] / 2 - RECT_SIDE / 2,photoPP[can_i][photoPP[can_i].length - 1][4] - RECT_SIDE / 2,RECT_SIDE,RECT_SIDE);
	cvs.stroke();

	//left
	cvs.beginPath();
	cvs.rect(-4, photoPP[can_i][photoPP[can_i].length - 1][4] / 2 - RECT_SIDE / 2,RECT_SIDE,RECT_SIDE);
	cvs.stroke();

	//right
	cvs.beginPath();
    cvs.rect(photoPP[can_i][photoPP[can_i].length - 1][3] - 4, photoPP[can_i][photoPP[can_i].length - 1][4] / 2 - RECT_SIDE,RECT_SIDE,RECT_SIDE);
	cvs.stroke();
	cvs.restore();

	//把柄
	cvs.save();
    cvs.translate(photoPP[can_i][photoPP[can_i].length - 1][3] / 2,0);
	cvs.beginPath();
	cvs.arc(0,-40,CIRCLE_RADIUS,0,2*Math.PI,true);
	cvs.fillStyle = "green";
	cvs.fill();
	cvs.restore();

	//直线
	cvs.save();
    cvs.translate(photoPP[can_i][photoPP[can_i].length - 1][3] / 2,0);
	cvs.setLineDash([2,4]);
	cvs.lineWidth = 1;
	cvs.moveTo(0,0);
	cvs.lineTo(0,-35);
	cvs.stroke();
	cvs.restore();

	cvs.restore();
}

//图片的放大缩小函数
function scalePhoto(scale_x, scale_y,can_i,bookPageNum3,operaFlag) {
    //无图片则返回
    if (photoPP[can_i].length == 0) 
		return;
	
    //记录鼠标的等价点击位置（等价于点击水平图片的坐标）
    var tempX = photoPP[can_i][photoPP[can_i].length - 1][5] + (scale_x - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (scale_y - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x
    var tempY = photoPP[can_i][photoPP[can_i].length - 1][6] + (scale_x - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (scale_y - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y
    
    //记录图片旧的中心位置
    var oldCenterX = photoPP[can_i][photoPP[can_i].length - 1][5];
    var oldCenterY = photoPP[can_i][photoPP[can_i].length - 1][6];

    //记录原边长
    var tWidth = photoPP[can_i][photoPP[can_i].length - 1][3];
    var tHeight = photoPP[can_i][photoPP[can_i].length - 1][4];

    //右边框伸缩
    if ((tempX >= (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] - 4)) &&
        (tempX <= (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] + 4)) &&
        (tempY >= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] / 2 - 4)) &&
        (tempY <= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] / 2 + 4)))
    {
        chooseFlag = 1;
        var tempPPw = photoPP[can_i][photoPP[can_i].length - 1][3];
        window.onmousemove = function (ev) {
            var e = ev || event;
            var sx;
            var sy;
            if (operaFlag == 1) {
                sx = e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById("bookPage" + bookPageNum3).offsetLeft;
                sy = e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById("bookPage" + bookPageNum3).offsetTop;
            }
            else if (operaFlag == 0)
            {
                sx = e.pageX - document.getElementById('photoBook').offsetLeft;
                sy = e.pageY - document.getElementById('photoBook').offsetTop;
            }
            var tsX = photoPP[can_i][photoPP[can_i].length - 1][5] + (sx - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (sy - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x
            var tsY = photoPP[can_i][photoPP[can_i].length - 1][6] + (sx - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (sy - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y
	        TTsx = tsX;
	        TTsy = tsY;

            //根据拖拉位移重新设置图片宽度
            photoPP[can_i][photoPP[can_i].length - 1][3] = tempPPw + tsX - tempX;

            //根据新宽度和图片固有偏转角重新定位图片中心
            photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX + 1 / 2 * (TTsx - tempX) * Math.cos(photoPP[can_i][photoPP[can_i].length - 1][7]);
            photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY + 1 / 2 * (TTsx - tempX) * Math.sin(photoPP[can_i][photoPP[can_i].length - 1][7]);

            //根据中心，宽度，偏角定位图片的左上角坐标
            photoPP[can_i][photoPP[can_i].length - 1][1] = photoPP[can_i][photoPP[can_i].length - 1][5] - photoPP[can_i][photoPP[can_i].length - 1][3] / 2;
            photoPP[can_i][photoPP[can_i].length - 1][2] = photoPP[can_i][photoPP[can_i].length - 1][6] - photoPP[can_i][photoPP[can_i].length - 1][4] / 2;

            if (photoPP[can_i][photoPP[can_i].length - 1][3] > 20) {
                redraw(can_i, canFlag);
	        }
    	}

        window.onmouseup = function () {
            window.onmousemove = null;
            window.onmouseup = null;
            chooseFlag = 0;
		};
		return;
	};       

    //左边框伸缩
	if((tempX >=  (photoPP[can_i][photoPP[can_i].length - 1][1] - RECT_SIDE / 2)) && 
	    (tempX <=  (photoPP[can_i][photoPP[can_i].length - 1][1] + RECT_SIDE / 2)) && 
	    (tempY >= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] / 2 - RECT_SIDE / 2)) &&
	    (tempY <= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] / 2 + RECT_SIDE / 2)))
    {
        chooseFlag = 1;
		var tempPPw = photoPP[can_i][photoPP[can_i].length - 1][3];
		var tempPPdx = photoPP[can_i][photoPP[can_i].length - 1][1];
		window.onmousemove = function (ev) {
			var e = ev || event;
			getMouseLocation(e);
			var sx;
            var sy;
            if (operaFlag == 1) {
                sx = e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById("bookPage" + bookPageNum3).offsetLeft;
                sy = e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById("bookPage" + bookPageNum3).offsetTop;
            }
            else if (operaFlag == 0)
            {
                sx = e.pageX - document.getElementById('photoBook').offsetLeft;
                sy = e.pageY - document.getElementById('photoBook').offsetTop;
            }
	        var tsX = photoPP[can_i][photoPP[can_i].length - 1][5] + (sx - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (sy - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x
	        var tsY = photoPP[can_i][photoPP[can_i].length - 1][6] + (sx - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (sy - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y
	        TTsx = tsX;
	        TTsy = tsY;
	        photoPP[can_i][photoPP[can_i].length - 1][3] = tempPPw + tempX - tsX;
	        
	        photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX + 1 / 2 * (TTsx - tempX) * Math.cos(photoPP[can_i][photoPP[can_i].length - 1][7]);
			photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY + 1 / 2 * (TTsx - tempX) * Math.sin(photoPP[can_i][photoPP[can_i].length - 1][7]);
			
			photoPP[can_i][photoPP[can_i].length - 1][1] = photoPP[can_i][photoPP[can_i].length - 1][5] - photoPP[can_i][photoPP[can_i].length - 1][3] / 2;
			photoPP[can_i][photoPP[can_i].length - 1][2] = photoPP[can_i][photoPP[can_i].length - 1][6] - photoPP[can_i][photoPP[can_i].length - 1][4] / 2;
	        if (photoPP[can_i][photoPP[can_i].length - 1][3] > 20) {
                redraw(can_i, canFlag);
	        }
        }
        window.onmouseup = function () {
            window.onmousemove = null;
            window.onmouseup = null;
            chooseFlag = 0;
	    };
	    return;
	};

    //上边框伸缩
    if ((tempX >= (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] / 2 - 4)) &&
        (tempX <= (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] / 2 + 4)) &&
        (tempY >= (photoPP[can_i][photoPP[can_i].length - 1][2] - 4)) &&
        (tempY <= (photoPP[can_i][photoPP[can_i].length - 1][2] + 4)))
    {
        chooseFlag = 1;
        var tempPPh = photoPP[can_i][photoPP[can_i].length - 1][4];
        var tempPPdy = photoPP[can_i][photoPP[can_i].length - 1][2];
        window.onmousemove = function (ev) {
            var e = ev || event;
            var sx;
            var sy;
            if (operaFlag == 1) {
                sx = e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById("bookPage" + bookPageNum3).offsetLeft;
                sy = e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById("bookPage" + bookPageNum3).offsetTop;
            }
            else if (operaFlag == 0)
            {
                sx = e.pageX - document.getElementById('photoBook').offsetLeft;
                sy = e.pageY - document.getElementById('photoBook').offsetTop;
            }
            var tsX = photoPP[can_i][photoPP[can_i].length - 1][5] + (sx - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (sy - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x
            var tsY = photoPP[can_i][photoPP[can_i].length - 1][6] + (sx - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (sy - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y
            TTsx = tsX;
            TTsy = tsY;
            photoPP[can_i][photoPP[can_i].length - 1][4] = tempPPh + tempY - tsY;
            photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX - 1 / 2 * (TTsy - tempY) * Math.sin(photoPP[can_i][photoPP[can_i].length - 1][7]);
            photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY + 1 / 2 * (TTsy - tempY) * Math.cos(photoPP[can_i][photoPP[can_i].length - 1][7]);
            photoPP[can_i][photoPP[can_i].length - 1][1] = photoPP[can_i][photoPP[can_i].length - 1][5] - photoPP[can_i][photoPP[can_i].length - 1][3] / 2;
            photoPP[can_i][photoPP[can_i].length - 1][2] = photoPP[can_i][photoPP[can_i].length - 1][6] - photoPP[can_i][photoPP[can_i].length - 1][4] / 2;
            if (photoPP[can_i][photoPP[can_i].length - 1][4] > 20) {
                redraw(can_i, canFlag);
            }
        };
        window.onmouseup = function () {
            window.onmousemove = null;
            window.onmouseup = null;
            chooseFlag = 0;
        };
        return;
    }

    //下边框伸缩
    if ((tempX >= (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] / 2 - 4)) &&
        (tempX <= (photoPP[can_i][photoPP[can_i].length - 1][1] + photoPP[can_i][photoPP[can_i].length - 1][3] / 2 + 4)) &&
        (tempY >= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] - 4)) &&
        (tempY <= (photoPP[can_i][photoPP[can_i].length - 1][2] + photoPP[can_i][photoPP[can_i].length - 1][4] + 4)))
    {
        chooseFlag = 1;
        var tempPPh = photoPP[can_i][photoPP[can_i].length - 1][4];
        window.onmousemove = function (ev) {
            var e = ev || event;
            var sx;
            var sy;
            if (operaFlag == 1) {
                sx = e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById("bookPage" + bookPageNum3).offsetLeft;
                sy = e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById("bookPage" + bookPageNum3).offsetTop;
            }
            else if (operaFlag == 0)
            {
                sx = e.pageX - document.getElementById('photoBook').offsetLeft;
                sy = e.pageY - document.getElementById('photoBook').offsetTop;
            }
            var tsX = photoPP[can_i][photoPP[can_i].length - 1][5] + (sx - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (sy - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x
            var tsY = photoPP[can_i][photoPP[can_i].length - 1][6] + (sx - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (sy - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y
            TTsx = tsX;
            TTsy = tsY;
            photoPP[can_i][photoPP[can_i].length - 1][4] = tempPPh + tsY - tempY;
            photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX + 1 / 2 * (tempY - TTsy) * Math.sin(photoPP[can_i][photoPP[can_i].length - 1][7]);
            photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY - 1 / 2 * (tempY - TTsy) * Math.cos(photoPP[can_i][photoPP[can_i].length - 1][7]);
            photoPP[can_i][photoPP[can_i].length - 1][1] = photoPP[can_i][photoPP[can_i].length - 1][5] - photoPP[can_i][photoPP[can_i].length - 1][3] / 2;
            photoPP[can_i][photoPP[can_i].length - 1][2] = photoPP[can_i][photoPP[can_i].length - 1][6] - photoPP[can_i][photoPP[can_i].length - 1][4] / 2;
            if (photoPP[can_i][photoPP[can_i].length - 1][4] > 20) {
                redraw(can_i, canFlag);
            }
            return;
    	};
        window.onmouseup = function () {
            window.onmousemove = null;
            window.onmouseup = null;
            chooseFlag = 0;
        };
    }


    //左上角
    if (Math.pow(tempX - photoPP[can_i][photoPP[can_i].length - 1][1], 2) + Math.pow(tempY - photoPP[can_i][photoPP[can_i].length - 1][2], 2) < Math.pow(CIRCLE_RADIUS, 2)) {
        chooseFlag = 1;
        window.onmousemove = function (ev) {
            
    		var e = ev || event;
    		getMouseLocation(e);
    		var nowX;
    		var nowY;
 			if (operaFlag == 1) {
                nowX = e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById("bookPage" + bookPageNum3).offsetLeft;
                nowY = e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById("bookPage" + bookPageNum3).offsetTop;
            }
            else if (operaFlag == 0)
            {
                nowX = e.pageX - document.getElementById('photoBook').offsetLeft;
                nowY = e.pageY - document.getElementById('photoBook').offsetTop;
            }

    		var tX = photoPP[can_i][photoPP[can_i].length - 1][5] + (nowX - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (nowY - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x 
    		var tY = photoPP[can_i][photoPP[can_i].length - 1][6] + (nowX - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (nowY - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y
    		
    		photoPP[can_i][photoPP[can_i].length - 1][3] = tWidth + (tempX - tX);		
    		photoPP[can_i][photoPP[can_i].length - 1][4] = tHeight + (tempY - tY);
    		photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX - (tempX - tX) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (tempY - tY) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
			photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY + (tempX - tX) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (tempY - tY) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
			
			if((photoPP[can_i][photoPP[can_i].length - 1][3] < MIN_LENGTH) && (photoPP[can_i][photoPP[can_i].length - 1][4] < MIN_LENGTH)){
				photoPP[can_i][photoPP[can_i].length - 1][3] = MIN_LENGTH;
				photoPP[can_i][photoPP[can_i].length - 1][4] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX - (MIN_LENGTH -tWidth) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (MIN_LENGTH - tHeight) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY + (MIN_LENGTH -tWidth) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (MIN_LENGTH - tHeight) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}else if(photoPP[can_i][photoPP[can_i].length - 1][3] < MIN_LENGTH){
    			photoPP[can_i][photoPP[can_i].length - 1][3] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX - (MIN_LENGTH -tWidth) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (tempY - tY) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY + (MIN_LENGTH -tWidth) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (tempY - tY) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}else if(photoPP[can_i][photoPP[can_i].length - 1][4] < MIN_LENGTH){
    			photoPP[can_i][photoPP[can_i].length - 1][4] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX - (tempX - tX) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (MIN_LENGTH - tHeight) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY + (tempX - tX) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (MIN_LENGTH - tHeight) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}

    		photoPP[can_i][photoPP[can_i].length - 1][1] = photoPP[can_i][photoPP[can_i].length - 1][5] - photoPP[can_i][photoPP[can_i].length - 1][3] / 2;
			photoPP[can_i][photoPP[can_i].length - 1][2] = photoPP[can_i][photoPP[can_i].length - 1][6] - photoPP[can_i][photoPP[can_i].length - 1][4] / 2;
            redraw(can_i, canFlag);
    	}

        window.onmouseup = function () {
        	window.onmousemove = null;
            window.onmouseup = null;
            chooseFlag = 0;
        };
    	return;
    }

    //左下角
    if (Math.pow(tempX - photoPP[can_i][photoPP[can_i].length - 1][1], 2) + Math.pow(tempY - photoPP[can_i][photoPP[can_i].length - 1][2] - photoPP[can_i][photoPP[can_i].length - 1][4], 2) < Math.pow(CIRCLE_RADIUS, 2)) {
        chooseFlag = 1;
        window.onmousemove = function (ev) {
            
    		var e = ev || event;
    		getMouseLocation(e);
    		var nowX;
    		var nowY;
    		if (operaFlag == 1) {
                nowX = e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById("bookPage" + bookPageNum3).offsetLeft;
                nowY = e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById("bookPage" + bookPageNum3).offsetTop;
            }
            else if (operaFlag == 0)
            {
                nowX = e.pageX - document.getElementById('photoBook').offsetLeft;
                nowY = e.pageY - document.getElementById('photoBook').offsetTop;
            }
    		var tX = photoPP[can_i][photoPP[can_i].length - 1][5] + (nowX - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (nowY - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x 
    		var tY = photoPP[can_i][photoPP[can_i].length - 1][6] + (nowX - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (nowY - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y
    		
    		photoPP[can_i][photoPP[can_i].length - 1][3] = tWidth + (tempX - tX);
    		photoPP[can_i][photoPP[can_i].length - 1][4] = tHeight + (tY - tempY);
			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX - (tempX - tX) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (tY - tempY) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
			photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY + (tempX - tX) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (tY - tempY) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
			
			if((photoPP[can_i][photoPP[can_i].length - 1][3] < MIN_LENGTH) && (photoPP[can_i][photoPP[can_i].length - 1][4] < MIN_LENGTH)){
				photoPP[can_i][photoPP[can_i].length - 1][3] = MIN_LENGTH;
				photoPP[can_i][photoPP[can_i].length - 1][4] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX - (MIN_LENGTH -tWidth) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (MIN_LENGTH - tHeight) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY + (MIN_LENGTH -tWidth) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (MIN_LENGTH - tHeight) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}else if(photoPP[can_i][photoPP[can_i].length - 1][3] < MIN_LENGTH){
    			photoPP[can_i][photoPP[can_i].length - 1][3] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX - (MIN_LENGTH -tWidth) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (tY - tempY) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY + (MIN_LENGTH -tWidth) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (tY - tempY) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}else if(photoPP[can_i][photoPP[can_i].length - 1][4] < MIN_LENGTH){
    			photoPP[can_i][photoPP[can_i].length - 1][4] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX - (tempX - tX) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (MIN_LENGTH - tHeight) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY + (tempX - tX) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (MIN_LENGTH - tHeight) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}

			photoPP[can_i][photoPP[can_i].length - 1][1] = photoPP[can_i][photoPP[can_i].length - 1][5] - photoPP[can_i][photoPP[can_i].length - 1][3] / 2;
			photoPP[can_i][photoPP[can_i].length - 1][2] = photoPP[can_i][photoPP[can_i].length - 1][6] - photoPP[can_i][photoPP[can_i].length - 1][4] / 2;
            redraw(can_i, canFlag);
    	}
    	window.onmouseup = function () {
        	window.onmousemove = null;
            window.onmouseup = null;
            chooseFlag = 0;
        };
    	return;
    }

    //右上角
    if (Math.pow(tempX - photoPP[can_i][photoPP[can_i].length - 1][1] - photoPP[can_i][photoPP[can_i].length - 1][3], 2) + Math.pow(tempY - photoPP[can_i][photoPP[can_i].length - 1][2], 2) < Math.pow(CIRCLE_RADIUS, 2)) {
        chooseFlag = 1;
    	window.onmousemove = function(ev){
    		var e = ev || event;
    		getMouseLocation(e);
    		var nowX;
    		var nowY;
    		if (operaFlag == 1) {
                nowX = e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById("bookPage" + bookPageNum3).offsetLeft;
                nowY = e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById("bookPage" + bookPageNum3).offsetTop;
            }
            else if (operaFlag == 0)
            {
                nowX = e.pageX - document.getElementById('photoBook').offsetLeft;
                nowY = e.pageY - document.getElementById('photoBook').offsetTop;
            }
    		var tX = photoPP[can_i][photoPP[can_i].length - 1][5] + (nowX - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (nowY - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x 
    		var tY = photoPP[can_i][photoPP[can_i].length - 1][6] + (nowX - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (nowY - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y
    		
    		photoPP[can_i][photoPP[can_i].length - 1][3] = tWidth + (tX - tempX);
    		photoPP[can_i][photoPP[can_i].length - 1][4] = tHeight + (tempY - tY);
			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX + (tX - tempX) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (tempY - tY) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
			photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY - (tX - tempX) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (tempY - tY) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
			
			if((photoPP[can_i][photoPP[can_i].length - 1][3] < MIN_LENGTH) && (photoPP[can_i][photoPP[can_i].length - 1][4] < MIN_LENGTH)){
				photoPP[can_i][photoPP[can_i].length - 1][3] = MIN_LENGTH;
				photoPP[can_i][photoPP[can_i].length - 1][4] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX + (MIN_LENGTH -tWidth) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (MIN_LENGTH - tHeight) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY - (MIN_LENGTH -tWidth) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (MIN_LENGTH - tHeight) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}else if(photoPP[can_i][photoPP[can_i].length - 1][3] < MIN_LENGTH){
    			photoPP[can_i][photoPP[can_i].length - 1][3] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX + (MIN_LENGTH -tWidth) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (tempY - tY) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY - (MIN_LENGTH -tWidth) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (tempY - tY) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}else if(photoPP[can_i][photoPP[can_i].length - 1][4] < MIN_LENGTH){
    			photoPP[can_i][photoPP[can_i].length - 1][4] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX + (tX - tempX) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (MIN_LENGTH - tHeight) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY - (tX - tempX) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 - (MIN_LENGTH - tHeight) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}
			
			photoPP[can_i][photoPP[can_i].length - 1][1] = photoPP[can_i][photoPP[can_i].length - 1][5] - photoPP[can_i][photoPP[can_i].length - 1][3] / 2;
			photoPP[can_i][photoPP[can_i].length - 1][2] = photoPP[can_i][photoPP[can_i].length - 1][6] - photoPP[can_i][photoPP[can_i].length - 1][4] / 2;
            redraw(can_i, canFlag);
            
    	}
    	window.onmouseup = function () {
        	window.onmousemove = null;
            window.onmouseup = null;
            chooseFlag = 0;
        };
    	return;
    }

    //右下角
    if(Math.pow(tempX - photoPP[can_i][photoPP[can_i].length - 1][1] - photoPP[can_i][photoPP[can_i].length - 1][3],2) + 
        Math.pow(tempY - photoPP[can_i][photoPP[can_i].length - 1][2] - photoPP[can_i][photoPP[can_i].length - 1][4], 2) < Math.pow(CIRCLE_RADIUS, 2)) {
        chooseFlag = 1;
    	window.onmousemove = function(ev){
    		var e = ev || event;
    		var nowX;
    		var nowY;
    		if (operaFlag == 1) {
                nowX = e.pageX - document.getElementById('photoBook').offsetLeft - document.getElementById("bookPage" + bookPageNum3).offsetLeft;
                nowY = e.pageY - document.getElementById('photoBook').offsetTop - document.getElementById("bookPage" + bookPageNum3).offsetTop;
            }
            else if (operaFlag == 0)
            {
                nowX = e.pageX - document.getElementById('photoBook').offsetLeft;
                nowY = e.pageY - document.getElementById('photoBook').offsetTop;
            }
    		var tX = photoPP[can_i][photoPP[can_i].length - 1][5] + (nowX - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) - (nowY - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标x 
    		var tY = photoPP[can_i][photoPP[can_i].length - 1][6] + (nowX - photoPP[can_i][photoPP[can_i].length - 1][5]) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) + (nowY - photoPP[can_i][photoPP[can_i].length - 1][6]) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]); //鼠标按图片旋转角还原的临时坐标y
    		
    		photoPP[can_i][photoPP[can_i].length - 1][3] = tWidth + (tX - tempX);
    		photoPP[can_i][photoPP[can_i].length - 1][4] = tHeight + (tY - tempY);
			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX + (tX - tempX) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (tY - tempY) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
			photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY - (tX - tempX) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (tY - tempY) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
			
			if((photoPP[can_i][photoPP[can_i].length - 1][3] < MIN_LENGTH) && (photoPP[can_i][photoPP[can_i].length - 1][4] < MIN_LENGTH)){
				photoPP[can_i][photoPP[can_i].length - 1][3] = MIN_LENGTH;
				photoPP[can_i][photoPP[can_i].length - 1][4] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX + (MIN_LENGTH -tWidth) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (MIN_LENGTH - tHeight) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY - (MIN_LENGTH -tWidth) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (MIN_LENGTH - tHeight) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}else if(photoPP[can_i][photoPP[can_i].length - 1][3] < MIN_LENGTH){
    			photoPP[can_i][photoPP[can_i].length - 1][3] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX + (MIN_LENGTH -tWidth) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (tY - tempY) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY - (MIN_LENGTH -tWidth) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (tY - tempY) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}else if(photoPP[can_i][photoPP[can_i].length - 1][4] < MIN_LENGTH){
    			photoPP[can_i][photoPP[can_i].length - 1][4] = MIN_LENGTH;
    			photoPP[can_i][photoPP[can_i].length - 1][5] = oldCenterX + (tX - tempX) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (MIN_LENGTH - tHeight) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
				photoPP[can_i][photoPP[can_i].length - 1][6] = oldCenterY - (tX - tempX) * Math.sin(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2 + (MIN_LENGTH - tHeight) * Math.cos(-photoPP[can_i][photoPP[can_i].length - 1][7]) / 2;
    		}

			photoPP[can_i][photoPP[can_i].length - 1][1] = photoPP[can_i][photoPP[can_i].length - 1][5] - photoPP[can_i][photoPP[can_i].length - 1][3] / 2;
			photoPP[can_i][photoPP[can_i].length - 1][2] = photoPP[can_i][photoPP[can_i].length - 1][6] - photoPP[can_i][photoPP[can_i].length - 1][4] / 2;
            redraw(can_i, canFlag);
    	}
    	window.onmouseup = function () {
        	window.onmousemove = null;
            window.onmouseup = null;
            chooseFlag = 0;
        };
    	return;
    }

}
