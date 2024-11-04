$(function(){
    // 왼도우크기(높이) 인식, 섹션 높이지정, 이동폭 계산 
    // 카운트변수 선언(제한 length)
    // #wrap top좌표 목표 변수 = 윈도우높이*카운트변수
    let winH=$(window).height();
    const sectNum=$('section').length;
    let num=0; // winH 배수 정의변수 (마우스휠 제어 - 증가, 감소)
    let targetPos=0; // winH*num
    let movingState=false;
    $(window).on('resize',function(){
        winH=$(window).height();
        $('section').height(winH);
        targetPos=-winH*num;
        if(num==sectNum){
            targetPos=-($('#wrap').height()-winH); // winH-$('#wrap').height();
        }
        $('#wrap').css('top',targetPos);
    });
    const btnControl=(n)=>{
        $('#snb a').filter('.on').removeClass('on');
        $('#snb>ul>li').eq(n).find('a').addClass('on');
    }
    $(window).on('mousewheel',function(event){
        //console.log(event.deltaY);
        // num 0일 때랑 num 4일 땐 공회전 없이 바로 실행되고 싶다
        // animation에 조건 걸기 + num이 특정 값까지 작아질 때까지 적용되는 조건문
        if(!movingState){
            movingState=true;
            if(event.deltaY<0){
                num++; // sectNum보다 크면 안됨
                if(num>=sectNum){
                    num=0;
                }
            }else{
                num--; // 0보다 작으면 안됨
                if(num<0){
                    num=sectNum;
                }
            }
            btnControl(num);
            targetPos=-winH*num;
            if(num==sectNum){
                targetPos=-($('#wrap').height()-winH); // winH-$('#wrap').height();
            }
            $('#wrap').stop().animate({top:targetPos},1000,'easeOutCubic',function(){
                movingState=false;
            });
        }
    });
    $('#snb a').on('click',function(event){
        if(!movingState){
            event.preventDefault();
            movingState=true;
            // 지정개체 순번 인식 -- selector.index()
            num=$(this).parent().index();
            btnControl(num);
            targetPos=-winH*num;
            if(num==sectNum){
                targetPos=-($('#wrap').height()-winH); // winH-$('#wrap').height();
            }
            $('#wrap').stop().animate({top:targetPos},1000,'easeOutCubic',function(){
                movingState=false;
            });
        }
    });
    $(document).on('keydown',function(event){
        if(!movingState){
            movingState=true;
            if(event.keyCode==40){
                num++; // sectNum보다 크면 안됨
                if(num>=sectNum){
                    num=sectNum;
                }
            }else if(event.keyCode==38){
                num--; // 0보다 작으면 안됨
                if(num<=0){
                    num=0;
                }
            }
            btnControl(num);
            targetPos=-winH*num;
            if(num==sectNum){
                targetPos=-($('#wrap').height()-winH); // winH-$('#wrap').height();
            }
            $('#wrap').stop().animate({top:targetPos},1000,'easeOutCubic',function(){
                movingState=false;
            });
        }
    });
    $('.more>a').on('click',function(){
        $('.more').hide();
        $('.detail').css('display','flex');
        $('body').on('scroll touchmove mousewheel keydown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    });
    $('.detail>.close').on('click',function(){
        $('.detail').hide();
        $('.more').css('display','flex');
        $('body').off('scroll touchmove mousewheel keydown');
    });
});