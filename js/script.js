window.addEventListener('scroll',()=>{
  const header = document.querySelector('header');
  // console.log( window.scrollY );
  if( window.scrollY>0 ){
    header.classList.add('fix');
  }else{
    header.classList.remove('fix');
  }
});

const mainMenu = document.querySelectorAll('.gnb>ul>li');
/*
  for(let i=0; i<mainMenu.length; i++){
    mainMenu[i].addEventListener('mouseenter',(e)=>{
      if(window.innerWidth>=1200){
        if(e.currentTarget.querySelector('.sub')){
          e.currentTarget.querySelector('.sub').style.display = 'block';
        }
      }
    });
    mainMenu[i].addEventListener('mouseleave',(e)=>{
      if(window.innerWidth>=1200){
        if(e.currentTarget.querySelector('.sub')){
          e.currentTarget.querySelector('.sub').style.display = 'none';
        }
      }
    });
  }
*/
const enterFunc=(e)=>{
  if(e.currentTarget.querySelector('.sub')){
    e.currentTarget.querySelector('.sub').style.display = 'block';
  }
}
const leaveFunc=(e)=>{
  if(e.currentTarget.querySelector('.sub')){
    e.currentTarget.querySelector('.sub').style.display = 'none';
  }
}
const checkWindow=()=>{
  if( window.innerWidth>=1200 ){
    mainMenu.forEach((list)=>{
      list.addEventListener('mouseenter',enterFunc);
      list.addEventListener('mouseleave',leaveFunc);
    })
  }else{
    mainMenu.forEach((list)=>{
      list.removeEventListener('mouseenter',enterFunc);
      list.removeEventListener('mouseleave',leaveFunc);
    })
  }
}
checkWindow(); // 최초 실행
window.addEventListener('resize', checkWindow);

const toggle = document.querySelector('.toggle');
const gnb = document.querySelector('.gnb');
const bg = document.querySelector('.black_bg');
const gnbClose = document.querySelector('.close');
let toggleState = true;
toggle.addEventListener('click',()=>{
  if( toggleState ){
    gnb.style.left = 0;         
    bg.style.display = 'block';
    bg.style.zIndex = 99998;    
    toggleState = false;
  }else{
    gnb.style.left = '-70vw';
    bg.style.display = 'none';
    toggleState = true;
  }
})
gnbClose.addEventListener('click', ()=>{
  gnb.style.left = '-70vw';
  bg.style.display = 'none';
  toggleState = true;
})

mainMenu.forEach((menu, index)=>{
  if(index>=1){
    menu.querySelector('a').addEventListener('click', (e)=>{
      // console.log( e.currentTarget.nextElementSibling.style );
      if( window.innerWidth<1200 ){       
        const sub = e.currentTarget.nextElementSibling;
        if(sub){ 
          e.preventDefault();  // console.log( this, e.target, e.currentTarget )
          if(sub.style.display=='none' || sub.style.display==''){
            mainMenu.forEach((menu)=>{
              const allSub=menu.querySelector('a').nextElementSibling;
              console.log(allSub);
              if(allSub){
                allSub.style.display="none";
              }
            });
            sub.style.display='block';
          }else{
            sub.style.display='none';
          }
        }
      }
    });
  }
});

const searchForm = document.querySelector('#searchForm'); //('form')
searchForm.addEventListener('keypress', (event)=>{
  if( event.key==='Enter' ){ // keyCode 제어 바꾸기
    event.preventDefault();
    this.submit();
  }
});

const searchOpen = document.querySelector('.icons_top ul li a');
const searchArea = document.querySelector('.search_area');
const searchClose = document.querySelector('.search_area #close');
searchOpen.addEventListener('click', (e)=>{
  e.preventDefault();
  searchArea.style.display = 'flex';
});
searchClose.addEventListener('click', ()=>{
  searchArea.style.display = 'none';
});

const detail=document.querySelector('details');
const summary=document.querySelector('summary')
detail.addEventListener('click',()=>{
  summary.style.display="none";
});
const ameni=document.querySelector('#Amenity');
const wrap=ameni.querySelectorAll('.wrapping');
wrap.forEach((rap,index)=>{
  const img=rap.querySelector('img');
  rap.addEventListener('mouseenter',()=>{
    if(index==0){
      img.setAttribute('src','images/svg/valley_hover.png');
    }else if(index==1){
      img.setAttribute('src','images/svg/amenities_hover.png');
    }else{
      img.setAttribute('src','images/svg/service_hover.png');
    }
  });
  rap.addEventListener('mouseleave',()=>{
    if(index==0){
      img.setAttribute('src','images/svg/valley.png');
    }else if(index==1){
      img.setAttribute('src','images/svg/amenities.png');
    }else{
      img.setAttribute('src','images/svg/service.png');
    }
  })
})

/* swiper , gsap + scrollTrigger, textplugin  */
document.addEventListener('DOMContentLoaded', function(){

  const animateText=(text, detail)=>{
    const letters=text.textContent.split('');
    text.innerHTML='';
    //console.log(letters);
    letters.forEach((letter,index)=>{
      const span = document.createElement('span');
      //span.textContent = letter;
      (letter===" ") ? span.innerHTML='&nbsp;' : span.textContent=letter;
      span.style.display='inline-block';
      text.appendChild(span);
    });
    const spans = text.querySelectorAll('span');
    spans.forEach((span, index)=>{
      gsap.set(span, {
        opacity:0, y:60, display:'inline-block',
      });
      gsap.to(span, {
        duration:0.8, opacity:1, y:0, delay:(index+1)*0.08, ease:'power2.out', overwrite:'auto'
      });
    })
    gsap.set(detail,{
      opacity:0
    });
    gsap.to(detail,{
      duration:0.8, opacity:1, delay:3, ease:'power2.out', overwrite:'auto'
    });
  }

  const swiper=new Swiper('.swiper', {
    autoplay:{
      delay:8000,
    },
    loop:true,
    on:{
      slideChange:function(){
        const prevSlide = this.slides[this.previousIndex].querySelector('.text_content');
        const currentText = this.slides[this.activeIndex].querySelector('.text_content');
        const currentDetail=this.slides[this.activeIndex].querySelector('.sub_detail')
        animateText(currentText, currentDetail);
      }
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })

  window.onload=()=>{
    const initText = swiper.slides[swiper.activeIndex].querySelector('.text_content');
    animateText(initText);
  }

  const imgWrappers = document.querySelectorAll('.imgs_wrap');
  imgWrappers.forEach((wrapper, index)=>{
    const imgs = wrapper.querySelectorAll('img'); //offsetWidth, offsetHeight -- 이미지 렌더링된 너비,높이
    imgs.forEach((img)=>{
      img.dataset.originWidth = img.offsetWidth;
      img.dataset.originHeight = img.offsetHeight; // <img data-originWidth="~px" ... />

      gsap.set( img, { // 초기값 설정
        width:0,  opacity:0,
        height:img.offsetHeight,  transformOrigin:'left center'
      });
    })

    gsap.to(imgs, {
      width:(index,target)=>target.dataset.originWidth /*100% : div>img구성시 */,
      opacity:1,
      ease:'sine.out',
      duration:3,
      stagger:3,
      scrollTrigger:{
        trigger:wrapper,
        start:'top 90%',
        end:'top 70%',
        scrub:2,
        toggleActions:'restart pause reverse pause',
      }
    })
  });
  
  /*
  const viewAll=document.querySelector('.more');
  gsap.fromTo(viewAll,{
    opacity:0,
    y:100,
    ease:'power4.in',
    scrub:2,
    scrollTrigger:{
      trigger:viewAll,
      start:'top 100%',
      end:'bottom',
      toggleActions:'start none none reverse'
    }
  },{
    opacity:1,
    y:0
  });
  */

  const amenities = document.querySelectorAll('#Amenity .content_wrap>div');
  const rows = [];
  amenities.forEach((item, index)=>{
    const rowIndex = Math.floor( index/3 ); // 0,0,0,1,1,1
    if(!rows[rowIndex]){
      rows[rowIndex] = [];
    }
    rows[rowIndex].push(item);
  })
  /*
  rows.forEach((row, rowIndex)=>{
    row.forEach((item, itemIndex)=>{
      ------------------------------------
      gsap.set(item, {opacity:0, y:100});
      ScrollTrigger.create({
        trigger:item, 
        start:'top 70%',
        onEnter:()=>{  gsap.to( )   },
        onLeaveBack:()=>{ gsap.to( )}
      })
      ------------------------------------
      gsap.from(item, {
        opacity:0,
        y:100,
        duration:0.5,
        scrollTrigger:{
          trigger:row[0],
          start:'top 70%',
          end:'bottom top',
          toggleActions:'play none none reverse',
          onEnter:()=>{
            gsap.to(item, {
              opacity:1, y:0, duration:0.5, delay:itemIndex*0.2, overwrite:true
            })
          },
          onLeaveBack:()=>{ gsap.to(item,{opacity:1, y:0, overwrite:true })},
        }
      })
      ------------------------------------
    })
  })
  */
  const ctw=document.querySelector('.content_wrap');
  rows.forEach((row, rowIndex)=>{
    gsap.from(row, {
      opacity:0,
      y:300,
      duration:1,
      scrollTrigger:{
        trigger:ctw,
        start:'top 70%',
        end:'bottom top',
        toggleActions:'play none none reverse',
        onEnter:()=> gsap.to(row,{ opacity:1, y:0, overwrite:true}),
        onLeaveBack:()=> gsap.to(row,{opacity:1, y:0, overwrite:true})
      }
    })
  })
  
  gsap.fromTo('#news_wrap>div',
    {
      opacity:0,
      x:500
    },{
      opacity:1,
      x:0,
      duration:1,
      stagger:0.5,
      scrollTrigger:{
        trigger:'#news_wrap',
        start:'top 70%',
        toggleAction:'play none none reverse'
      }
    }
  )


})


//const textContent = document.querySelector('.swiper-slide .text_content');