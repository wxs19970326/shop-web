$(function () {
    // 分页展示
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/store/showHeart',
        xhrFields:{
            withCredentials:true
        },
        data:{
            pageNum:1,
            pageSize:5
        },
        success:function (vo) {
            let data = vo.data;
            for (let i = 0; i < data.length; i++) {
                let sum = data[i].discountPrice *data[i].num;
                $('.content').append(`
                <tr>
                    <td><input type="checkbox"/></td>
                    <td style="display: none">${data[i].id}</td>
                    <td style="width: 100px;height: 100px">
                        <img src="${data[i].imageURL}" alt="">
                    </td>
                    <td>${data[i].name}</td>
                    <td>${data[i].discountPrice}</td>
                    <td>
                        <a href="" onclick="deleteById('${data[i].id}')">刪除</a>
                    </td>
                </tr>
                 `);
            }
        }
    })
    window.localStorage.setItem('currentPage','1');
    // 上一页
    $("#pre").click(function () {
        prePage()
    })
    // 下一页
    $("#next").click(function () {
        nextPage()
    })
    $("#one").click(function () {
        page(1)
    })
    $("#two").click(function () {
        page(2)
    })
    $("#three").click(function () {
        page(3)
    })
});
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
            for (let i = 0; i < data.length; i++) {
                let sum = data[i].discountPrice *data[i].num;
                $('.content').append(`
                <tr>
                    <td><input type="checkbox"/></td>
                    <td style="display: none">${data[i].id}</td>
                    <td style="width: 100px;height: 100px">
                        <img src="${data[i].imageURL}" alt="">
                    </td>
                    <td>${data[i].name}</td>
                    <td>${data[i].discountPrice}</td>
                    <td>
                        <a href="" onclick="deleteById('${data[i].id}')">刪除</a>
                    </td>
                </tr>
                 `);
            }
        }
    })

}
function deleteById(id) {
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/store/deleteById',
        data:{
            id:id
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (data) {
            if (data.code=2000){
                alert("删除成功！")
            } else {
                alert("删除失败！")
            }
        }
    })
}

