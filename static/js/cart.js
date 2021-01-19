$(function () {
    let id = window.localStorage.getItem("detailId");
    let num = window.localStorage.getItem("num");
    getDetail(id,num)
});
//通过id获取商品详情
function getDetail(id,num){
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
            let sum = data.discountPrice * num;
            $('.content').append(`
                <tr>
                    <td>${data.name}</td>
                    <td>${data.discountPrice}</td>
                    <td>${num}</td>
                    <td>${sum}</td>
                </tr>
    `);
        }
    })
}
