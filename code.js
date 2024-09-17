
function randomNum(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

class Blob{
    constructor(el, x, y, vx, vy){
        this.el=el;
        this.size=this.el.getBoundingClientRect().width;
        this.x=x;
        this.y=y;
        this.vx=vx * (Math.random()>0.5?1:-1); //for velocity in both axis randomly
        this.vy=vy * (Math.random()>0.5?1:-1);
    }

    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        if (this.x>=window.innerWidth-this.size){
            this.vx*=-1; //reverse the direction of movement
            this.x=window.innerWidth-this.size;
        }
        else if(this.x<=0){
            this.vx*=-1;
            this.x=0;
        }
        if (this.y>=window.innerHeight-this.size){
            this.vy*=-1; //reverse the direction of movement
            this.y=window.innerHeight-this.size;
        }
        else if(this.y<=0){
            this.vy*=-1;
            this.y=0;
        }
    }

    moveOnScreen(){
        this.el.style.transform=`translate(${this.x}px, ${this.y}px)`;
    }
}

function initBlobs(){
    //init blob container height
    let blob=document.querySelector(".blobs");
    let blob_outer=document.querySelector(".blobs-filter");
    blob.style.height=`${window.innerHeight}px`;
    blob_outer.style.height=`${window.innerHeight}px`;

    let blobs=document.querySelectorAll(".blobs div");
    const blobArr = Array.from(blobs).map((value, index)=>{
        return new Blob(value, randomNum(0, window.innerWidth-value.getBoundingClientRect().width), randomNum(0, window.innerHeight-value.getBoundingClientRect().width), randomNum(1, 3), randomNum(1, 3));
    });
    // console.log(blobArr);
    function update(){
        blobArr.forEach((blob)=>{
            blob.update();
            blob.moveOnScreen();
        })
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

initBlobs();


function setNotDraggable(){
    let skillIcons=document.querySelectorAll("#skills-row div img");
    for (let icon of skillIcons){
        icon.setAttribute("draggable", "false");
    }
}
setNotDraggable();


// smooth scroll
const lenis = new Lenis()
lenis.on('scroll', (e) => {
//   console.log(e)
})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


//Horizontal animation
const container=document.querySelector(".cont"); //outer container
const projs=gsap.utils.toArray(".cont div");
console.log(projs);

let maxVal=0;
let height=projs.forEach((val)=>{
    if (val.getBoundingClientRect().height>maxVal){
        maxVal=val.getBoundingClientRect().height;
    }
})
let finalVal=0;
let manageHorizontalScroll=()=>{
    if (window.visualViewport.height>=maxVal){
        finalVal=(window.visualViewport.height-maxVal)/2;
        finalVal*=-1;
    }
}
manageHorizontalScroll();

let scrollTween=gsap.to(projs, {
    xPercent:-100*(projs.length-1),
    ease:"slow",
    scrollTrigger:{
        trigger: ".cont",
        pin: true,
        start:"-8%",
        scrub:1,
        end:"+=2500",
    }
})

//Loader
let ldr=document.querySelector(".loader");
//Our page loads too fast so might not be noticable sometimes
window.addEventListener("load", ()=>{
    ldr.style.display="none";
})