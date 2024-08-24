var call = 0;

function sirv_pdt360DegViewer(id, layer, n, p, t, playable, autoPlay, draggable, mouseMove, buttons, keys, scroll) {
    console.log(`${call}-${id}-${playable ? 'playable ' : ''}${autoPlay ? 'autoPlay ' : ''}${draggable ? 'draggable ' : ''}${mouseMove ? 'mouseMove ' : ''}${buttons ? 'buttons ' : ''}${keys ? 'keys' : ''}${scroll ? 'scroll ' : ''}`);
    call++;
    loaderNone(id);
    
    //x값 변화에 따른 파일명 변경을 위한 변수
    let dx = 1;

    var i = 1, j = 0, move = [],
        mainDiv = document.querySelector(`#${id}`);
    mainDiv.className = 'viewer';
    mainDiv.innerHTML += `<img class="${id} ${playable ? 'playable ' : ''}${autoPlay ? 'autoPlay ' : ''}${draggable ? 'draggable ' : ''}${mouseMove ? 'mouseMove ' : ''}${buttons ? 'buttons ' : ''}${keys ? 'keys ' : ''}${scroll ? 'scroll ' : ''}" draggable="false" src='${p}${1}_${5}.${t}'>`;
    mainDiv.innerHTML +=
           '<div class="loader"><div class="three-bounce"><div class="one"></div><div class="two"></div><div class="three"></div></div></div>'

    if (call == 1)
        for (var h = 1; h <= layer; h++) {
            for (var k = 1; k <= n; k++) {
                document.getElementById('dummy').innerHTML += `<img src='${p}${h}_${k}.${t}'>`;
            }
        }
    var img = document.querySelector(`#${id} .${id}`);

    if (!playable && !autoPlay) {
        var touch = false;
        (window.matchMedia("screen and (max-width: 992px)").matches) ? touchFun() : nonTouch();

        //For Touch Devices
        window.addEventListener('touchstart', function () {
            touchFun();
        });
        //스크롤 방지
        img.addEventListener('wheel', function (e) {
            e.preventDefault();
        });

        function touchFun() {
            touch = true;
            
            img.removeAttribute('draggable');
            img.addEventListener('touchmove', function (e) {
                //스크롤 방지?
                e.preventDefault();
                logic(this, e);
            });
            img.addEventListener('touchend', function (e) {
                move = [];
            });
        }
        //For Non-Touch Devices
        function nonTouch() {
            touch = false;
            if (draggable) {
                var drag = false;
                img.addEventListener('mousedown', function (e) {
                    drag = true;
                    logic(this, e);
                });
                img.addEventListener('mouseup', function (e) {
                    drag = false;
                    move = [];
                });
                mouseEvent();
            }

            if (mouseMove) {
                drag = true;
                mouseEvent();
            }
            function mouseEvent() {
                img.addEventListener('mousemove', function (e) {
                    (drag) ? logic(this, e) : null;
                });
                img.addEventListener('mouseleave', function () {
                    move = [];
                });
            }
            if (scroll) {
                img.addEventListener('wheel', function (e) {
                    e.preventDefault();
                    (e.wheelDelta / 120 > 0) ? nxt(this) : prev(this);
                });
            }
            if (keys) {
                img.setAttribute('tabindex', '0');
                img.onkeydown = function (e) {
                    e.preventDefault();
                    if (e.keyCode == 37 || e.keyCode == 38)
                        prev(img);
                    else if (e.keyCode == 39 || e.keyCode == 40)
                        nxt(img);
                };
            }
        }
        function logic(el, e) {
            j++;
            var x = touch ? e.touches[0].clientX : e.clientX;
            var coord = (x - img.offsetLeft);
            //move.push(coord);

            //y좌표 추가 시도 : y좌표 확인
            var y = touch ? e.touches[0].clientY : e.clientY;
            var coord_y = (y - img.offsetTop);
            //console.log(coord, coord_y);
            move.push([coord, coord_y]);
            //console.log(move);

            var l = move.length,
                oldMove = move[l - 2],
                newMove = move[l - 1];

            //y좌표 추가 시도 : move변수 역할 추측
            //console.log(oldMove[0]);
            
            var thresh = touch ? true : !(j % 3);
            /*
            if (thresh) {
                if (newMove[0] > oldMove[0])
                    nxt(el);
                else if (newMove[0] < oldMove[0])
                    prev(el);
            }
            */
            let deltaX;
            let deltaY;
           if(move.length>1){
                deltaX = move[l-1][0] - move[l-2][0];
                deltaY = move[l-1][1] - move[l-2][1];
           }
           
           //console.log(`dx : ${deltaX}  ,  dy : ${deltaY}`);
           if (thresh) {
                if (deltaX > 0)
                    prev(el);
                else if (deltaX < 0)
                    nxt(el);

                if (deltaY > 0)
                    nxt_y(el);
                else if (deltaY < 0)
                    prev_y(el);
            }
            
        }
        if (buttons) {
            var btnsDiv = document.createElement('div');
            btnsDiv.className = 'btnDiv navDiv';

            var leftNavBtn = document.createElement('button');
            leftNavBtn.className = 'play leftNav';
            leftNavBtn.setAttribute('title', 'left navigation');
            btnsDiv.appendChild(leftNavBtn);
            leftNavBtn.addEventListener('click', function () {
                prev(img);
            });

            var rightNavBtn = document.createElement('button');
            rightNavBtn.className = 'play rightNav';
            rightNavBtn.setAttribute('title', 'right navigation');
            btnsDiv.appendChild(rightNavBtn);
            rightNavBtn.addEventListener('click', function () {
                nxt(img);
            });
            img.parentNode.appendChild(btnsDiv);
        }
    } else {
        var interval, playing = false,
            pause = false,
            left = false,
            right = false,
            speed = 1;

        if (playable) {
            var btnDiv = document.createElement('div');
            btnDiv.className = 'btnDiv';

            var playBtn = document.createElement('button');
            playBtn.className = 'play';
            playBtn.setAttribute('title', 'play');
            btnDiv.appendChild(playBtn);
            playBtn.addEventListener('click', function () {
                playing = true;
                pause = false;
                play();
            });

            var pauseBtn = document.createElement('button');
            pauseBtn.className = 'pause';
            pauseBtn.setAttribute('title', 'pause');
            btnDiv.appendChild(pauseBtn);
            pauseBtn.addEventListener('click', function () {
                pause = true;
            });

            var stopBtn = document.createElement('button');
            stopBtn.className = 'stop';
            stopBtn.setAttribute('title', 'stop');
            btnDiv.appendChild(stopBtn);

            stopBtn.addEventListener('click', function () {
                pause = true;
                speed = 50;
                right = true;
                left = false;
                this.parentNode.parentNode.querySelector('img').src = `${p}${i = 1}.${t}`;
            });

            var leftBtn = document.createElement('button');
            leftBtn.className = 'left';
            leftBtn.setAttribute('title', 'play direction-left');
            btnDiv.appendChild(leftBtn);
            leftBtn.addEventListener('click', function () {
                right = false;
                left = true;
                if (playing)
                    play();
            });

            var rightBtn = document.createElement('button');
            rightBtn.className = 'right';
            rightBtn.setAttribute('title', 'play direction-right');
            btnDiv.appendChild(rightBtn);
            rightBtn.addEventListener('click', function () {
                left = false;
                right = true;
                if (playing)
                    play();
            });

            var speedBtn = document.createElement('button');
            speedBtn.className = 'plus';
            speedBtn.setAttribute('title', 'increase play speed');
            btnDiv.appendChild(speedBtn);
            speedBtn.addEventListener('click', function () {
                if (playing)
                    timer(speed > 10 ? speed -= 10 : speed);
            });

            var slowBtn = document.createElement('button');
            slowBtn.className = 'minus';
            slowBtn.setAttribute('title', 'decrease play speed');
            btnDiv.appendChild(slowBtn);
            slowBtn.addEventListener('click', function () {
                if (playing)
                    timer(speed < 100 ? speed += 10 : speed);
            });

            mainDiv.prepend(btnDiv);
        }

        function play() {
            timer(speed);
        }

        function timer(t) {
            clearInterval(interval);
            interval = setInterval(function () {
                if (!pause) {
                    if (left)
                        prev(img);
                    else if (right)
                        nxt(img);
                    else
                        nxt(img);
                }
            }, t);
        }
    }

    function prev_y(e) {
        if (i <= 1) {
            /*
            i = n;
            e.src = `${p}${dx}_${--i}.${t}`;
            nxt(e);
            */
            i = 5;
            dx = Math.ceil((dx+n/2))%n;
            e.src = `${p}${dx}_${--i}.${t}`;
        } else
            e.src = `${p}${dx}_${--i}.${t}`;
    }
    function nxt_y(e) {
        if (i >= n) {
            /*
            i = 1;
            e.src = `${p}${dx}_${++i}.${t}`;
            prev(e);
            */
           i = 5;
           dx = Math.ceil((dx+n/2))%n;
           e.src = `${p}${dx}_${++i}.${t}`;
        } else
            e.src = `${p}${dx}_${++i}.${t}`;
    }

    //y변화용
    function prev(e) {
        if (dx <= 1) {
            
            dx = layer;
            e.src = `${p}${--dx}_${i}.${t}`;
            nxt(e);
            
        } else
            e.src = `${p}${--dx}_${i}.${t}`;
    }
    function nxt(e) {
        if (dx >= layer) {
            
            dx = 1;
            e.src = `${p}${++dx}_${i}.${t}`;
            prev(e);
            
        } else
            e.src = `${p}${++dx}_${i}.${t}`;
        
    }

    function loaderNone(id) {
        window.addEventListener('load',function(){
            document.querySelector(`#${id} .loader`).style.display = 'none';
            if (autoPlay) {
                pause = false;
                play();
            }
        });
    }
}

let t_array = []
let images = new Array(count);

for (var i = 0; i < images.length; i++) {
    images[i] = new Array(10);
}
function preloading () {
    let idx = 0;
    let n = images.length;
    for (let i = 1; i <= n; i++) {
        for (let i = 1; i <= 10; i++) {
            images[i][j] = new Image();
            images[i][j].src = t_array[idx++];
        }
    }
}
for (var i = 1; i <72 ; i++) {
    for(var j = 1; j<10;j++){
        t_array.push(`./img/test/shoe/${i}_${j}.webp`);
    } // 배열 arr의 모든 요소의 인덱스(index)를 출력함.
  }

console.log(t_array);
preloading();

