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
    //二级菜单切换
    $('#update-password').click(function () {
        updatePassword();
    })
    $('#upload-file').click(function () {
        uploadFile()
    })
    //重置
    $('#reset').click(function () {
        $('.clear-value').val('');
    })
})
//使用手机验证码
function updateByPhone(){
    $('#phonecode').css('display', 'block');
    $('#update').css('display', 'none');
}

//切换为修改密码
function updatePassword() {
    $('#update').css('display', 'block');
    $('#upload').css('display', 'none');
    $('#upload-file').removeClass("active");
    $('#update-password').addClass("active");
}
//切换为上传头像
function uploadFile() {
    $('#update').css('display', 'none');
    $('#phonecode').css('display', 'none');
    $('#upload').css('display', 'block');
    $('#update-password').removeClass("active");
    $('#upload-file').addClass("active");
}
//获取input框内的切换图片id和input文本框的id
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
