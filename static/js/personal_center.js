$(function () {
    var username=window.localStorage.getItem('username');
    $('#username').val(username);
    //document.cookie获取到所有的cookie
    $('#cookies').val(document.cookie);
    //上传头像
    $('#dataForm').ajaxForm(function (data) {
        if (data.code === 2000) {
            window.location.reload()
        } else {
            alert(data.message)
        }
    })
    //修改密码
    $('#comfirm').click(function () {
        updatePasswordByOldPassword();
    })
    //获取验证码
    $('#get-verify').click(function () {
        getCode();
    })
    //实名认证
    $('#vertify').click(function () {
        certification();
    })
    //二级菜单切换
    $('#update-password').click(function () {
        toUpdatePassword();
    })
    $('#upload-file').click(function () {
        toUploadFile()
    })
    $('#real-name-authentication').click(function () {
        toRealName()
    })
    //重置
    $('.reset').click(function () {
        reset()
    })
})


/****************切换********************/
//切换为修改密码
function toUpdatePassword() {
    $('#update').css('display', 'block');
    $('#upload').css('display', 'none');
    $('#certification').css('display', 'none');
    $('#upload-file').removeClass("active");
    $('#real-name-authentication').removeClass("active");
    $('#update-password').addClass("active");
}
//切换为上传头像
function toUploadFile() {
    $('#update').css('display', 'none');
    $('#certification').css('display', 'none');
    $('#upload').css('display', 'block');
    $('#update-password').removeClass("active");
    $('#real-name-authentication').removeClass("active");
    $('#upload-file').addClass("active");
}
//切换实名认证
function toRealName() {
    $('#update').css('display', 'none');
    $('#upload').css('display', 'none');
    $('#certification').css('display', 'block');
    $('#update-password').removeClass("active");
    $('#upload-file').removeClass("active");
    $('#real-name-authentication').addClass("active");
}
/****************切换********************/

/****************功能********************/
//修改密码
function updatePasswordByOldPassword() {
    if ($('#oldpassword').val() == "" || $('#newpassword').val() == "" ||
        $('#repassword').val() == "") {
        alert("必填项不能为空！")
        return;
    }

    if ($('#newpassword').val() != $('#repassword').val()) {
        alert("两次密码输入不一致,请重新输入！");
    }else {
        $.ajax({
            type: 'post',
            url : 'http://localhost:9527/user/updatePasswordByOldPassword',
            data:$('#dataForm1').serialize(),
            xhrFields:{
                withCredentials:true
            },
            success:function (vo) {
                if (vo.code === 2000){
                    alert("修改成功");
                    window.location.href='login.html';
                   // reset();
                } else {
                    alert(vo.message)
                }
            }
        })
    }

}
//实名认证
function certification(){
    var id=window.localStorage.getItem('id');
    $('#user').val(id)
    if ($('#name').val() == "") {
        alert("姓名不能为空！")
    }else if ($('#idcard').val() == "") {
        alert("身份证不能为空！")
    }else if ($('#sex').val() == "") {
        alert("性别不能为空！")
    } else {
        $.ajax({
            type: 'post',
            url : 'http://localhost:9527/user/certify',
            data:$('#dataForm3').serialize(),
            xhrFields:{
                withCredentials:true
            },
            success:function (vo) {
                if (vo.code === 2000){
                    alert("恭喜您，认证成功！")
                } else {
                    alert(vo.message)
                }
            }
        })
    }
}
/****************功能********************/

//重置
function reset() {
    $('.clear-value').val('');
}
//密码显隐
var show = $("img[id^='show']"); //以show来头
var input = $("input[id$='password']"); //以password结尾
function hideShowPsw(showId) {
    if (input[showId].type == "password") {
        input[showId].type = "text";
        show[showId].src ="../static/img/showPassword.svg";
    }else {
        input[showId].type = "password";
        show[showId].src = "../static/img/disshowPassword.svg";
    }
}
