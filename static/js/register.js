$('#nav').load('common_nav.html');
$('#footer').load('common_footer.html');

// 注册
$('#register').click(function () {
    $.ajax({
        type: 'post',
        url: 'http://localhost:9527/user/register',
        data: $('#dataForm').serialize(),
        xhrFields:{
            withCredentials:true
        },
        success: function f(vo) {
            if (vo.code === 2000) {
                alert("注册成功，请登录！")
                window.location.href='login.html';
            } else {
                alert(vo.message)
            }
        }
    });
});

// 获取验证码
$('#get-verify').click(function () {
    var phoneNumber = $('#phone').val();
    if(phoneNumber === undefined || phoneNumber === ''){
        alert("请输入手机号码！！！");
        return
    }else {
        if (!(/^1[34578]\d{9}$/.test(phoneNumber))) {
            alert("手机号码有误，请重填");
            return
        } else {
            $.ajax({
                type: 'post',
                url : 'http://localhost:9527/user/getCaptcha',
                data:{phone:$('#phone').val()},
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
});

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