
$(function () {
    let id=window.localStorage.getItem("detailId");//此id就是goodId
    goGoodDetail(id);
    //TODO 判断是否有？ 再改变颜色
    initShowHaert(id);
});
// 获取商品详情
function goGoodDetail(id){
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
            $('.grid').empty();
            let data = vo.data;
            $('.grid').append(`
            <div class="left">
                <img src="${data.mainImage}" alt="">
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
                    <img src="../static/img/like.svg" id="like" onclick="collect(${data.id})" style="margin-left: 40px;">
                </div>
                <div class="operate">
                    <button class="ui orange button" type="button">立即购买</button>
                    <button class="ui red button" type="button" onclick="shoppingCart(${data.id})">加入购物车</button>
                </div> 
            </div>
    `);
        }
    })
}
//加购 保存到购物项中
function shoppingCart(id) {
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
}
// 收藏/取消收藏
function collect(goodsId){
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
                $("#like").css("background-color","red");
                alert("收藏成功")
            }else {// 取消收藏
                $("#like").css("background-color","gray");
                alert("取消收藏")
            }
        }
    })
}
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
                $("#like").css("background-color","gray");
            }else {// 收藏
                $("#like").css("background-color","red");
            }
        }
    })
}
