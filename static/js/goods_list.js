$(function () {
    loadCategory();
});
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
    $('#desc').empty().append(name);
}
// 加载精品推荐
function loadRecommendation(categoryId) {
    
}