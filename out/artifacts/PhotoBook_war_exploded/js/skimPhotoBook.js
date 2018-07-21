/*用于用户浏览照片书*/
var totalPage;        //第几本书有多少页
var pageNum = 0;

$(function () {                            //载入界面时要做的事
    //一开始将这本书未打开时定位到中间
    var newArra = document.getElementById("pBook");
    var t = (0.5 - 825 / document.body.clientWidth) * 100;
    newArra.style.left = t + "%";
    //点击右边的下一页按钮执行的操作
    $('.afterBtn').bind('click', function () {
        if (pageNum == 0)             //是封面的话
        {
            document.getElementById('pBook').style.left = "0";
            document.getElementById('pBook').style.right = "0";
        }
        if (pageNum <= totalPage - 1) {
            if (pageNum == 0) {
                setTimeout(function () {
                    $('.beforeBtn').css('display', 'block');
                }, 2000);
            }
            runNext(pageNum);                         //(pageNum是指右边的页码，翻右边的时候可直接用)
            pageNum++;                                //翻页之后右边的页码增加1，你懂得 
        }
    });

    function runNext(index) {
        $('.runPage').eq(index).addClass('runClass');
        if (index == 0)
        {
            setTimeout(function () {
                $('.runPage').eq(index).css('z-index', 2 + 2 * index);                  //为翻到左边的页设置z-index，这里之所以不提前设置，是因为若果提前设置的话，会因为翻页还没过一半，正在翻动的页由于z-index小于后面的页而看不到            
                $('.runPage').eq(index).children().eq(0).css('z-index', 1 + 2 * index);
                $('.runPage').eq(index).children().eq(1).css('z-index', 2 + 2 * index);
            }, 1000);
        }
        else {
            setTimeout(function () {
                $('.runPage').eq(index - 1).css('z-index', 2 + 2 * (index - 1));                  //为翻到左边的页设置z-index，这里之所以不提前设置，是因为若果提前设置的话，会因为翻页还没过一半，正在翻动的页由于z-index小于后面的页而看不到            
                $('.runPage').eq(index).children().eq(0).css('z-index', 1 + 2 * index);
                $('.runPage').eq(index).children().eq(1).css('z-index', 2 + 2 * index);
            }, 1000);
        }
    }

    //点击左边的上一页按钮执行的操作
    $('.beforeBtn').bind('click', function () {
        if (pageNum >= 1) {                      //右边的页码>=1说明左边至少有页码为0的页，可以翻
            if (pageNum == 1) {
                $('.beforeBtn').css('display', 'none');
                var j = (0.5 - 825 / document.body.clientWidth) * 100;
                document.getElementById('pBook').style.left = j + "%";
                $('#pBook').css('right', '');
            }
            pageNum--;                           //（pageNum是指右边的页码，右边的页码减1即为左边要翻的页码）           
            runLast(pageNum);
        }
    });

    function runLast(index) {
        $('.runPage').eq(index).removeClass('runClass');
        if (index == 0)
        {
            setTimeout(function () {                                      //不是左边最后一页可翻过去后再重置z-index，你懂得，不懂在纸上画画 
                $('.runPage').eq(index).children().eq(0).css('z-index', 2000001 - 2 * index);
                $('.runPage').eq(index).children().eq(1).css('z-index', 2000000 - 2 * index);
            }, 1000);
        }
        else {
            $('.runPage').eq(index - 1).css('z-index', 2000001 - 2 * (index - 1));
            setTimeout(function () {                                      //不是左边最后一页可翻过去后再重置z-index，你懂得，不懂在纸上画画 

                $('.runPage').eq(index).children().eq(0).css('z-index', 2000001 - 2 * index);
                $('.runPage').eq(index).children().eq(1).css('z-index', 2000000 - 2 * index);
            }, 1000);
        }

    }
});