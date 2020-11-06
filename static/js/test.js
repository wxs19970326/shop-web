//原生写法
window.onload = function () {
    var btn = document.querySelector(".btn");
    var box = document.querySelector(".box");
    var bg = document.querySelector(".bg");
    var text = document.querySelector(".text-block");
    var flag = false;
    //按下onmousedown  拖动onmousemove
    //document.querySelector(".btn").onmousedown=function(event){//event事件状态
//		var e=event||window.event;
    //获取方法集合，可直接通过id, 类, 类型, 属性, 属性值等来选取元素（返回此名字的第一个）。
    btn.onmousedown = function (e) {//按下
        var downX = e.clientX; //按下后对x轴的距离

        btn.onmousemove = function (e) {//拖动
            var moveX = e.clientX - downX; //拖动后与x轴距离减去初始值距离，移动值
            //移动范围
            if (moveX > -2) {
                this.style.left = moveX + "px";//将移动值赋值给滑块
                bg.style.width = moveX + "px";//背景
                if (moveX >= (box.offsetWidth - btn.offsetWidth)) {//包含原始宽度内边距边框，不包含外边框
                    //拖到头，验证成功
                    flag = true;
                    text.innerHTML = "验证成功";
                    text.style.color = "white";
                    //事件清除
                    btn.onmousedown = null;
                    btn.onmousemove = null;
                }
            }
        }
    };

    //松开按钮
    btn.onmouseup = function () {
        //事件清除
        btn.onmousemove = null;
        if (flag) return;
        this.style.left = 0;//将移动值赋值给滑块
        bg.style.width = 0;//背景

    }
}