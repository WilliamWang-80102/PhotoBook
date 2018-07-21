/*实现图片选取框滑动门*/

//当前页面移动完毕
var endCurrPage = false;
//后续页面移动完毕
var endNextPage = false;
//入场动画和出场动画
var outClass = '';
var inClass = '';

var animEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
};
var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

/*通过翻页改变画布所用到的全局变量*/
var canNum1 = -2;                     //记录左边画布的页数
var totalPagenum = 4;              //这个之后是用户选择的，必须一开始就确定要用多少页
var indexNum=1999993;                       //用于保存当前最后一页的z-index值

//当前书里面只有三张纸，pageNum分别为0,1,2,3，其中0是封面页码
$(function () {
    //实现滑动门的部分

    //保存两个view默认的class
    $(".pt-page").each(function () {
        var $page = $(this);
        $page.data('originalClassList', $page.attr('class'));
    });
    //设置默认页面
    $(".pt-page").eq(0).addClass('pt-page-current');

    //实现照片书翻页的部分
    var pageNum = 0;
    for (var i = 0; i < $('.runPage').length; i++)
    {
        $('.runPage').eq(i).css('z-index', 2000001 - 2 * i);
        $('.runPage').eq(i).children().eq(0).css('z-index', 2000001 - 2 * i);
        $('.runPage').eq(i).children().eq(1).css('z-index', 2000000 - 2 * i);
    }

    //点击右边的下一页按钮执行的操作
    $('.nextBtn').bind('click', function () {
        if (pageNum <= totalPagenum-1)
        {
            if (pageNum == 0) {
                setTimeout(function () {
                    $('.lastBtn').css('display', 'block');
                }, 2000);
            }
            runNext(pageNum);                         //(pageNum是指右边的页码，翻右边的时候可直接用)
            pageNum++;                                //翻页之后右边的页码增加1，你懂得 
        }
        else {
            //var zengYe = window.confirm("已经是最后一页了，是否要增加一页");
            photoPP[2 * pageNum - 1] = new Array();
            photoPP[2 * pageNum] = new Array();
            var n = 2 * pageNum;
            can = document.getElementById('myCanvas' + n);
            cvs = can.getContext("2d");
            cvs.translate(can.width, 0);
            cvs.scale(-1, 1);
            indexNum -= 2;
                var child = document.createElement("div");                      //一页中的属性
                child.className = "bookPage runPage";
                var nowPage = totalPagenum + 1;
                child.id = "bookPage" + nowPage;
                child.setAttribute("ondrop", "drop(event)");
                child.setAttribute("ondragover", "allowDrag(event)");
                child.style = "z-index:" + indexNum;

                var chi1 = document.createElement("div");             //一页中的正面的属性（包括其中画布的属性）                                
                var nowContent1 = totalPagenum * 2 + 1;
                chi1.id = "bookContent" + nowContent1;
                chi1.className = "bookContent";
                var chiCanvas1 = document.createElement("canvas");
                chiCanvas1.id = "myCanvas" + nowContent1;
                chiCanvas1.height = "677";
                chiCanvas1.width = "527";
                chi1.appendChild(chiCanvas1);
                chi1.style = "z-index:" + indexNum;

                var chi2 = document.createElement("div");                   //一页中的反面的属性（包括其中画布的属性）                
                var nowContent2 = totalPagenum * 2 + 2;
                chi2.id = "bookContent" + nowContent2;
                chi2.className = "bookContent";
                var chiCanvas2 = document.createElement("canvas");
                chiCanvas2.id = "myCanvas" + nowContent2;
                chiCanvas2.height = "677";
                chiCanvas2.width = "527";
                chi2.appendChild(chiCanvas2);
                var indeNum = indexNum - 1;
                chi2.style = "z-index:" + indeNum;

                child.appendChild(chi1);                                              //将正反两面加到页中
                child.appendChild(chi2);
                var parent = document.getElementById("photoBook");                    
                parent.appendChild(child);                                              //将一页加到书中

                totalPagenum += 1;                                                     //动态增加一页后将总页数增加1
                runNext(pageNum);                         //(pageNum是指右边的页码，翻右边的时候可直接用)
                pageNum++;                                //翻页之后右边的页码增加1，你懂得 
        }
    });

    function runNext(index)
    {
        $('.runPage').eq(index).addClass('runClass');
        if (index == 0)
        {
            setTimeout(function () {
                $('.runPage').eq(index).css('z-index', 2 + 2 * index);                  //为翻到左边的页设置z-index，这里之所以不提前设置，是因为若果提前设置的话，会因为翻页还没过一半，正在翻动的页由于z-index小于后面的页而看不到            
                $('.runPage').eq(index).children().eq(0).css('z-index', 1 + 2 * index);
                $('.runPage').eq(index).children().eq(1).css('z-index', 2 + 2 * index);
            }, 1000);
            canNum1 += 2;              //点下一页按钮则将右边画布的页数加2，左边画布的页数可通过右边的确定（+1），放这里可以实现翻页过程中操作图片
        }
        else {
            setTimeout(function () {
                $('.runPage').eq(index-1).css('z-index', 2 + 2 * (index-1));                  //为翻到左边的页设置z-index，这里之所以不提前设置，是因为若果提前设置的话，会因为翻页还没过一半，正在翻动的页由于z-index小于后面的页而看不到            
                $('.runPage').eq(index).children().eq(0).css('z-index', 1 + 2 * index);
                $('.runPage').eq(index).children().eq(1).css('z-index', 2 + 2 * index);
            }, 1000);
            canNum1 += 2;              //点下一页按钮则将右边画布的页数加2，左边画布的页数可通过右边的确定（+1），放这里可以实现翻页过程中操作图片
        }      
    }

    //点击左边的上一页按钮执行的操作
    $('.lastBtn').bind('click', function () {
        if (pageNum >= 1) {                      //右边的页码>=1说明左边至少有页码为0的页，可以翻
            if (pageNum == 1)
            {
                $('.lastBtn').css('display', 'none');
            }
            pageNum--;                           //（pageNum是指右边的页码，右边的页码减1即为左边要翻的页码）
            runLast(pageNum);
        }
    });

    function runLast(index)
    {     
            $('.runPage').eq(index).removeClass('runClass');
            if (index == 0)
            {
                setTimeout(function () {                                      //不是左边最后一页可翻过去后再重置z-index，你懂得，不懂在纸上画画 
                    $('.runPage').eq(index).children().eq(0).css('z-index', 2000001 - 2 * index);
                    $('.runPage').eq(index).children().eq(1).css('z-index', 2000000 - 2 * index);
                }, 1000);
                canNum1 -= 2;             //点上一页按钮则将右边画布页数减2
            }
            else {
                $('.runPage').eq(index - 1).css('z-index', 2000001 - 2 * (index - 1));
                setTimeout(function () {                                      //不是左边最后一页可翻过去后再重置z-index，你懂得，不懂在纸上画画 
                    
                    $('.runPage').eq(index).children().eq(0).css('z-index', 2000001 - 2 * index);
                    $('.runPage').eq(index).children().eq(1).css('z-index', 2000000 - 2 * index);
                }, 1000);
                canNum1 -= 2;             //点上一页按钮则将右边画布页数减2
            }
        
    }
});

//预览照片书需要的函数
var sPB = 0;
function showPhotoBook() {
    if (sPB <= 5) {
        runNext(sPB);
        sPB++;
    }
    else if (sPB > 5)
    {
        runLast(sPB);
        sPB--;
    } 
}






//滑动门需要的函数
function changeView(newView) {
    outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
    inClass = 'pt-page-rotateCarouselLeftIn';

    $currPage = $(".pt-page-current").eq(0);
    $nextPage = $(newView);
    //清除原来添加的动画，层级等样式(正常动画结束时会自动清除，这样做防止用户在动画结束前就点击切换其他的)
    $(".pt-page").each(function () {
        $(this).attr('class', $(this).data('originalClassList'));
    });
    $currPage.addClass("pt-page-current");
    $nextPage.addClass("pt-page-current");
    //如果就是当页则不切换
    if ($currPage.attr("id") == $nextPage.attr("id")) {
        return;
    }
    //新页面入场
    $currPage.addClass(outClass).on(animEndEventName, function () {
        $currPage.off(animEndEventName);
        endCurrPage = true;
        if (endNextPage) {
            onEndAnimation($currPage, $nextPage);
        }
    });

    //旧页面出场
    $nextPage.addClass(inClass).on(animEndEventName, function () {
        $nextPage.off(animEndEventName);
        endNextPage = true;
        if (endCurrPage) {
            onEndAnimation($currPage, $nextPage);
        }
    });
}
//所有动画都结束后
function onEndAnimation($outpage, $inpage) {
    endCurrPage = false;
    endNextPage = false;
    //resetPage( $outpage, $inpage );
    //isAnimating = false;
    $outpage.attr('class', $outpage.data('originalClassList'));
    $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
}
