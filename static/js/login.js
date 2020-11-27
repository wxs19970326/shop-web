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

// 登陆-用户名密码
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
// 登陆-手机号验证码
$('#login1').click(function () {
    $('#loading').css('display', 'block');
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/user/login1',
        data: $('#dataForm2').serialize(),
        xhrFields: {
            withCredentials: true
        },
        success: function f(res) {
            if (res.code === 2000) {
                $('#loading').css('display', 'none');
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
})
$('#get-verify').click(function () {
    getCode();
})
// 跳转到手机号登录
function toLoginByPhone() {
    $('#username-password').css('display', 'none');
    $('#phone-code').css('display', 'block');
}
// 跳转到用户名登录
function toLoginByUsername() {
    $('#username-password').css('display', 'block');
    $('#phone-code').css('display', 'none');
}
//获取验证码
function getCode() {
    if ($('#phone').val() == "") {
        alert("手机号不能为空！")
    }else {
        $.ajax({
            type: 'post',
            url : 'http://localhost:9527/user/getCaptcha',
            data:$('#dataForm2').serialize(),
            xhrFields:{
                withCredentials:true
            },
            success:function (vo) {
                if (vo.code === 2000){
                    timing()
                } else {
                    alert(vo.message)
                }
            }
        })
    }

}
// 验证码倒计时
let time = 60;
let t;
function timing() {
    t = setInterval(function () {
        countdown();
    }, 1000);
    countdown()
}
function countdown(){
    if (time === 0) {
        time = 60;
        clearInterval(t);
        $('#get-verify').removeAttr("disabled");
        $('#get-verify').text("获取验证码");
    }else{
        $('#get-verify').attr('disabled',"true");
        $('#get-verify').text("重新发送" + time);
        time--;
    }
}
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