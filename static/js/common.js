$('#nav').load('common_nav.html');
$('#footer').load('common_footer.html');

/**
 * 发送邮件
 * addressee 收件人邮箱
 * subject   标题
 * content   内容
 */

function sendEmail(addressee,subject,content) {
    $.ajax({
        type:'post',
        url:'http://localhost:9527/product/main/sendEmail',
        async:false,
        data: {
            addressee:addressee,
            subject:subject,
            content:content
        },
        xhrFields:{
            withCredentials:true
        },
        success:function (data) {
            alert(data.message);
            $('.ui.modal')
                .modal('hide')
            ;
        },
        error:function () {
            alert("出错啦")
        }
    })
}