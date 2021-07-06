$(function () {
    //  1. 选择金额时充值金额显示为相应的数字
    $('.money>a').click(function(){
        $('.inputBox input').val($(this).text());
    });
    // 2.充值金额可以自己输入但是不能超过5000，如果超过5000弹窗提示
    $('.payBox>a').click(function(){
        if($('input').val() > 5000) {
            alert('充值金额超过了限制');
        }else if($('input').val() <= 0){
            alert('充值金额不能低于1元');
        }else {
            alert('充值成功');
        }
    });
    // 3. 只能输入数字
        //  <input type="number" >
    // 4.自增自减
    // a.自增
    // $('.up').click(function(){
    //     var num = $('input').val();
    //     num++;
    //     $('input').val(num);
    // });
    // // b.自减
    // $('.down').click(function(){
    //     var num = $('input').val();
    //     num--;
    //     $('input').val(num);
    // });
    // 5.鼠标移入移出效果
    $('.money>a').mouseenter(function(){
        $(this).addClass('sty').siblings('a').removeClass('sty');
    });
    $('.money').mouseleave(function(){
        $(this).children().removeClass('sty');
    });
});