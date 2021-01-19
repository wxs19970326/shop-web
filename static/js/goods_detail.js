
$(function () {
    let id=window.localStorage.getItem("detailId");
    goBookDetail(id);

});
// 获取商品详情
function goBookDetail(id){
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
                    <input type="number" id="goodsNum">件
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
//加购
function shoppingCart(id,num) {
    window.localStorage.setItem("detailId",id);
    let goodsNum = $("#goodsNum").val();
    window.localStorage.setItem("num",goodsNum);
    window.location.href='cart.html';
}
