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
            let list = data.list;
            for (let i = 0; i < list.length; i++) {
                $('.content').append(`
                <tr>
                    <td><input type="checkbox"/></td>
                    <td style="display: none">${list[i].id}</td>
                    <td style="height: 100px;width: 100px;">
                        <img src="${list[i].mainImage}" alt="" width="100px" height="100px">
                    </td>
                    <td>${list[i].name}</td>
                    <td>${list[i].discountPrice}</td>
                    <td>
                        <a href="" onclick="deleteById('${list[i].id}')">刪除</a>
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
//上一页
function prePage() {
    let currentPage = window.localStorage.getItem('currentPage');
    let temp=Number(currentPage)-1;
    $.ajax({
        type:'post',
        url:'http://localhost:9527/product/store/showHeart',
        data: {
            pageNum:temp,
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (vo) {
            let list = vo.data.list;
            let data = vo.data;
            if (Number(data.pageNum) < 1){
                alert("已经是第一页！")
            } else {
                $('.content').empty();
                for (let i=0;i<list.length;i++){
                    $('.content').append(`
                        <tr>
                            <td><input type="checkbox"/></td>
                            <td style="display: none">${list[i].id}</td>
                            <td style="height: 100px;width: 100px;">
                                <img src="${list[i].mainImage}" alt="" width="100px" height="100px">
                            </td>
                            <td>${list[i].name}</td>
                            <td>${list[i].discountPrice}</td>
                            <td>
                                <a href="" onclick="deleteById('${list[i].id}')">刪除</a>
                            </td>
                        </tr>
                        `);
                }
                window.localStorage.setItem("currentPage",temp);
            }
        }
    })
}
//下一页
function nextPage() {
    let currentPage = window.localStorage.getItem('currentPage');
    let temp=Number(currentPage)+1;
    $.ajax({
        type:'post',
        url:'http://localhost:9527/product/store/showHeart',
        data: {
            pageNum:temp,
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (vo) {
            let list = vo.data.list;
            let data = vo.data;
            if (Number(data.pageNum) > Number(data.pages)){
                alert("已经是最后一页！")
            } else {
                $('.content').empty();
                for (let i=0;i<list.length;i++){
                    $('.content').append(`
                        <tr>
                            <td><input type="checkbox"/></td>
                            <td style="display: none">${list[i].id}</td>
                            <td style="height: 100px;width: 100px;">
                                <img src="${list[i].mainImage}" alt="" width="100px" height="100px">
                            </td>
                            <td>${list[i].name}</td>
                            <td>${list[i].discountPrice}</td>
                            <td>
                                <a href="" onclick="deleteById('${list[i].id}')">刪除</a>
                            </td>
                        </tr>
                        `);
                }
                window.localStorage.setItem("currentPage",temp);
            }
        }
    })
}
//第n页
function page(n) {
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/store/showHeart',
        data:{
            pageNum:n
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (vo) {
            let data = vo.data;
            let list = data.list;
            $('.content').empty();
            for (let i = 0; i < list.length; i++) {
                $('.content').append(`
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td style="display: none">${list[i].id}</td>
                        <td style="height: 100px;width: 100px;">
                            <img src="${list[i].mainImage}" alt="" width="100px" height="100px">
                        </td>
                        <td>${list[i].name}</td>
                        <td>${list[i].discountPrice}</td>
                        <td>
                            <a href="" onclick="deleteById('${list[i].id}')">刪除</a>
                        </td>
                    </tr>
                 `);
            }
        }
    });
    window.localStorage.setItem("currentPage",n);
}

