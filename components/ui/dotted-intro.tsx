import { useEffect, useRef, useState } from 'react';

export function DottedIntro() {
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const [visible, setVisible] = useState(true);
 useEffect(() => {
  if (!visible) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches) { setVisible(false); return; }
  const canvas = canvasRef.current;
  const context = canvas?.getContext('2d');
  if (!canvas || !context) { setVisible(false); return; }
  let frame = 0, width = 0, height = 0;
  let points: {x:number;y:number}[] = [];
  let scale = 1, originX = 0, originY = 0;
  const start = performance.now();
  const ink = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#243029';
  function resize() {
   if (!canvas || !context) return;
   width = window.innerWidth; height = window.innerHeight;
   const ratio = Math.min(window.devicePixelRatio || 1, 2);
   canvas.width = width * ratio; canvas.height = height * ratio;
   context.setTransform(ratio,0,0,ratio,0,0);
   const phone = width < 600;
   const stencil = document.createElement('canvas');
   stencil.width = phone ? 520 : 1120; stencil.height = phone ? 280 : 190;
   const pen = stencil.getContext('2d');
   if (!pen) return;
   pen.font = '600 126px Outfit, sans-serif';
   pen.textAlign = 'center'; pen.fillStyle = '#000';
   if (phone) { pen.fillText('nicolas',260,110); pen.fillText('cancino',260,250); }
   else { pen.fillText('nicolas cancino',560,138); }
   const pixels = pen.getImageData(0,0,stencil.width,stencil.height).data;
   points = [];
   for (let y=0;y<stencil.height;y+=5) for (let x=0;x<stencil.width;x+=5) {
    if (pixels[(y*stencil.width+x)*4+3]>128) points.push({x,y});
   }
   scale = Math.min(width*.88/stencil.width, 1);
   originX = (width-stencil.width*scale)/2;
   originY = (height-stencil.height*scale)/2;
  }
  resize();
  let cancelled = false;
  document.fonts.ready.then(() => { if (!cancelled) resize(); });
  const finish = () => setVisible(false);
  const preferenceChanged = () => { if (preference.matches) finish(); };
  preference.addEventListener('change', preferenceChanged);
  window.addEventListener('resize', resize);
  function draw(now:number) {
   if (!context) return;
   const elapsed = (now-start)/1000;
   context.clearRect(0,0,width,height);
   context.fillStyle = ink;
   // Quiet diagonal currents echo the dotted name without competing with it.
   for(let y=-20;y<height+20;y+=17) for(let x=0;x<width;x+=17) {
    const band = Math.sin(x*.008+y*.012-elapsed*1.4);
    context.globalAlpha = Math.max(0,band-.4)*.13;
    context.beginPath(); context.arc(x,y+Math.sin(x*.009+elapsed)*7,.8,0,Math.PI*2); context.fill();
   }
   const settle = Math.min(1,elapsed/.85);
   const ease = 1-Math.pow(1-settle,3);
   points.forEach((point,index) => {
    const delay = point.x/(width<600?520:1120)*.18;
    context.globalAlpha = Math.max(0,Math.min(1,(elapsed-delay)/.45))*.85;
    const drift = Math.sin(index*.7)*(1-ease)*24;
    context.beginPath();
    context.arc(originX+point.x*scale,originY+point.y*scale+drift,Math.max(.9,1.65*scale),0,Math.PI*2);
    context.fill();
   });
   context.globalAlpha = 1;
   if(elapsed<2.65) frame=requestAnimationFrame(draw);
  }
  frame=requestAnimationFrame(draw);
  const timer = window.setTimeout(finish,2650);
  return () => {
   cancelled=true; cancelAnimationFrame(frame); clearTimeout(timer);
   window.removeEventListener('resize',resize);
   preference.removeEventListener('change',preferenceChanged);
  };
 }, [visible]);
 if (!visible) return null;
 return <div className="dotted-intro">
  <canvas ref={canvasRef} aria-hidden="true"/>
  <button type="button" className="intro-skip" onClick={()=>setVisible(false)}>Skip intro ↗</button>
 </div>;
}
