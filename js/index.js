window.onload = function () {

    var headerLis = document.querySelectorAll("#header .headerMain .nav li");
    var arrow = document.querySelector("#header .headerMain .arrow");
    var ups = document.querySelectorAll("#header .headerMain .nav li .up");
    var content = document.getElementById("content");
    var contLis = document.querySelectorAll("#content .list>li");
    var header = document.getElementById("header");
    var conList = document.querySelector("#content .list");
    //第四屏uls
    var aboutUls = document.querySelectorAll("#content .list .about .about3>.item>ul");
    //第五屏
    var team3 = document.querySelector("#content .list .team .team3");
    var teamLis = document.querySelectorAll("#content .list .team .team3 .teamList>li");

    //模拟li索引值
    var now = 0;
    //定时器
    var timer = null;

    //第五屏canvas效果
    canvasAin();
    function canvasAin() {
        var myCanvas = null;
        var timer1 = 0;
        var timer2 = 0;

        //鼠标离开
        team3.onmouseleave = function () {
            for (var j = 0; j < teamLis.length; j++) {
                teamLis[j].style.opacity = '1';
            }
            //移除动画
            removeCanvas();
        };

        for (var i = 0; i < teamLis.length; i++) {
            //鼠标滑入
            teamLis[i].onmouseenter = function () {
                for (var j = 0; j < teamLis.length; j++) {
                    teamLis[j].style.opacity = '0.5';
                }
                this.style.opacity = '1';

                //添加动画区域
                addCanvas();

                //指定canvas位置
                myCanvas.style.left = this.offsetLeft + 'px';
            }

        }

        function removeCanvas() {
            clearInterval(timer1);
            clearInterval(timer2);

            //移除canvas
            myCanvas.remove();
            myCanvas = null;
        }

        function addCanvas() {
            if(!myCanvas){
                myCanvas = document.createElement('canvas');
                myCanvas.width = teamLis[0].offsetWidth;
                myCanvas.height = 320;
                team3.appendChild(myCanvas);
                //气泡效果
                qiPao(myCanvas);
            }

        }

        function qiPao(myCanvas) {
            var ctx = myCanvas.getContext('2d');

            //圆的信息,x,y,r
            var arr = [];

            //画圆
            timer1 = setInterval(function () {
                ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

                //deg变化，圆心点坐标，
                for (var i = 0; i < arr.length; i++) {
                    arr[i].deg += 3;
                    arr[i].x = arr[i].startX + 0.5*Math.sin(arr[i].deg*Math.PI/180)*arr[i].num;
                    arr[i].y = arr[i].startY - 0.5*(arr[i].deg*Math.PI/180)*arr[i].num*1.5;

                    if(arr[i].y < 30){
                        arr.splice(i,1)
                    }
                }

                for (var i = 0; i < arr.length; i++) {

                    ctx.beginPath();
                    ctx.fillStyle = 'rgba('+ arr[i].red +','+ arr[i].green +','+ arr[i].blue +','+arr[i].a +')';
                    ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI)
                    ctx.fill();
                }

            },10);


            //准备圆的基本信息
            timer2 =  setInterval(function(){

                var r = Math.floor(Math.random()*8)+2;
                var x = Math.floor(Math.random()*myCanvas.width);
                var y = myCanvas.height-r-2;


                var red = Math.floor(Math.random()*255);
                var green = Math.floor(Math.random()*255);
                var blue = Math.floor(Math.random()*255);
                var a = 1;

                var startX = x;
                var startY = y;
                var deg = 0;
                var num =  Math.floor(Math.random()*30)+30;

                arr.push(
                    {
                        x: x,
                        y: y,
                        r: r,
                        red:red,
                        green:green,
                        blue:blue,
                        a:a,
                        startX:startX,
                        startY:startY,
                        deg:deg,
                        num:num
                    }
                )

            },100);

        }




    }

   /* function canvasAin() {
        var myCanvas = null;
        var timer1 = 0;
        var timer2 = 0;
        //鼠标移出team3动画消失,模糊消失
        team3.onmouseleave = function () {
            for (var j = 0; j < teamLis.length; j++) {
                teamLis[j].style.opacity = "1";
            }
            //移除气泡
            removeCanvas();
        };

        //鼠标进入li清晰,其他li模糊,产生气泡
        for (var i = 0; i < teamLis.length; i++) {
            teamLis[i].onmouseenter = function () {
                //鼠标进入li清晰,其他li模糊
                for (var j = 0; j < teamLis.length; j++) {
                    teamLis[j].style.opacity = "0.5";
                }
                this.style.opacity = "1";

                addCanvas();
                myCanvas.style.left = this.offsetLeft + "px";
            }
        }

        function removeCanvas() {
            clearInterval(timer1);
            clearInterval(timer2);

            myCanvas.remove();
            myCanvas = null;//一定要重新赋值
        }

        function addCanvas() {
            //创建canvas
            if (!myCanvas) {
                myCanvas = document.createElement("canvas");
                myCanvas.style.width = teamLis[0].offsetWidth + "px";
                myCanvas.style.height = 320 + "px";
                team3.appendChild(myCanvas);
                bubble(myCanvas);

            }
        }

        //气泡
        function bubble(myCanvas) {

            var ctx = myCanvas.getContext("2d");
            //设置圆的信息
            var arr = [];
            //画圆以及运动路线
            setInterval(function () {
                ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

                //运动
                for (var i = 0; i < arr.length; i++) {
                    arr[i].deg += 3;
                    arr[i].x = arr[i].startX + 0.5 * Math.sin(arr[i].deg * Math.PI / 180) * arr[i].num;
                    arr[i].y = arr[i].startY - 0.5 * (arr[i].deg * Math.PI / 180) * arr[i].num * 1.5;

                    if (arr[i].y < 30) {
                        arr.splice(i, 1)
                    }
                }
                //画圆
                for (var i = 0; i < arr.length; i++) {
                    ctx.beginPath();
                    ctx.fillStyle = "rgba(" + arr[i].red + "," + arr[i].green + "," + arr[i].blue + "," + arr[i].a + ")";
                    ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI);
                    ctx.fill();

                }

            }, 1000/60);


            //圆的相关参数设置
            setInterval(function () {
                var r = randomInt(2,10);
                var x = randomInt(0,myCanvas.width);
                var y = myCanvas.height - r - 2;

                //随机颜色
                var red = randomInt(0,255);
                var green = randomInt(0,255);
                var blue = randomInt(0,255);
                var a = 1;

                var startX = x;
                var startY = y;
                var deg = 0;
                var num =  randomInt(30, 60);

                arr.push(
                    {
                        x: x,
                        y: y,
                        r: r,
                        red: red,
                        green: green,
                        blue: blue,
                        a: a,
                        startX: startX,
                        startY: startY,
                        deg: deg,
                        num: num
                    }
                )
            }, 100);



        }
        //随机整数
        function randomInt(m, n) {
        	return parseInt(Math.random() * (n - m -1) + m);
        }

    }*/

    //滚轮逻辑
    //ie/chrome
    content.onmousewheel = function (event) {
        clearTimeout(timer);//清除定时器效果
        timer = setTimeout(function () {
            fun(event);
        }, 200)
    };
    //firefox
    if (content.addEventListener) {
        content.addEventListener('DOMMouseScroll', function (event) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fun(event)
            }, 200)
        });
    }

    function fun(event) {
        event = event || window.event;
        //是否向上还是是否向下
        var flag = '';
        if (event.wheelDelta) {
            // ie/chrome
            if (event.wheelDelta > 0) {
                //向上
                flag = 'up'
            } else {
                //向下
                flag = 'down'
            }


        } else if (event.detail) {
            //firefox
            if (event.detail < 0) {
                //向上
                flag = 'up'
            } else {
                //向下
                flag = 'down'
            }
        }

        //判断
        switch (flag) {
            case 'up':
                if (now > 0) {
                    now--;
                }
                move(now);
                break;
            case 'down':
                if (now < headerLis.length - 1) {
                    now++;
                }
                move(now);
                break;
        }
        //取消默认行为
        //dom2
        event.preventDefault && event.preventDefault();
        //dom0
        return false;
    }

    //屏幕大小的变化
    window.onresize = function () {
        contentBind();
        arrow.style.left = headerLis[0].getBoundingClientRect().left
            + headerLis[0].offsetWidth / 2
            - arrow.offsetWidth / 2 + "px";
    };


    //设置内容区域的高度
    contentBind();

    function contentBind() {
        //内容区
        content.style.height = document.documentElement.clientHeight
            - header.offsetHeight + "px";
        //内容区lis
        for (var i = 0; i < contLis.length; i++) {
            contLis[i].style.height = document.documentElement.clientHeight
                - header.offsetHeight + "px";
        }
    }

    //第四屏图片炸裂
    imgBind();

    function imgBind() {
        //每个ul都对应同样的事件
        for (var i = 0; i < aboutUls.length; i++) {
            changeImg(aboutUls[i]);
        }


        //图片变化事件
        function changeImg(Ul) {
            //li的宽高
            var w = Ul.offsetWidth / 2;
            var h = Ul.offsetHeight / 2;
            //图片路径
            var imgSrc = Ul.dataset.img;
            //创建4个li和img
            for (var i = 0; i < 4; i++) {
                var liNode = document.createElement("li");
                var imgNode = document.createElement("img");
                liNode.style.width = w + "px";
                liNode.style.height = h + "px";
                //给li添加图片路径
                imgNode.src = imgSrc;
                //给每个图片定位
                imgNode.style.left = -(i % 2) * w + "px";
                imgNode.style.top = -Math.floor(i / 2) * h + "px";
                Ul.appendChild(liNode);
                liNode.appendChild(imgNode);


            }
            var imgNodes = Ul.querySelectorAll("img");
            Ul.onmouseenter = function () {
                imgNodes[0].style.top = h + "px";
                imgNodes[1].style.left = -2 * w + "px";
                imgNodes[2].style.left = w + "px";
                imgNodes[3].style.top = -2 * h + "px";

            };
            Ul.onmouseleave = function () {
                //图片归元
                imgNodes[0].style.top = 0 + "px";
                imgNodes[1].style.left = -w + "px";
                imgNodes[2].style.left = 0 + "px";
                imgNodes[3].style.top = -h + "px";

            }
        }
    }


    //头部逻辑
    headerBind();

    function headerBind() {
        //页面打开时小箭头的位置改变, home图标变黑
        arrow.style.left = headerLis[0].getBoundingClientRect().left
            + headerLis[0].offsetWidth / 2 - arrow.offsetWidth / 2 + "px";

        var firstUp = ups[0];
        firstUp.style.width = "100%";

        for (var i = 0; i < headerLis.length; i++) {
            headerLis[i].index = i;
            //头部点击事件
            headerLis[i].onclick = function () {
                move(this.index);
                now = this.index;//记录当前索引
            }
        }
    }




    function move(index) {
        //图标文字的变化,点击时先归元,再随点击变化
        for (var j = 0; j < ups.length; j++) {
            ups[j].style.width = "";
        }
        ups[index].style.width = "100%";

        //小箭头的变化
        arrow.style.left = headerLis[index].getBoundingClientRect().left
            + headerLis[index].offsetWidth / 2 - arrow.offsetWidth / 2 + "px";

        //主体部分高度变化
        conList.style.top = -index * (document.documentElement.clientHeight
            - header.offsetHeight) + "px";
    }


};

