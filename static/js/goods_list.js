$(function () {
    // 加载左侧栏类别
    loadCategory();

    // 获取缓存条件用于刷新时重新定位到上次访问的页面
    let cacheId = window.localStorage.getItem('pageCache-Id');
    let cacheName = window.localStorage.getItem('pageCache-Name');
    if (cacheId !== '' && cacheName !== '') {
        go2ListById(cacheId,cacheName)
    }else {
        window.localStorage.setItem('currentPage','1');
    }


    let currentPage = window.localStorage.getItem('currentPage');
    $('#pre').click(function () {
        prePage()
    })
    $('#next').click(function () {
        nextPage()
    })
    // 绑定滚动条事件
    loadCatchScorll();
    // 绑定回到顶部时间
    bindGo2Top()
});
// 监听滚动条,以加载侧栏导航的位置
function loadCatchScorll() {
    $(document).scroll(function() {
        var scroH = $(document).scrollTop();  //滚动高度
        var viewH = $(window).height();  //可见高度
        var contentH = $(document).height();  //内容高度
        $(".nav-two").css('top', scroH + 15);
        if (scroH === 0){}
        if (contentH - (scroH + viewH) <= 100){}
        if (contentH - (scroH + viewH) <= 10){}

    });
}
// 绑定回到顶部事件
function bindGo2Top() {
    $('.go2top').click(function () {
        $("html,body").animate({scrollTop:"0px"},500);//500毫秒完成回到顶部动画
    })
}
// 加载分类
function loadCategory() {
    let categoryId = window.localStorage.getItem('categoryId');
    $.ajax({
        type: 'get',
        url: 'http://localhost:9527/product/category/get/categoryRec/' + categoryId,
        success: function f(res) {
            if (res.code === 2000) {
                let categories = res.data;
                renderingNav(categories);
            } else {
            }
        },
        error: function e() {
        }
    })
}
// 渲染侧栏导航
function renderingNav(categories) {
    $('#categories').empty();
    for (let category of categories) {
        $('#categories').append(`
        <div class="item" style="height: 40px">
            <a style="display: flex;justify-content: center" onclick="go2ListById(${category.id},'${category.name}')">${category.name}</a>
        </div>
        `);
    }
}
// 渲染商品区
function go2ListById(categoryId,name) {
    // 缓存页面条件,用于刷新时再次定位到当前页面
    window.localStorage.setItem('pageCache-Id', categoryId);
    window.localStorage.setItem('pageCache-Name', name);
    // 渲染标题
    $('#desc').empty().append(name);
    $('#categoryId').empty().append(categoryId);
    // 渲染类别商品
    loadRecommendation(categoryId);
}
//分页查询
function loadRecommendation(categoryId) {
    let currentPage = window.localStorage.getItem('currentPage');
    if (categoryId=='50') {
        $('#book_list').empty();
        $('#bottemDiv').css('display','none');
        $('#book_list').append(` <div class="m-padded-ud-tiny" style="width: 600px;font-size: 20px;font-weight: bolder;">欢迎咨询：15133169272（手机号也是微信号）</div>`)
    }else if(categoryId=='51'){
        $('#book_list').empty();
        $('#bottemDiv').css('display','none');
        $('#book_list').append(` <div><img src="../static/img/wx.png" style="height: 220px" class="ui rounded image"></div>`)
    }else {
        $('#bottemDiv').css('display','block');
        $.ajax({
            type:'post',
            url:'http://localhost:9527/product/main/pager',
            data: {
                pageNum:currentPage,
                pageSize:8,
                categoryId:categoryId,
                hasHot:1
            },
            xhrFields:{
                withCredentials:true
            },
            success:function (vo) {
                let list = vo.data.list;
                $('#book_list').empty();
                for (let i=0;i<list.length;i++){
                    $('#book_list').append(`
                        <div class="four wide column">
                                <a onclick="goGoodDetail(${list[i].id})" style="cursor: pointer">
                                    <img src="${list[i].mainImage}" style="width: 250px;height: 220px" class="ui rounded image">
                                </a>
                                <div class="m-padded-ud-tiny" style="display: flex">
                                    <a href="#" class="ui header">` + list[i].name + `</a>
                                 
                                </div>
                                <p class="m-text-thin" style="padding-top: 0.3em">描述:` + list[i].detail + `</p>
                                <p style="font-size: 14px;color: red;text-decoration:line-through">原价：` + list[i].costPrice + `￥</p>
                                <p style="font-size: 14px;color: red;">折扣价：` + list[i].discountPrice + `￥</p>
                            </div>
                        `);
                }
            }
        })
    }
}
//上一页
function prePage() {
    let currentPage = window.localStorage.getItem('currentPage');
    let categoryId = window.localStorage.getItem('pageCache-Id');
    let temp=Number(currentPage)-1;
    $.ajax({
        type:'post',
        url:'http://localhost:9527/product/main/pager',
        data: {
            pageNum:temp,
            pageSize:8,
            categoryId:categoryId,
            hasHot:1
        },
        xhrFields:{
            withCredentials:true

        },
        success:function (vo) {
            let list = vo.data.list;
            let data = vo.data;
            if (Number(data.pageNum) < 1){
                alert("已经是第一页！");
                return;
            } else {
                $('#book_list').empty();
                for (let i=0;i<list.length;i++){
                    $('#book_list').append(`
                        <div class="four wide column">
                                <a style="cursor: pointer">
                                    <img src="${list[i].mainImage}" style="width: 250px;height: 220px" class="ui rounded image">
                                </a>
                                <div class="m-padded-ud-tiny">
                                    <a href="#" class="ui header">` + list[i].name + `</a>
                                    <img src="../static/img/collect.svg" style="margin-left: 100px;height: 25px;">
                                </div>
                                <p class="m-text-thin" style="padding-top: 0.3em">描述:` + list[i].detail + `</p>
                                <p style="font-size: 14px;color: red;text-decoration:line-through">原价：` + list[i].costPrice + `￥</p>
                                <p style="font-size: 14px;color: red;">折扣价：` + list[i].discountPrice + `￥</p>
                            </div>
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
    let categoryId = window.localStorage.getItem('pageCache-Id');
    let temp=Number(currentPage)+1;
    $.ajax({
        type:'post',
        url:'http://localhost:9527/product/main/pager',
        data: {
            pageNum:temp,
            pageSize:8,
            categoryId:categoryId,
            hasHot:1
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
                $('#book_list').empty();
                for (let i=0;i<list.length;i++){
                    $('#book_list').append(`
                        <div class="four wide column">
                                <a style="cursor: pointer">
                                    <img src="${list[i].mainImage}" style="width: 250px;height: 220px" class="ui rounded image">
                                </a>
                                <div class="m-padded-ud-tiny">
                                    <a href="#" class="ui header">` + list[i].name + `</a>
                                    <img src="../static/img/collect.svg" style="margin-left: 100px;height: 25px;">
                                </div>
                                <p class="m-text-thin" style="padding-top: 0.3em">描述:` + list[i].detail + `</p>
                                <p style="font-size: 14px;color: red;text-decoration:line-through">原价：` + list[i].costPrice + `￥</p>
                                <p style="font-size: 14px;color: red;">折扣价：` + list[i].discountPrice + `￥</p>
                            </div>
                        `);
                }
                window.localStorage.setItem("currentPage",temp);
            }
        }
    })

}
// 获取商品详情
function goGoodDetail(id){
    window.localStorage.setItem("detailId",id);
    window.location.href='goods_detail.html';
}

