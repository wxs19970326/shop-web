$('#nav').load('common_nav.html');
$('#footer').load('common_footer.html');

$(function () {
    $('#loading').css('display', 'block');
    loadClothes();
    loadCosmetics();
    loadHotProduct();
    loadNewestProduct();
    $('#loading').css('display', 'none');
});

// 加载服饰推荐
function loadClothes() {
    $.ajax({
        type: 'post',
        url: '',
        data: $('#dataForm').serialize(),
        xhrFields: {
            withCredentials: true
        },
        success: function f(res) {
            if (res.code === 2000) {

            } else {

            }
        }
    });
}

// 加载美妆推荐
function loadCosmetics() {
    $.ajax({
        type: 'post',
        url: '',
        data: $('#dataForm').serialize(),
        xhrFields: {
            withCredentials: true
        },
        success: function f(res) {
            if (res.code === 2000) {

            } else {

            }
        }
    });
}

// 加载热门商品
function loadHotProduct() {
    $.ajax({
        type: 'post',
        url: '',
        data: $('#dataForm').serialize(),
        xhrFields: {
            withCredentials: true
        },
        success: function f(res) {
            if (res.code === 2000) {

            } else {

            }
        }
    });
}

// 加载最新上架
function loadNewestProduct() {
    $.ajax({
        type: 'post',
        url: '',
        data: $('#dataForm').serialize(),
        xhrFields: {
            withCredentials: true
        },
        success: function f(res) {
            if (res.code === 2000) {

            } else {

            }
        }
    });
}