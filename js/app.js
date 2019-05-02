const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const play=document.querySelector('#play');
const pause=document.querySelector('#pause');
const timerText = document.querySelector('.timer');


let auto=false;
const intervalTime=5000;
let slideInterval;
let timer=1;
let intervalCount;

function intervalReset(){
  timer=2;return 1;
}

function intervalRun(){
  if(auto){
    
    clearInterval(slideInterval);
    slideInterval=setInterval(nextSlide,intervalTime);
    clearInterval(intervalCount);
    timer=1;
    intervalCount = setInterval(()=>{timerText.innerHTML=timer<=5?timer++:intervalReset()},1000);
    
  }
}


const nextSlide=()=>{
  const current = document.querySelector('.current');
  current.classList.remove('current');
  
  if(current.nextElementSibling){
    current.nextElementSibling.classList.add('current');
  }
  else{
    slides[0].classList.add('current');
  }
  // setTimeout(()=>current.classList.remove('current'));  
}

const prevSlide=()=>{
  const current = document.querySelector('.current');
  current.classList.remove('current');
  
  if(current.previousElementSibling.className==='slide'){
    current.previousElementSibling.classList.add('current');
  }
  else{
    slides[slides.length-1].classList.add('current');
  }
  // setTimeout(()=>current.classList.remove('current'),30);
     
}


next.addEventListener('click',e=>{
  nextSlide();
  if(auto===true){
    intervalRun();
  }    
  }
);

prev.addEventListener('click',e=>{
  prevSlide();
  if(auto===true){
    intervalRun();
  }
});


// key Listener
document.onkeydown=(e)=>{
  switch(e.keyCode){
    //right
    case 39:{
      nextSlide();
      if(auto==true)
        intervalRun();
    }
    break;  
    //left
    case 37:{
      prevSlide();
      if(auto===true){
        intervalRun();
      } 
      break;
    }
  }
};


/********************* Play-Pause ***************************/
play.addEventListener('click',(e)=>{
  console.log('play');
  const cc=document.querySelector('.cs');
  cc.classList.remove('cs');
  cc.nextElementSibling.classList.add('cs');
  auto=true;
  intervalRun();
});

pause.addEventListener('click',(e)=>{
  console.log('pause');
  const cc=document.querySelector('.cs');
  cc.classList.remove('cs');
  cc.previousElementSibling.classList.add('cs');
  auto=false;
  clearInterval(slideInterval);
  clearInterval(intervalCount);
  timer=1;
  timerText.innerHTML=0;
});

