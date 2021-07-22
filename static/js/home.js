$('#nav').load('common_nav.html');
$('#footer').load('common_footer.html');

$(function () {
    // alert("为了方便您的使用，请先实名认证")
    $('#loading').css('display', 'block');
    loadYangSen();
    loadAiPiao();
    loadHotProduct();
    loadNewestProduct();
    $('#loading').css('display', 'none');
});

// 加载养森推荐
function loadYangSen() {
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/main/getYSRecommend',
        xhrFields: {
            withCredentials: true
        },
        success: function(res) {
            if (res.code === 2000) {
                var list=res.data;
                for (let i=0;i<list.length;i++){
                    $("#yangsen-list").append(`
                         <div class="four wide column" style="height: 240px;width: 200px;">
                            <a style="cursor: pointer" onclick="toGoodDetail(${list[i].id})">
                                <img src="${list[i].mainImage}" style="width: 200px;height: 180px" class="ui rounded image">
                            </a>
                            <div class="m-padded-ud-tiny">
                                <a href="#" class="ui header">${list[i].name}</a>
                            </div>
                            <p class="m-text-thin" style="padding-top: 0.3em">描述:${ list[i].detail }</p>
                            <p style="font-size: 14px;color: red;">价格：${list[i].discountPrice}￥</p>
                        </div>
                `);
                }

            }
        }
    });
}
// 加载爱飘飘推荐
function loadAiPiao() {
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/product/main/getAPPRecommend',
        xhrFields: {
            withCredentials: true
        },
        success: function(res) {
            if (res.code === 2000) {
                var list=res.data;
                for (let i=0;i<list.length;i++){
                    $("#aipiaopiao-list").append(`
                         <div class="four wide column" style="height: 240px;width: 200px;">
                            <a style="cursor: pointer" onclick="toGoodDetail(${list[i].id})">
                                <img src="${list[i].mainImage}" style="width: 200px;height: 180px" class="ui rounded image">
                            </a>
                            <div class="m-padded-ud-tiny">
                                <a href="#" class="ui header">${list[i].name}</a>
                            </div>
                            <p class="m-text-thin" style="padding-top: 0.3em">描述:${ list[i].detail }</p>
                            <p style="font-size: 14px;color: red;">价格：${list[i].discountPrice}￥</p>
                        </div>
                `);
                }

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
                    <div style="display:flex;margin: 5px 15px;"><a href="#" class="ui" onclick="toGoodDetail(`+list[i].id+`)">` + list[i].name + `</a></div>`);
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

// 养森 加载更多
function loadMoreYS() {
    window.localStorage.setItem('categoryId', '27');
    window.location.href='goods_list.html';
}
// 爱飘飘 加载更多 跳转后渲染 啥事同一个页面
function loadMoreAPP() {
    window.localStorage.setItem('categoryId', '28');
    window.location.href='goods_list.html';
}
function loadMore(parentId) {
    $.ajax({
        type:'post',
        url:'http://localhost:9527/product/main/selectByParentId',
        data: {
            parentId:parentId
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

function toGoodDetail(id){
    window.localStorage.setItem("detailId",id);
    window.location.href='goods_detail.html';
    lookGoodDetail(id);
}
