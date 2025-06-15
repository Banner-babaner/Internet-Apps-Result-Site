document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
)



const display = document.querySelector("#displayCanvas");
const ceilResolution = 30;
const cw = 40;
const ch = 40;
ctx = display.getContext("2d");

let d = 0;
let mult = 1;

function update(){
    for(let y=0; y<ch; y++){
        let dSinY = Math.floor((Math.sin(Math.PI/180*(y+d))+1)/2*255);
        let dCosY = Math.floor((Math.cos(Math.PI/180*(y+d))+1)/2*255);
        for(let x=0; x<cw; x++){
            let dSinX = Math.floor((Math.sin(Math.PI/180*(x+d))+1)/2*255);
            let dCosX = Math.floor((Math.cos(Math.PI/180*(x+d))+1)/2*255);
            ctx.fillStyle = `rgba(${dSinX-dCosX}, ${dCosX-dSinY}, ${dSinY-dCosY}, ${dCosY+dSinX})`;
            ctx.fillRect(x*ceilResolution, y*ceilResolution, ceilResolution, ceilResolution);
        }
    }
    d+=mult;
    if(d>=360) d = 0;
    requestAnimationFrame(update);
}
update();