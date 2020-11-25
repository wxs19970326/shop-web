$('#nav').load('common_nav.html');
$('#footer').load('common_footer.html');

// 滑动验证
let flag = false;
$('#flash-block').mouseup(function () {
    flag = false;
    //事件清除
    $('#flash-block').unbind('mousemove');
    if (flag) return;
    $('#flash-block').css("margin-left", "0");//将移动值赋值给滑块
    $('.bg').css("width", "0");//背景
});
$('#flash-block').mouseout(function () {
    flag = false;
    //事件清除
    $('#flash-block').unbind('mousemove');
    if (flag) return;
    $('#flash-block').css("margin-left", "0");//将移动值赋值给滑块
    $('.bg').css("width", "0");//背景
});
$('#flash-block').mousedown(function (e) {
    flag = true;
    //按下后对x轴的距离
    let downX = e.clientX;
    $('#flash-block').mousemove(function (e) {//拖动
        if (flag) {
            //拖动后与x轴距离减去初始值距离，移动值
            let moveX = e.clientX - downX;
            //移动范围
            if (moveX > -2) {
                $('#flash-block').css("margin-left", moveX + "px");//将移动值赋值给滑块
                $('.bg').css("width", moveX + "px");//背景
                if (moveX >= ($('.box').outerWidth() - $('.btn').outerWidth())) {//包含原始宽度内边距边框，不包含外边框
                    //事件清除
                    $('#flash-block').unbind('mousemove').unbind('mousedown').unbind("mouseup").unbind("mouseout");
                    $('#login').removeAttr("disabled");
                    //拖到头，验证成功
                    $('.text-block').text("验证成功");
                    $('.text-block').css("color", "white");
                }
            }
        }
    });
});

// 登陆
$('#login').click(function () {
    $('#loading').css('display', 'block');
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/user/login',
        data: $('#dataForm').serialize(),
        xhrFields: {
            withCredentials: true
        },
        success: function f(res) {
            if (res.code === 2000) {
                $('#loading').css('display', 'none');
                // $('#nav').load('common_nav.html');
                location.href = 'home.html'
            } else {
                $('#loading').css('display', 'none');
                $('#message').empty();
                $('#message').append(`<h3>${res.message}</h3>`);
                $('.ui.modal').modal('show');
            }

        },
        error: function e() {
            alert("失败");
            $('#loading').css('display', 'none');
            window.reload();
        }
    });
});
//
// //页面加载完成后执行
// $().ready(function(){
//     $('#log-reg').append(`
//         <div class="text">
//             <a href="login.html" style="color: inherit">登录</a>
//         </div>
//         <div class="text">
//             &nbsp;&nbsp;
//         </div>
//
//         <div class="text">
//             <a href="register.html" style="color: inherit">注册</a>
//         </div>
//     `);
// })