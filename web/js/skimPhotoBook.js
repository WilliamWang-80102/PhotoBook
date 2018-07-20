/*用于用户浏览照片书*/
//var totalPage = 5;           //暂时将页数设为5，（注意页数包括封面）,之后由数组动态传值决定有多少页(我发现这个不用动态增加页数，可以解决那个翻页bug....................求助老师啊啊啊啊啊)
var numbe=2;                   //用于将是第几本书的信息传给翻页函数
var pageNum = new Array();         //第几本书的第几页
var totalPage = new Array();        //第几本书有多少页
totalPage[numbe] = 5;
$(function () {                            //载入界面时要做的事
    var newArra = document.getElementsByClassName("photoBook-1");
    for (var i = 0; i < newArra.length; i++)
    {
        var j = (0.5 - 825 / document.body.clientWidth)*100;
        newArra[i].style.left = j+"%";
    }
    pageNum[numbe] = 0;
    
    for (var i = 0; i < $('.rPage' + numbe).length; i++) {                           //将所有页排序
        $('.rPage' + numbe).eq(i).css('z-index', 2 * totalPage[numbe] + 1 - 2 * i);
        $('.rPage' + numbe).eq(i).children().eq(0).css('z-index', 2 * totalPage[numbe] + 1 - 2 * i);
        $('.rPage' + numbe).eq(i).children().eq(1).css('z-index', 2 * totalPage[numbe] - 2 * i);
    }
    //点击右边的下一页按钮执行的操作
    $('.aBtn' + numbe).bind('click', function () {
        if (pageNum[numbe] == 0)             //是封面的话
        {
            document.getElementById('pBook' + numbe).style.left = "0";
            document.getElementById('pBook' + numbe).style.right = "0";
        }
        if (pageNum[numbe] <= totalPage[numbe] - 1) {
            setTimeout(function () {
                $('.bBtn' + numbe).css('display', 'block');
            }, 2000);
            runNext(pageNum[numbe]);                         //(pageNum是指右边的页码，翻右边的时候可直接用)
            pageNum[numbe]++;                                //翻页之后右边的页码增加1，你懂得 
        }
    });

    function runNext(index) {
        $('.rPage' + numbe).eq(index).addClass('runClass');
        zIndexNext(index, $('.rPage' + numbe).eq(index));
    }

    function zIndexNext(index, element)
    {
        if (index >= totalPage[numbe] - Math.floor((totalPage[numbe] - 1) / 2))                                               //右边某一页后在翻页动作执行前设置它翻到左边后的z-index（因为如果不提前设置的话，会导致在翻页超过一半时，背面的z-index比此时左边的小而看不到）
        {
            element.css('z-index', 2 + 2 * index);
        }
        setTimeout(function () {
            element.css('z-index', 2 + 2 * index);                  //为翻到左边的页设置z-index，这里之所以不提前设置，是因为若果提前设置的话，会因为翻页还没过一半，正在翻动的页由于z-index小于后面的页而看不到            
            element.children().eq(0).css('z-index', 1 + 2 * index);
            element.children().eq(1).css('z-index', 2 + 2 * index);
        }, 1000);
    }

    //点击左边的上一页按钮执行的操作
    $('.bBtn' + numbe).bind('click', function () {
        if (pageNum[numbe] >= 1) {                      //右边的页码>=1说明左边至少有页码为0的页，可以翻
            if (pageNum[numbe] == 1) {
                $('.bBtn' + numbe).css('display', 'none');
                var j = (0.5 - 825 / document.body.clientWidth) * 100;
                document.getElementById('pBook' + numbe).style.left = j + "%";
                $('#pBook' + numbe).css('right', '');
            }
            pageNum[numbe]--;                           //（pageNum是指右边的页码，右边的页码减1即为左边要翻的页码）           
            runLast(pageNum[numbe]);
        }
    });

    function runLast(index) {


        $('.rPage' + numbe).eq(index).removeClass('runClass');
        zIndexLast(index, $('.rPage' + numbe).eq(index));

    }

    function zIndexLast(index, element)                    //左边按钮翻页后设置翻到右边的页的z-index
    {
        if (index < totalPage[numbe] - (Math.floor((totalPage[numbe] - 1) / 2) + 1))
        {
            element.css('z-index', 2 * totalPage[numbe] + 1 - 2 * index);
        }
        setTimeout(function () {                                      //不是左边最后一页可翻过去后再重置z-index，你懂得，不懂在纸上画画   
            element.css('z-index', 2 * totalPage[numbe] + 1 - 2 * index);
            element.children().eq(0).css('z-index', 2 * totalPage[numbe] + 1 - 2 * index);
            element.children().eq(1).css('z-index', 2 * totalPage[numbe] - 2 * index);
        }, 1000);
    }
});