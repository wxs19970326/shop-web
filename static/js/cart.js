$(function () {
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/cart/showCart',
        xhrFields:{
            withCredentials:true
        },
        success:function (vo) {
            let data = vo.data;
            for (let cart of data){
                let sum = cart.discountPrice * cart.num;
                $('.content').append(`
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>${cart.name}</td>
                    <td>${cart.color}</td>
                    <td>${cart.size}</td>
                    <td>${cart.discountPrice}</td>
                    <td>${cart.num}</td>
                    <td>${sum}</td>
                </tr>
    `);
            }
        }
    })

});
