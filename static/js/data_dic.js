$(function () {
    $("#addDic").click(function () {
        $("#element").toggle(function () {
            if ($("#element").is(':hidden')) {
                alert(1)
            }else {
                alert(2)
            }
        })
    })

})