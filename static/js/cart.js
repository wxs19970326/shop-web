var checkArr ='';//所有input
let list =[];//存放当前页的数据
$(function () {
    // 分页展示
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/cart/showCart',
        data:{
            pageNum:1,
            pageSize:5
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (vo) {
            let data = vo.data;
            list = vo.data.list;
            for (let i = 0; i < list.length; i++) {
                let sum = list[i].discountPrice *list[i].num;
                $('.contentDiv').append(`
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>${list[i].name}</td>
                    <td>${list[i].color}</td>
                    <td>${list[i].size}</td>
                    <td>${list[i].discountPrice}</td>
                    <td>${list[i].num}</td>
                    <td>${sum}</td>
                    <td>
                        <a href="javascript:;" onclick="deleteById('${list[i].id}')">刪除</a>
                    </td>
                </tr>
                 `);
            }
        }
    })
    window.localStorage.setItem('currentPage','1');
    /** 分页相关 start */
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
    })
    /** 分页相关 end */
    //全选
    $("#choseAll").click(function () {
        choseAll()
    });
});

//删除购物车
function deleteById(cartId) {
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/cart/deleteById',
        data:{
            cartId:cartId
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (data) {
            if (data.code=2000){
                alert("删除成功！");
                page(1); //刷新
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
        url:'http://localhost:9527/product/cart/showCart',
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
                    let sum = list[i].discountPrice *list[i].num;
                    $('.contentDiv').append(`
                        <tr>
                            <td><input type="checkbox"/></td>
                            <td>${list[i].name}</td>
                            <td>${list[i].color}</td>
                            <td>${list[i].size}</td>
                            <td>${list[i].discountPrice}</td>
                            <td>${list[i].num}</td>
                            <td>${sum}</td>
                             <td>
                                <a href="javascript:;" onclick="deleteById('${list[i].id}')">刪除</a>
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
        url:'http://localhost:9527/product/cart/showCart',
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
                    let sum = list[i].discountPrice *list[i].num;
                    $('.contentDiv').append(`
                        <tr>
                            <td><input type="checkbox"/></td>
                            <td>${list[i].name}</td>
                            <td>${list[i].color}</td>
                            <td>${list[i].size}</td>
                            <td>${list[i].discountPrice}</td>
                            <td>${list[i].num}</td>
                            <td>${sum}</td>
                             <td>
                                <a href="javascript:;" onclick="deleteById('${list[i].id}')">刪除</a>
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
        url: 'http://localhost:9527/product/cart/showCart',
        data:{
            pageNum:n
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (vo) {
            let data = vo.data;
            list = vo.data.list;
            $('.contentDiv').empty();
            for (let i = 0; i < list.length; i++) {
                let sum = list[i].discountPrice *list[i].num;
                $('.contentDiv').append(`
                <tr>
                    <td><input type="checkbox" id="${list[i].id}"/></td>
                    <td>${list[i].name}</td>
                    <td>${list[i].color}</td>
                    <td>${list[i].size}</td>
                    <td>${list[i].discountPrice}</td>
                    <td>${list[i].num}</td>
                    <td>${sum}</td>
                     <td>
                        <a href="javascript:;" onclick="deleteById('${list[i].id}')">刪除</a>
                     </td>
                </tr>
                 `);
            }
        }
    });
    window.localStorage.setItem("currentPage",n);
}
// 结算动作
function consume() {
    $('.ui.modal')
        .modal('show')
    ;
    // 得在页面加载完之后 才能获取是否选中
    var sumMoney =0.0;
    var name='';
    checkArr =$(".contentDiv input");
    for (let i=0;i<checkArr.length;i++){
        var detail =list[i];
        if (checkArr[i].checked==true){// 选中
            sumMoney+=(detail.discountPrice*detail.num);
            name+=detail.num+"个"+detail.name+"+";
        }
    }
    name=name.substring(0,name.length-1);
    $("#amount").val(sumMoney);
    $("#orderName").val(name)

}
// 关闭模态框
function cancle(){
    $('.ui.modal')
        .modal('hide')
    ;
}

/**
 * 确定按钮--生成订单
 * 多个商品 num是累加
 * 多个商品id 存多条数据
 *
 */

function createOrder() {
    // 构建订单参数
    var num=''; //订单商品数量
    var goodsIds=''; //订单商品

    checkArr =$(".contentDiv input");
    for (let i=0;i<checkArr.length;i++){
        var detail =list[i];
        if (checkArr[i].checked==true){// 选中
            num+=detail.num+",";
            goodsIds+=detail.goodId+',';
        }
    }
    num=num.substring(0,num.length-1);
    goodsIds=goodsIds.substring(0,goodsIds.length-1);
    $.ajax({
        type:'get',
        url:'http://localhost:9527/product/order/createOrders',
        data: {
            goodsIds:goodsIds,
            num:num,
            orderName:$("#orderName").val(),
            amount:$("#amount").val(),
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
                // TODO 拿到支付成功的回传 暂时用pay()模拟
                pay(orderNo);
                var addressee='haohaichun@9fbank.com.cn';
                var title=$("#name").val()+"的订单";
                var content=$("#orderName").val()+"   "+$("#amount").val()+"元，请对账！\n"
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
//全选
function choseAll() {
    if ($("#choseAll").is(':checked')==true){ //全选选中，当前页的都选中
        checkArr =$(".contentDiv input");
        for (var i=0;i<list.length;i++){
            checkArr[i].checked=true;
        }
    } else {
        checkArr =$(".contentDiv input");
        for (var i=0;i<list.length;i++){
            checkArr[i].checked=false;
        }
    }
}
// 真正结算
function realconsume() {
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
            list = vo.data.list;
            $('.contentDiv').empty();
            for (let i = 0; i < list.length; i++) {
                let sum = list[i].discountPrice *list[i].num;
                $('.contentDiv').append(`
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>${list[i].name}</td>
                    <td>${list[i].color}</td>
                    <td>${list[i].size}</td>
                    <td>${list[i].discountPrice}</td>
                    <td>${list[i].num}</td>
                    <td>${sum}</td>
                     <td>
                        <a href="javascript:;" onclick="deleteById('${list[i].id}')">刪除</a>
                     </td>
                </tr>
                 `);
            }
        }
    });
}