$('#nav').load('common_nav.html');
$('#footer').load('common_footer.html');

$(function () {
    // alert("为了方便您的使用，请先实名认证")
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
        url: 'http://localhost:9527/product/main/getHot',
        xhrFields: {
            withCredentials: true
        },
        success: function f(vo) {
            if (vo.code === 2000) {
                let list = vo.data;
                for (let i=0;i<list.length;i++){
                    $('#goodsHot').append(`
                    <div style="display:flex;margin: 5px 15px;"><a href="#" class="ui" >` + list[i].name + `</a></div>`);
                }
            } else {
                alert(vo.message)
            }
        }
    });
}

// 加载最新上架
function loadNewestProduct() {
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/main/getLatest',
        xhrFields: {
            withCredentials: true
        },
        success: function f(vo) {
            if (vo.code === 2000) {
                let list = vo.data;
                for (let i=0;i<list.length;i++){
                    $('#goodsLatest').append(`
                    <div style="display:flex;margin: 5px 15px;"><a href="#" class="ui" >` + list[i].name + `</a></div>`);
                }
            } else {
                alert(vo.message)
            }
        }
    });
}