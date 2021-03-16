var checkArr ='';//所有input
let list =[];//存放当前页的数据
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
            pageSize:3
        },
        success:function (vo) {
            let data = vo.data;
            list = data.list;
            for (let i = 0; i < list.length; i++) {
                $('.contentDiv').append(`
                <tr>
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td style="display: none">${list[i].id}</td>
                    <td style="height: 100px;width: 100px;">
                        <img src="${list[i].mainImage}" alt="" width="100px" height="100px">
                    </td>
                    <td>${list[i].name}</td>
                    <td>${list[i].discountPrice}</td>
                    <td>
                        <button class="ui green button" type="button" onclick="deleteById('${list[i].id}')">删除</button>
                    </td>
                </tr>
                 `);
            }
        }
    })

    window.localStorage.setItem('currentPage','1');
    // 上一页
    $("#pre").click(function () {
        prePage();
        $("#choseAll").prop('checked',false);
    })
    // 下一页
    $("#next").click(function () {
        nextPage();
        $("#choseAll").prop('checked',false);
    })
    $("#one").click(function () {
        page(1);
        $("#choseAll").prop('checked',false);
    })
    $("#two").click(function () {
        page(2);
        $("#choseAll").prop('checked',false);
    })
    $("#three").click(function () {
        page(3);
        $("#choseAll").prop('checked',false);
    });
    $("#choseAll").click(function () {
        choseAll()
    });
});
//删除收藏项
function deleteById(goodsId) {
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/store/deleteById',
        data:{
            goodsId:goodsId
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
    });
    page(1); //刷新
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
            list = vo.data.list;
            let data = vo.data;
            if (Number(data.pageNum) < 1){
                alert("已经是第一页！")
            } else {
                $('.contentDiv').empty();
                for (let i=0;i<list.length;i++){
                    $('.contentDiv').append(`
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
            list = vo.data.list;
            let data = vo.data;
            if (Number(data.pageNum) > Number(data.pages)){
                alert("已经是最后一页！")
            } else {
                $('.contentDiv').empty();
                for (let i=0;i<list.length;i++){
                    $('.contentDiv').append(`
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
            list = data.list;
            $('.contentDiv').empty();
            for (let i = 0; i < list.length; i++) {
                $('.contentDiv').append(`
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
//批量删除
function delMore() {
    checkArr=$(".contentDiv input");
    var goodsIds='';
    for (let i=0;i<checkArr.length;i++){
        var detail =list[i];
        if (checkArr[i].checked==true){// 选中
            goodsIds+=detail.id+',';
        }
    }
    goodsIds=goodsIds.substring(0,goodsIds.length-1);
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/store/deleteByIds',
        data:{
            goodsIds:goodsIds
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
    });
    page(1); //刷新
}
//全选
function choseAll() {
    if ($("#choseAll").checked=true){ //全选选中，当前页的都选中
        checkArr =$(".contentDiv input");
        for (var i=0;i<list.length;i++){
            checkArr[i].checked=true;
        }
    }
}


