var call = 0;
console.log('loaded');
function test(){
    console.log('test');
}
function new_pdt360DegViewer(id, layer, n, p, t, draggable) {
    console.log(`Integrated ${call}-${id}-${draggable ? 'draggable ' : ''}`);
    call++;
    loaderNone(id);
    
    //y값 변화에 따른 파일명 변경을 위한 변수
    let dy = 1;

    var i = 1, j = 0, move = [];
    mainDiv = document.querySelector(`#${id}`);
    mainDiv.className = 'viewer';
    mainDiv.innerHTML += `<img class="${id} ${draggable ? 'draggable ' : ''}" draggable="false" src='${p}${dy}_${i}.${t}'>`;
    mainDiv.innerHTML +=
           '<div class="loader"><div class="three-bounce"><div class="one"></div><div class="two"></div><div class="three"></div></div></div>'

    // if (call == 1)
    //     for (var h = 1; h <= layer; h++) {
    //         for (var k = 1; k <= n; k++) {
    //             document.getElementById('dummy').innerHTML += `<img src='${p}${h}_${k}.${t}'>`;
    //         }
    //     }
    var img = document.querySelector(`#${id} .${id}`);

    //if (!playable && !autoPlay) {
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

            
            function mouseEvent() {
                img.addEventListener('mousemove', function (e) {
                    (drag) ? logic(this, e) : null;
                });
                img.addEventListener('mouseleave', function () {
                    move = [];
                });
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
        //    let deltaX = move[l-1][0] - move[l-5][0];
        //    let deltaY = move[l-1][1] - move[l-5][1];
           
        let deltaX;
        let deltaY;
        if(move.length>1){
            deltaX = move[l-1][0] - move[l-2][0];
            deltaY = move[l-1][1] - move[l-2][1];
       }

           //delta 값을 조정해서 움직임 속도 조절 //기본(-5)
           if (thresh) {
                if (deltaX > 0)
                    prev_y(el);
                else if (deltaX < 0)
                    nxt_y(el);

                if (deltaY > 0)
                    nxt(el);
                else if (deltaY < 0)
                    prev(el);
            }
            
        }
        // if (buttons) {
        //     var btnsDiv = document.createElement('div');
        //     btnsDiv.className = 'btnDiv navDiv';

        //     var leftNavBtn = document.createElement('button');
        //     leftNavBtn.className = 'play leftNav';
        //     leftNavBtn.setAttribute('title', 'left navigation');
        //     btnsDiv.appendChild(leftNavBtn);
        //     leftNavBtn.addEventListener('click', function () {
        //         prev(img);
        //     });

        //     var rightNavBtn = document.createElement('button');
        //     rightNavBtn.className = 'play rightNav';
        //     rightNavBtn.setAttribute('title', 'right navigation');
        //     btnsDiv.appendChild(rightNavBtn);
        //     rightNavBtn.addEventListener('click', function () {
        //         nxt(img);
        //     });
        //     img.parentNode.appendChild(btnsDiv);
        // }
    //}

    function prev(e) {
        if (i <= 1) {
            i = n;
            e.src = `${p}${dy}_${--i}.${t}`;
            nxt(e);
        } else
            e.src = `${p}${dy}_${--i}.${t}`;
        console.log("X--");
    }
    function nxt(e) {
        if (i >= n) {
            i = 1;
            e.src = `${p}${dy}_${++i}.${t}`;
            prev(e);
        } else
            e.src = `${p}${dy}_${++i}.${t}`;
        console.log("X++");
    }

    //y변화용
    function prev_y(e) {
        if (dy <= 1) {
            dy = layer;
            e.src = `${p}${--dy}_${i}.${t}`;
            nxt(e);
        } else
            e.src = `${p}${--dy}_${i}.${t}`;
        console.log("Y--");
    }
    function nxt_y(e) {
        if (dy >= layer) {
            dy = 1;
            e.src = `${p}${++dy}_${i}.${t}`;
            prev(e);
        } else
            e.src = `${p}${++dy}_${i}.${t}`;
        console.log("Y++");
    }

    function loaderNone(id) {
        window.addEventListener('load',function(){
            document.querySelector(`#${id} .loader`).style.display = 'none';
            // if (autoPlay) {
            //     pause = false;
            //     play();
            // }
        });
    }
}