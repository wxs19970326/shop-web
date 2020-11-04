$('#login').click(function () {
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

var time = 60;
var t;

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

$('#nav').load('common_nav.html');
$('#footer').load('common_footer.html');