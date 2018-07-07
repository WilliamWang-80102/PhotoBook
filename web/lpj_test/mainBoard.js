﻿//定义一些全局变量，以后会用得到
var photoParent = new Array();    //这个数组用于保存整个画布中所有图片的src,dx,dy,dw,dh,图片的中心坐标,图片的旋转角度
var photoCount = 0;         //用于保存已经在画布上绘制的图片的数量
var position_x;             //鼠标在画布上的相对位置x
var position_y;             //鼠标在画布上的相对位置y
var Location_x;             //拖动图片到照片书上时鼠标相对于浏览器的坐标
var Location_y;             //同上
var TTsx;                   //拉伸时重定位中心点用到的全局变量
var TTsy;                   //同上
var can = document.getElementById('myCanvas');
var cvs = can.getContext("2d"); 

/* 实时获取鼠标在画布上的位置*/
can.onmousemove = function (ev) {
	var e = ev || event;
	Location_x = e.pageX - this.offsetLeft;
	Location_y = e.pageY - this.offsetTop;
	position_x = Location_x;
	position_y = Location_y;
};
function showPos() {
	console.log('X:', Location_x);
	console.log('Y:', Location_y);
}
function allowDrag(ev) {
	ev.preventDefault();
}
function drag(ev) {
	ev.dataTransfer.setData("Text", ev.target.id);
}
function sleep(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}
function drop(ev) {
	ev.preventDefault();
	var photoChildren = new Array();
	var data = ev.dataTransfer.getData("Text");
	var src1 = document.getElementById(data).src;
	var img = new Image();
	img.src = src1;
	var dw = img.width;
	var dh = img.height;
	cvs.drawImage(img, Location_x, Location_y, dw, dh);
	photoCount++;
	photoChildren[0] = src1;
	photoChildren[1] = Location_x;
	photoChildren[2] = Location_y;
	photoChildren[3] = dw;
	photoChildren[4] = dh;
	photoChildren[5] = Location_x + (dw / 2);
	photoChildren[6] = Location_y + (dh / 2);
	photoChildren[7] = 0;
	photoParent.push(photoChildren);
}
/*将一张图片浮出的函数*/
function floatPhoto(float_x,float_y) {
    var photoLAP = new Array();            //保存鼠标所在位置的图片信息
    var a = 0;                             //初始化重叠部分图片数组下标(用时需要减1，你懂得)

    for (var i = 0; i < photoCount; i++) {
        var tempX = photoParent[i][5] + (float_x - photoParent[i][5]) * Math.cos(-photoParent[i][7]) - (float_y - photoParent[i][6]) * Math.sin(-photoParent[i][7]); //鼠标按图片旋转角还原的临时坐标x
        var tempY = photoParent[i][6] + (float_x - photoParent[i][5]) * Math.sin(-photoParent[i][7]) + (float_y - photoParent[i][6]) * Math.cos(-photoParent[i][7]); //鼠标按图片旋转角还原的临时坐标y

        if (Math.abs(tempX - photoParent[i][5]) <= (photoParent[i][3] / 2) && Math.abs(tempY - photoParent[i][6]) <= (photoParent[i][4] / 2)) {
        	a = photoLAP.push(photoParent[i]);
        }
    }
    //重叠数组最后一个即符合上述条件,将此图片移到总图片数组的最后面
    for (var i = photoCount - 1; i >= 0; i--) {
        if (a == 0) break;    //点击空白处的操作
        if ((photoParent[i][0] == photoLAP[a - 1][0]) && (photoParent[i][1] == photoLAP[a - 1][1]) && (photoParent[i][2] == photoLAP[a - 1][2]) && (photoParent[i][3] == photoLAP[a - 1][3]) && (photoParent[i][4] == photoLAP[a - 1][4]) && (photoParent[i][5] == photoLAP[a - 1][5]) && (photoParent[i][6] == photoLAP[a - 1][6]) && (photoParent[i][7] == photoLAP[a - 1][7])) {
        	var temp = photoParent[i];
        	for (var b = i; b < photoCount - 1; b++) {
        		photoParent[b] = photoParent[b + 1];
        	}
        	photoParent[photoCount - 1] = temp;
            break;         //防止出现两个图片完全重叠的情况（完全重叠这个if条件语句会执行两次，不应该执行两次，用break跳出）
        }
    }

    //重绘图片
    redraw();

    //为焦点图片绘制边框
}
/* 鼠标在画布上点击时*/
//实现图片的平移（先用鼠标将层叠的图片区分开，想平移的绘制到最上面)
can.onmousedown = function (ev) {  
    var e = ev || event;
    var drag_x = e.pageX - this.offsetLeft;
    var drag_y = e.pageY - this.offsetTop;
    floatPhoto(drag_x, drag_y);
    dragPhoto(drag_x, drag_y);
    rotatePhoto(drag_x, drag_y);
    scalePhoto(drag_x, drag_y);
};
//拖拽函数
function dragPhoto(drag_x, drag_y) {
    var tempX = photoParent[photoCount - 1][5] + (drag_x - photoParent[photoCount - 1][5]) * Math.cos(-photoParent[photoCount - 1][7]) - (drag_y - photoParent[photoCount - 1][6]) * Math.sin(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标x
    var tempY = photoParent[photoCount - 1][6] + (drag_x - photoParent[photoCount - 1][5]) * Math.sin(-photoParent[photoCount - 1][7]) + (drag_y - photoParent[photoCount - 1][6]) * Math.cos(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标y
    if (((Math.abs(tempX - photoParent[photoCount - 1][5]) < photoParent[photoCount - 1][3] * 2 / 5) && (Math.abs(tempY - photoParent[photoCount - 1][6]) < 9 / 20 * photoParent[photoCount - 1][4])) || ((Math.abs(tempY - photoParent[photoCount - 1][6]) < photoParent[photoCount - 1][4] * 2 / 5) && (Math.abs(tempX - photoParent[photoCount - 1][5]) < 9 / 20 * photoParent[photoCount-1][3]))) {
            var tempPPx = photoParent[photoCount - 1][1];
            var tempPPy = photoParent[photoCount - 1][2];
            can.onmousemove = function (ev) {
                var e = ev || event;
                var cx = (e.pageX - this.offsetLeft) - drag_x;
                var cy = (e.pageY - this.offsetTop) - drag_y;
                photoParent[photoCount - 1][1] = tempPPx + cx;
                photoParent[photoCount - 1][2] = tempPPy + cy;
                photoParent[photoCount - 1][5] = photoParent[photoCount - 1][1] + (photoParent[photoCount - 1][3] / 2);
                photoParent[photoCount - 1][6] = photoParent[photoCount - 1][2] + (photoParent[photoCount - 1][4] / 2);
                //清空重画
                redraw();
            };
            can.onmouseup = function () {
            	can.onmousemove = null;
            	can.onmouseup = null;
            };
        }
        
    }

//旋转函数
function rotatePhoto(rotate_x, rotate_y) {      //这个参数里面的x,y实际上是图片被点击瞬间一个角的坐标
    var tempX = photoParent[photoCount - 1][5] + (rotate_x - photoParent[photoCount - 1][5]) * Math.cos(-photoParent[photoCount - 1][7]) - (rotate_y - photoParent[photoCount - 1][6]) * Math.sin(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标x
    var tempY = photoParent[photoCount - 1][6] + (rotate_x - photoParent[photoCount - 1][5]) * Math.sin(-photoParent[photoCount - 1][7]) + (rotate_y - photoParent[photoCount - 1][6]) * Math.cos(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标y
    if ((Math.abs(tempX - photoParent[photoCount - 1][5]) >= 2 / 5 * photoParent[photoCount - 1][3]) && (Math.abs(tempX - photoParent[photoCount - 1][5]) <= 1 / 2 * photoParent[photoCount - 1][3]) && (Math.abs(tempY - photoParent[photoCount - 1][6]) >= 2 / 5 * photoParent[photoCount - 1][4]) && (Math.abs(tempY - photoParent[photoCount - 1][6]) <= 1 / 2 * photoParent[photoCount - 1][4]))
    {
    	var tempPPa = photoParent[photoCount - 1][7];
    	can.onmousemove = function (ev) {
    		var e = ev || event;
            var rx = e.pageX - this.offsetLeft;      //鼠标在移动，当前鼠标的x坐标
            var ry = e.pageY - this.offsetTop;        //同上
            /*保存临时角cos值的变量*/
            var tempCosValue = (Math.pow((rx - photoParent[photoCount - 1][5]), 2) + Math.pow((ry - photoParent[photoCount - 1][6]), 2) + Math.pow((rotate_x - photoParent[photoCount - 1][5]), 2) + Math.pow((rotate_y - photoParent[photoCount - 1][6]), 2) - Math.pow((rx - rotate_x), 2) - Math.pow((ry - rotate_y), 2)) / (2 * Math.sqrt((Math.pow((rx - photoParent[photoCount - 1][5]), 2) + Math.pow((ry - photoParent[photoCount - 1][6]), 2)) * (Math.pow((rotate_x - photoParent[photoCount - 1][5]), 2) + Math.pow((rotate_y - photoParent[photoCount - 1][6]), 2))));
            var tempAngle = Math.acos(tempCosValue);
            //判断是顺时针还是逆时针
            if (((rx - photoParent[photoCount - 1][5]) * (rotate_y - photoParent[photoCount - 1][6]) - (ry - photoParent[photoCount - 1][6]) * (rotate_x - photoParent[photoCount - 1][5])) >= 0)
            {
                //逆时针
                photoParent[photoCount - 1][7] = -tempAngle + tempPPa;
            }
            else if (((rx - photoParent[photoCount - 1][5]) * (rotate_y - photoParent[photoCount - 1][6]) - (ry - photoParent[photoCount - 1][6]) * (rotate_x - photoParent[photoCount - 1][5])) < 0)
            {
                //顺时针
                photoParent[photoCount - 1][7] = tempAngle + tempPPa;
            }
            //清空重画
            redraw();
        };
        can.onmouseup = function () {
        	can.onmousemove = null;
        	can.onmouseup = null;
        };
    }
}

//canvas的重绘
function redraw(){
	cvs.clearRect(0, 0, can.width, can.height);
	for (var i = 0; i < photoCount; i++)
	{
		var rotaImg = new Image();
		rotaImg.src = photoParent[i][0];
		cvs.save();
		cvs.translate(photoParent[i][5], photoParent[i][6]);
		cvs.rotate(photoParent[i][7]);                  
		cvs.translate(-photoParent[i][5], -photoParent[i][6]);
		cvs.drawImage(rotaImg, photoParent[i][1], photoParent[i][2], photoParent[i][3], photoParent[i][4]);
		cvs.restore();
	}
	borederRender();
}

//为焦点图片绘制边框
function borederRender(){
	//虚线矩形
	cvs.save();
	cvs.beginPath();
	cvs.rect(photoParent[photoParent.length - 1][1],photoParent[photoParent.length - 1][2],
		photoParent[photoParent.length - 1][3],photoParent[photoParent.length - 1][4]);
	cvs.lineWidth = 1;
	cvs.setLineDash([5,15]);
	cvs.stroke();
	cvs.restore();

	cvs.save();
	cvs.translate(photoParent[photoParent.length - 1][1],photoParent[photoParent.length - 1][2])
	//四个小原点
	for(var i = 0; i < 2; i++){
		for (var j = 0; j < 2; j++) {
			cvs.beginPath();
			cvs.arc(photoParent[photoParent.length - 1][3] * i,photoParent[photoParent.length - 1][4] * j,5,0,2*Math.PI,true);
			cvs.stroke();
		}
	}
	cvs.restore();

	//四个小矩形
	cvs.save();
	cvs.translate(photoParent[photoParent.length - 1][1],photoParent[photoParent.length - 1][2]);
	//top
	cvs.beginPath();
	cvs.rect(photoParent[photoParent.length - 1][3] / 2 - 4,-4,8,8);
	cvs.stroke();

	//bottom
	cvs.beginPath();
	cvs.rect(photoParent[photoParent.length - 1][3] / 2 -4,photoParent[photoParent.length - 1][4] - 4,8,8);
	cvs.stroke();

	//left
	cvs.beginPath();
	cvs.rect(-4, photoParent[photoParent.length - 1][4] / 2 - 4,8,8);
	cvs.stroke();

	//right
	cvs.beginPath();
	cvs.rect(photoParent[photoParent.length - 1][3]-4,photoParent[photoParent.length - 1][4] / 2 - 4,8,8);
	cvs.stroke();
	cvs.restore();
}
//图片的放大缩小函数
function scalePhoto(scale_x, scale_y) {
    var tempX = photoParent[photoCount - 1][5] + (scale_x - photoParent[photoCount - 1][5]) * Math.cos(-photoParent[photoCount - 1][7]) - (scale_y - photoParent[photoCount - 1][6]) * Math.sin(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标x
    var tempY = photoParent[photoCount - 1][6] + (scale_x - photoParent[photoCount - 1][5]) * Math.sin(-photoParent[photoCount - 1][7]) + (scale_y - photoParent[photoCount - 1][6]) * Math.cos(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标y
    //右边框伸缩
    if ((tempX > photoParent[photoCount - 1][1] + 19 / 20 * photoParent[photoCount - 1][3]) && (tempX < photoParent[photoCount - 1][1] + photoParent[photoCount - 1][3]) && (Math.abs(tempY - photoParent[photoCount - 1][6]) < 2 / 5 * photoParent[photoCount - 1][4]))
    {
        var tempPPw = photoParent[photoCount - 1][3];
        can.onmousemove = function (ev) {
            var e = ev || event;
            sx = e.pageX - this.offsetLeft;
            sy = e.pageY - this.offsetTop;
           var tsX = photoParent[photoCount - 1][5] + (sx - photoParent[photoCount - 1][5]) * Math.cos(-photoParent[photoCount - 1][7]) - (sy - photoParent[photoCount - 1][6]) * Math.sin(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标x
           var tsY = photoParent[photoCount - 1][6] + (sx - photoParent[photoCount - 1][5]) * Math.sin(-photoParent[photoCount - 1][7]) + (sy - photoParent[photoCount - 1][6]) * Math.cos(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标y
           TTsx = tsX;
           TTsy = tsY;
        photoParent[photoCount - 1][3] = tempPPw + tsX - tempX;
        if (photoParent[photoCount - 1][3] > 20) {
            

            cvs.clearRect(0, 0, can.width, can.height);
            for (var i = 0; i < photoCount; i++) {

                var scalImg = new Image();
                scalImg.src = photoParent[i][0];
                cvs.save();
                cvs.translate(photoParent[i][5], photoParent[i][6]);
                cvs.rotate(photoParent[i][7]);
                cvs.translate(-photoParent[i][5], -photoParent[i][6]);
                cvs.drawImage(scalImg, photoParent[i][1], photoParent[i][2], photoParent[i][3], photoParent[i][4]);
                cvs.restore();
            }
        }
        };       
        can.onmouseup = function () {
            photoParent[photoCount - 1][5] += 1 / 2 * (TTsx - tempX) * Math.cos(photoParent[photoCount - 1][7]);
            photoParent[photoCount - 1][6] += 1 / 2 * (TTsx - tempX) * Math.sin(photoParent[photoCount - 1][7]);
            photoParent[photoCount - 1][1] = photoParent[photoCount - 1][5] - photoParent[photoCount - 1][3] / 2;
            photoParent[photoCount - 1][2] = photoParent[photoCount - 1][6] - photoParent[photoCount - 1][4] / 2;
            can.onmousemove = null;
            can.onmouseup = null;
        };
    }

    //左边框伸缩
    if ((tempX > photoParent[photoCount - 1][1]) && (tempX < photoParent[photoCount - 1][1] + 1 / 20 * photoParent[photoCount - 1][3]) && (Math.abs(tempY - photoParent[photoCount - 1][6]) < 2 / 5 * photoParent[photoCount - 1][4]))
    {
        var tempPPw = photoParent[photoCount - 1][3];
        var tempPPdx = photoParent[photoCount - 1][1];
        can.onmousemove = function (ev) {
            var e = ev || event;
            sx = e.pageX - this.offsetLeft;
            sy = e.pageY - this.offsetTop;
            var tsX = photoParent[photoCount - 1][5] + (sx - photoParent[photoCount - 1][5]) * Math.cos(-photoParent[photoCount - 1][7]) - (sy - photoParent[photoCount - 1][6]) * Math.sin(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标x
            var tsY = photoParent[photoCount - 1][6] + (sx - photoParent[photoCount - 1][5]) * Math.sin(-photoParent[photoCount - 1][7]) + (sy - photoParent[photoCount - 1][6]) * Math.cos(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标y
            TTsx = tsX;
            TTsy = tsY;
            photoParent[photoCount - 1][3] = tempPPw + tempX - tsX;
            photoParent[photoCount - 1][1] = tempPPdx + tsX - tempX;

            if (photoParent[photoCount - 1][3] > 20) {
                

                cvs.clearRect(0, 0, can.width, can.height);
                for (var i = 0; i < photoCount; i++) {

                    var scalImg = new Image();
                    scalImg.src = photoParent[i][0];
                    cvs.save();
                    cvs.translate(photoParent[i][5], photoParent[i][6]);
                    cvs.rotate(photoParent[i][7]);
                    cvs.translate(-photoParent[i][5], -photoParent[i][6]);
                    cvs.drawImage(scalImg, photoParent[i][1], photoParent[i][2], photoParent[i][3], photoParent[i][4]);
                    cvs.restore();
                }
            }

        };
        can.onmouseup = function () {
            photoParent[photoCount - 1][5] += -1 / 2 * (tempX - TTsx) * Math.cos(photoParent[photoCount - 1][7]);
            photoParent[photoCount - 1][6] += -1 / 2 * (tempX - TTsx) * Math.sin(photoParent[photoCount - 1][7]);
            photoParent[photoCount - 1][1] = photoParent[photoCount - 1][5] - photoParent[photoCount - 1][3] / 2;
            photoParent[photoCount - 1][2] = photoParent[photoCount - 1][6] - photoParent[photoCount - 1][4] / 2;
            can.onmousemove = null;
            can.onmouseup = null;
        };
    }

    //上边框伸缩
    if ((tempY > photoParent[photoCount - 1][2]) && (tempY < photoParent[photoCount - 1][2] + 1 / 20 * photoParent[photoCount - 1][4]) && (Math.abs(tempX - photoParent[photoCount - 1][5]) < 2 / 5 * photoParent[photoCount-1][3]))
    {
        var tempPPh = photoParent[photoCount - 1][4];
        var tempPPdy = photoParent[photoCount - 1][2];
        can.onmousemove = function (ev) {
            var e = ev || event;
            sx = e.pageX - this.offsetLeft;
            sy = e.pageY - this.offsetTop;
            var tsX = photoParent[photoCount - 1][5] + (sx - photoParent[photoCount - 1][5]) * Math.cos(-photoParent[photoCount - 1][7]) - (sy - photoParent[photoCount - 1][6]) * Math.sin(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标x
            var tsY = photoParent[photoCount - 1][6] + (sx - photoParent[photoCount - 1][5]) * Math.sin(-photoParent[photoCount - 1][7]) + (sy - photoParent[photoCount - 1][6]) * Math.cos(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标y
            TTsx = tsX;
            TTsy = tsY;
            photoParent[photoCount - 1][4] = tempPPh + tempY - tsY;
            photoParent[photoCount - 1][2] = tempPPdy + tsY - tempY;

            if (photoParent[photoCount - 1][4] > 20) {
                

                cvs.clearRect(0, 0, can.width, can.height);
                for (var i = 0; i < photoCount; i++) {

                    var scalImg = new Image();
                    scalImg.src = photoParent[i][0];
                    cvs.save();
                    cvs.translate(photoParent[i][5], photoParent[i][6]);
                    cvs.rotate(photoParent[i][7]);
                    cvs.translate(-photoParent[i][5], -photoParent[i][6]);
                    cvs.drawImage(scalImg, photoParent[i][1], photoParent[i][2], photoParent[i][3], photoParent[i][4]);
                    cvs.restore();
                }
            }
        };
        can.onmouseup = function () {
            photoParent[photoCount - 1][5] += 1 / 2 * (tempY - TTsy) * Math.sin(photoParent[photoCount - 1][7]);
            photoParent[photoCount - 1][6] += -1 / 2 * (tempY - TTsy) * Math.cos(photoParent[photoCount - 1][7]);
            photoParent[photoCount - 1][1] = photoParent[photoCount - 1][5] - photoParent[photoCount - 1][3] / 2;
            photoParent[photoCount - 1][2] = photoParent[photoCount - 1][6] - photoParent[photoCount - 1][4] / 2;
            can.onmousemove = null;
            can.onmouseup = null;
        };
    }

    //下边框伸缩
    if ((tempY > photoParent[photoCount - 1][2] + 19 / 20 * photoParent[photoCount - 1][4]) && (tempY < photoParent[photoCount - 1][2] + photoParent[photoCount - 1][4]) && (Math.abs(tempX - photoParent[photoCount - 1][5]) < 2 / 5 * photoParent[photoCount - 1][3]))
    {
        var tempPPh = photoParent[photoCount - 1][4];
        can.onmousemove = function (ev) {
            var e = ev || event;
            sx = e.pageX - this.offsetLeft;
            sy = e.pageY - this.offsetTop;
            var tsX = photoParent[photoCount - 1][5] + (sx - photoParent[photoCount - 1][5]) * Math.cos(-photoParent[photoCount - 1][7]) - (sy - photoParent[photoCount - 1][6]) * Math.sin(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标x
            var tsY = photoParent[photoCount - 1][6] + (sx - photoParent[photoCount - 1][5]) * Math.sin(-photoParent[photoCount - 1][7]) + (sy - photoParent[photoCount - 1][6]) * Math.cos(-photoParent[photoCount - 1][7]); //鼠标按图片旋转角还原的临时坐标y
            TTsx = tsX;
            TTsy = tsY;
            photoParent[photoCount - 1][4] = tempPPh + tsY - tempY;

            if (photoParent[photoCount - 1][4] > 20) {
                

                cvs.clearRect(0, 0, can.width, can.height);
                for (var i = 0; i < photoCount; i++) {

                    var scalImg = new Image();
                    scalImg.src = photoParent[i][0];
                    cvs.save();
                    cvs.translate(photoParent[i][5], photoParent[i][6]);
                    cvs.rotate(photoParent[i][7]);
                    cvs.translate(-photoParent[i][5], -photoParent[i][6]);
                    cvs.drawImage(scalImg, photoParent[i][1], photoParent[i][2], photoParent[i][3], photoParent[i][4]);
                    cvs.restore();
                }
            }
        };       
        can.onmouseup = function () {
            photoParent[photoCount - 1][5] += -1 / 2 * (TTsy - tempY) * Math.sin(photoParent[photoCount - 1][7]);
            photoParent[photoCount - 1][6] += 1 / 2 * (TTsy - tempY) * Math.cos(photoParent[photoCount - 1][7]);
            photoParent[photoCount - 1][1] = photoParent[photoCount - 1][5] - photoParent[photoCount - 1][3] / 2;
            photoParent[photoCount - 1][2] = photoParent[photoCount - 1][6] - photoParent[photoCount - 1][4] / 2;
            can.onmousemove = null;
            can.onmouseup = null;
        };
    }
}