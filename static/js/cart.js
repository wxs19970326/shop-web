$(function () {
    // 分页展示
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/cart/showCart',
        data:{
            pageNum:1,
            pageSize:3
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (vo) {
            let data = vo.data;
            let list = vo.data.list;
            for (let i = 0; i < list.length; i++) {
                let sum = list[i].discountPrice *list[i].num;
                $('.content').append(`
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>${list[i].name}</td>
                    <td>${list[i].color}</td>
                    <td>${list[i].size}</td>
                    <td>${list[i].discountPrice}</td>
                    <td>${list[i].num}</td>
                    <td>${sum}</td>
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
//上一页
function prePage() {
    let currentPage = window.localStorage.getItem('currentPage');
    let temp=Number(currentPage)-1;
    $.ajax({
        type:'post',
        url:'http://localhost:9527/product/cart/showCart',
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
                    let sum = list[i].discountPrice *list[i].num;
                    $('.content').append(`
                        <tr>
                            <td><input type="checkbox"/></td>
                            <td>${list[i].name}</td>
                            <td>${list[i].color}</td>
                            <td>${list[i].size}</td>
                            <td>${list[i].discountPrice}</td>
                            <td>${list[i].num}</td>
                            <td>${sum}</td>
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
        url:'http://localhost:9527/product/cart/showCart',
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
                    let sum = list[i].discountPrice *list[i].num;
                    $('.content').append(`
                        <tr>
                            <td><input type="checkbox"/></td>
                            <td>${list[i].name}</td>
                            <td>${list[i].color}</td>
                            <td>${list[i].size}</td>
                            <td>${list[i].discountPrice}</td>
                            <td>${list[i].num}</td>
                            <td>${sum}</td>
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
        url: 'http://localhost:9527/product/cart/showCart',
        data:{
            pageNum:n
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (vo) {
            let data = vo.data;
            let list = vo.data.list;
            $('.content').empty();
            for (let i = 0; i < list.length; i++) {
                let sum = list[i].discountPrice *list[i].num;
                $('.content').append(`
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>${list[i].name}</td>
                    <td>${list[i].color}</td>
                    <td>${list[i].size}</td>
                    <td>${list[i].discountPrice}</td>
                    <td>${list[i].num}</td>
                    <td>${sum}</td>
                </tr>
                 `);
            }
        }
    });
    window.localStorage.setItem("currentPage",n);
}
