$('#nav').load('common_nav.html');
$('#footer').load('common_footer.html');

// 注册
$('#register').click(function () {
    $.ajax({
        type: 'post',
        url: 'http://localhost:8888/pages/login',
        data: $('#dataForm').serialize(),
        xhrFields:{
            withCredentials:true
        },
        success: function f(data) {
            if (data.status === 0) {
                window.history.go(-1);
            } else if (data.status === 1) {
                alert(data.message)
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
            timing();
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