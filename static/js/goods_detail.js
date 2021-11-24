var isLogin=false;
var notLoginMsg='';
var goods='';

$(function () {
    let id=window.localStorage.getItem("detailId");//此id就是goodId
    lookGoodDetail(id);
    initShowHaert(id);
    //判断用户是否登录
    $.ajax({
        type:'get',
        url:'http://localhost:9527/user/check/login',
        xhrFields:{
            withCredentials:true
        },
        success:function (data) {
            if (data.code!=2000) {
                notLoginMsg=data.message;
            }else{
                isLogin=true;
            }
        },
    })
});
// 获取商品详情
function lookGoodDetail(id){
    $.ajax({
        type:'post',
        url:'http://localhost:9527/product/main/getGoodsDetail',
        data: {
            id:id
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (vo) {
            let data = vo.data;
            goods=data;
            $('.content').append(`
            <div class="left" >
                <img src="${data.mainImage}" alt="" >
            </div>
            <div class="right">
                <div class="id">${data.id}</div>
                <div class="title">${data.name}</div>
                <div class="desc">${data.detail}</div>
                <div class="price">价格：${data.discountPrice}</div>
                <div class="color">${data.color}</div>
                <div class="size">${data.size}</div>
                <div class="num">
                    <input type="number" id="goodsNum" oninput="if(value <= 0 ){value = 0}">件
                    <!--收藏-->
                    <i class="heart icon" id="like" onclick="collect(${data.id})" style="font-size: 20px;color: gray"></i>
                </div>
                <div class="operate">
                    <button class="ui orange button" type="button" onclick="toBuyNow()">立即购买</button>
                    <button class="ui red button" type="button" onclick="shoppingCart(${data.id})">加入购物车</button>
                </div> 
            </div>
            `);
            }
    })
}
//立即购买 -- 弹出模态框--填写订单信息
function toBuyNow(){
    var goodsNum = $("#goodsNum").val();
    if (isLogin){
        if (goodsNum==null || goodsNum<=0){
            alert("请先输入购买数量！")
        } else {
        // 弹出模态框
            $('.ui.modal')
                .modal('show')
            ;
            $(".container").css('display','none');
            $("#orderName").val(goodsNum+"个"+goods.name);
            $("#amount").val(goods.discountPrice * goodsNum);
        }
    }else {
        alert(notLoginMsg);
    }
}

// 取消按钮--关闭模态框
function cancle(){
    $('.ui.modal')
        .modal('hide')
    ;
}

// 确定按钮  支付--生成订单--发送邮件
function createOrder() {
    let id=window.localStorage.getItem("detailId");
    var goodsNum = $("#goodsNum").val();
    $.ajax({
        type:'get',
        url:'http://localhost:9527/product/order/createOrder',
        data: {
            goodId:id,
            num:goodsNum,
            orderName:$("#orderName").val(),
            amount:goods.discountPrice * goodsNum,
            address:$("#address").val(),
            name:$("#name").val(),
            phone:$("#phone").val()
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (data) {
            if (data.code==2000) {
                var orderNo=data.data.orderNo;
                pay(orderNo);
                // TODO 拿到支付成功的回传
                var addressee='haohaichun@9fbank.com.cn';
                var title=$("#name").val()+"的订单";
                var content=$("#orderName").val()+"   "+goods.discountPrice * goodsNum+"元，请对账！\n"
                    +"收货人姓名： "+$("#name").val()
                    +"\n收货人地址： "+$("#address").val()
                    +"\n收货人电话： "+$("#phone").val();
                sendEmail(addressee,title,content);
                }

        },
        error:function () {
            alert("出错啦")
        }
    })
}

//支付
function pay(orderNo) {
    var goodsNum = $("#goodsNum").val();
    $.ajax({
        type:'get',
        url:'http://localhost:9527/product/main/settleInDetail',
        async:false,
        data: {
            amount:goods.discountPrice * goodsNum,
            num:goodsNum,
            goodId:goods.id,
            orderNo:orderNo
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (data) {
            if (data.code==2000) {
                $(".m-padded-ud-large").append(data.data);
            }
        },
        error:function () {
            alert("出错啦")
        }
    })
}

/**
 * 发送邮件
 * addressee 收件人邮箱
 * subject   标题
 * content   内容
 */

function sendEmail(addressee,subject,content) {
    $.ajax({
        type:'post',
        url:'http://localhost:9527/product/main/sendEmail',
        async:false,
        data: {
            addressee:addressee,
            subject:subject,
            content:content
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (data) {
            // alert(data.message)
        },
        error:function () {
            alert("出错啦")
        }
    })
}

//加购 保存到购物项中
function shoppingCart(id) {
    var goodsNum = $("#goodsNum").val();
    if (goodsNum=="" || goodsNum==undefined || goodsNum==null){
        alert("请先输入数量！")
    }else if (isLogin) {
        $.ajax({
            type:'post',
            url:'http://localhost:9527/product/cartitem/addCartItem',
            data: {
                goodId:id,
                num:$("#goodsNum").val()
            },
            xhrFields:{
                withCredentials:true
            },
            success:function (data) {
                if (data.code===2000){
                    alert("加购成功！")
                } else {
                    alert("加购失败！")
                }
            }
        })
    }else {
        alert(notLoginMsg);
    }
}
// 收藏/取消收藏
function collect(goodsId){
    if (isLogin) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:9527/product/store/collect',
            data:{
                goodsId: goodsId
            },
            xhrFields:{
                withCredentials:true
            },
            success:function (vo) {
                let data = vo.data;
                if(data==null){// 没有此商品 收藏
                    $("#like").css("color","red");
                    alert("收藏成功")
                }else {// 取消收藏
                    $("#like").css("color","gray");
                    alert("取消收藏")
                }
            }
        })
    }else {
        alert(notLoginMsg);
    }

}
//页面加载时 收藏展示
function initShowHaert(goodsId) {
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/store/initShowHeart',
        data:{
            goodsId: goodsId
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (vo) {
            let data = vo.data;
            if(data==null){// 没有此商品
                $("#like").css("color","gray");
            }else {// 收藏
                $("#like").css("color","red");
            }
        }
    })
}
