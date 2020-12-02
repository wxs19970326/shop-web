$(function () {
    // 加载左侧栏类别
    loadCategory();

    // 获取缓存条件用于刷新时重新定位到上次访问的页面
    let cacheId = window.localStorage.getItem('pageCache-Id');
    let cacheName = window.localStorage.getItem('pageCache-Name');
    if (cacheId !== '' && cacheName !== '') {
        go2ListById(cacheId,cacheName)
    }

    loadRecommendation(cacheId);
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
                console.log(categories);
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
        <div class="ui dropdown left-nav item">
            ${category.name}
            <i class="dropdown icon"></i>
            <div class="${category.id} menu">
                <a class="item">111</a>
            </div>
        </div>
        `);
        let categoryTemp = category.sonCategories;
        if (categoryTemp != null) {
            $(`.${category.id}`).empty();
            for (let category1 of categoryTemp) {
                $(`.${category.id}`).append(`<a class="item" onclick="go2ListById(${category1.id},'${category1.name}')">${category1.name}</a>`);
            }
        }
    }
    $('.ui.dropdown').dropdown({
        on: 'hover'
    });
}
// 渲染商品区
function go2ListById(categoryId,name) {
    // 缓存页面条件,用于刷新时再次定位到当前页面
    window.localStorage.setItem('pageCache-Id', categoryId);
    window.localStorage.setItem('pageCache-Name', name);
    // 渲染标题
    $('#desc').empty().append(name);
    $('#categoryId').empty().append(categoryId);
    // 渲染商品
}
// 加载精品推荐
function loadRecommendation(categoryId) {
    //分页查询
    $.ajax({
        type:'get',
        url:'http://localhost:9527/product/main/pager',
        data: {
            pageNum:1,
            pageSize:8,
            categoryId:categoryId,
            hasHot:1
        },
        xhrFields:{
            withCredentials:true

        },
        success:function (vo) {
            let list = vo.data.list;
            for (let i=0;i<list.length;i++){
                $('#book_list').append(`
                        <div class="four wide column">
                                <a onclick="goBookDetail(` + list[i].categoryId + `)" style="cursor: pointer">
                                    <img src="` + list[i].mainImage + `" style="width: 250px;height: 220px" class="ui rounded image">
                                </a>
                                <div class="m-padded-ud-tiny"><a href="#" class="ui header">` + list[i].name + `</a></div>
                                <p class="m-text-thin" style="padding-top: 0.3em">描述:` + list[i].detail + `</p>
                                <p style="font-size: 14px;color: red;text-decoration:line-through">原价：` + list[i].costPrice + `￥</p>
                                <p style="font-size: 14px;color: red;">折扣价：` + list[i].discountPrice + `￥</p>
                            </div>
                        `);
            }

        }
    })
}