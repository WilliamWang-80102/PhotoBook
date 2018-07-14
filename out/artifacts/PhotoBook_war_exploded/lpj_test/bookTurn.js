/*通过翻页改变画布所用到的全局变量*/
var canNum1=0;                     //记录左边画布的页数



//当前书里面只有三张纸，pageNum分别为0,1,2
$(function () {
    var pageNum = 0;
    for (var i = 0; i < $('.runPage').length; i++)
    {
        $('.runPage').eq(i).css('z-index', 7 - 2 * i);
        $('.runPage').eq(i).children().eq(0).css('z-index', 7 - 2 * i);
        $('.runPage').eq(i).children().eq(1).css('z-index', 6 - 2 * i);
    }

    //点击右边的下一页按钮执行的操作
    $('.nextBtn').bind('click', function () {
        if (pageNum <= 2)
        {
            runNext(pageNum);                         //(pageNum是指右边的页码，翻右边的时候可直接用)
            pageNum++;                                //翻页之后右边的页码增加1，你懂得 
        }
    });

    function runNext(index)
    {
        $('.runPage').eq(index).addClass('runClass');
        zIndexNext(index, $('.runPage').eq(index));
    }

    function zIndexNext(index, element)                            //右边翻页按钮点击后设置翻到左边的页的z-index
    {
        if (index==2)                                               //右边最后一页在翻页动作执行前设置它翻到左边后的z-index（因为如果不提前设置的话，会导致在翻页超过一半时，背面的z-index比此时左边的小而看不到）
        {
            element.css('z-index', 3 + 2 * index);           
        }
        setTimeout(function () {                   
            element.css('z-index', 3 + 2 * index);                  //为翻到左边的页设置z-index，这里之所以不提前设置，是因为若果提前设置的话，会因为翻页还没过一半，正在翻动的页由于z-index小于后面的页而看不到            
            element.children().eq(0).css('z-index', 2 + 2 * index);
            element.children().eq(1).css('z-index', 3 + 2 * index);
        }, 1000);
        canNum1 += 2;              //点下一页按钮则将右边画布的页数加2，左边画布的页数可通过右边的确定（+1），放这里可以实现翻页过程中操作图片
    }

    //点击左边的上一页按钮执行的操作
    $('.lastBtn').bind('click', function () {
        if (pageNum >= 1) {                      //右边的页码>=1说明左边至少有页码为0的页，可以翻
            pageNum--;                           //（pageNum是指右边的页码，右边的页码减1即为左边要翻的页码）
            runLast(pageNum);
        }
    });

    function runLast(index)
    {
        $('.runPage').eq(index).removeClass('runClass');
        zIndexLast(index, $('.runPage').eq(index));
    }

    function zIndexLast(index, element)                    //左边按钮翻页后设置翻到右边的页的z-index
    {
        if (index == 0)   //当翻左边最后一页时，要提前设置该页的z-index，防止翻页超过一半时因为该页的z-index小于右边的而看不到，提前设置也不会影响它自己，因为它是左边最后一页嘛（PS：可以在纸上画下，看看各页的z-index变化）
        {
            element.css('z-index', 7 - 2 * index);
        }
        setTimeout(function () {                                      //不是左边最后一页可翻过去后再重置z-index，你懂得，不懂在纸上画画         
            element.css('z-index', 7 - 2 * index);
            element.children().eq(0).css('z-index', 7 - 2 * index);
            element.children().eq(1).css('z-index', 6 - 2 * index);
        }, 1000);
        canNum1 -= 2;             //点上一页按钮则将右边画布页数减2
    }
});