import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUpRight, ChevronUp, ChevronDown, Plus, Minus } from 'lucide-react';

const photos = [1,2,3,4,5,6,7].map(n=>`/assets/profile/${n}.${n===6?'jpeg':'JPG'}`);
type Entry = { title:string; subtitle:string; description:string; stack:string; images?:string[] };
const projects:Entry[] = [
 {title:'Community Schools',subtitle:'A workspace for school operations.',description:'A dashboard for school events, service requests, and budgets across 18 schools and $10M+ in grant funding. Includes school and administrator views, multi-day requests, and validated forms.',stack:'Next.js · React · TypeScript · Supabase · Tailwind CSS',images:['/assets/projects/home page.png','/assets/projects/login.png','/assets/projects/program service form sub.png']},
 {title:'Cardfolio',subtitle:'A trading card companion.',description:'A mobile app for checking card prices, managing collections, and comparing trades. Includes card scanning, condition adjustments, deal ratings, wishlists, and a two-sided trade calculator.',stack:'React Native · Expo · TypeScript · Pokémon TCG API',images:['/assets/projects/pokemon1.PNG','/assets/projects/pokemon3.PNG']},
 {title:'Deadlock Tracker',subtitle:'In progress.',description:'An AI-assisted coaching tool for Valve’s Deadlock that turns match history and player stats into personalized recommendations, trend visualizations, and measurable improvement goals.',stack:'Python · FastAPI · React · PostgreSQL · OpenAI API'},
 {title:'Pokémon Trivia',subtitle:'An early Python project.',description:'A guessing game using PokéAPI, with generation selection, progressive hints, and score tracking.',stack:'Python · Requests · PokéAPI',images:['/projpics/pokeproj.JPG']},
 {title:'Personal Portfolio',subtitle:'Where I started.',description:'My first portfolio, built from scratch with responsive layouts and deployed on Vercel.',stack:'HTML · CSS · JavaScript',images:['/projpics/personalweb.JPG']},
];
const experience:Entry[] = [
 {title:'The Education Effect',subtitle:'Software Engineer Assistant',description:'Building React and TypeScript tools and PostgreSQL workflows for 18 schools, supporting oversight of $10M+ in grant funding.',stack:'React · TypeScript · PostgreSQL'},
 {title:'Atlas Esports',subtitle:'Software Engineer Intern',description:'Worked on esports platform features, player analytics, and live-match APIs at Atlas Esports Consulting.',stack:'Platform development · Player analytics · APIs'},
];
const transition={duration:.65,ease:[.22,1,.36,1] as [number,number,number,number]};

function TextScroller({kind, entries}:{kind:string;entries:Entry[]}) {
 const [selected,setSelected]=useState(0);
 const rail=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 function choose(index:number,focus=false) {
  const next=Math.max(0,Math.min(entries.length-1,index));
  setSelected(next);
  rail.current?.scrollTo({top:next*76,behavior:reduced?'instant':'smooth'});
  if(focus) rail.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus({preventScroll:true});
 }
 function keyboard(event:KeyboardEvent<HTMLDivElement>) {
  let next:number|undefined;
  if(event.key==='ArrowDown') next=selected+1;
  if(event.key==='ArrowUp') next=selected-1;
  if(event.key==='Home') next=0;
  if(event.key==='End') next=entries.length-1;
  if(next!==undefined){event.preventDefault();choose(next,true);}
 }
 const item=entries[selected];
 return <div className="section-content">
  <div className="scroller-stage">
   <div ref={rail} className="text-rail" role="tablist" aria-orientation="vertical" aria-label={kind+' entries'} onKeyDown={keyboard}
    onScroll={()=>{if(rail.current)setSelected(Math.max(0,Math.min(entries.length-1,Math.round(rail.current.scrollTop/76))))}}>
    {entries.map((entry,index)=><motion.button key={entry.title} type="button" role="tab"
     id={kind+'-tab-'+index} aria-selected={index===selected} aria-controls={kind+'-detail'} tabIndex={index===selected?0:-1}
     initial={reduced?false:{opacity:0,x:30,filter:'blur(8px)'}}
     animate={{opacity:index===selected?1:.38, x:0,filter:reduced?'none':`blur(${Math.min(4,Math.abs(selected-index)*2)}px)`}}
     transition={{duration:reduced?0:.45}}
     onClick={()=>choose(index)}><span className="scroller-arrow" aria-hidden="true">{index===selected?'→':''}</span>{entry.title}</motion.button>)}
   </div>
   <div className="scroller-controls"><span>{selected+1} / {entries.length}</span><span className="scroller-hint">Scroll to explore</span>
    <button type="button" aria-label={'Previous '+kind+' entry'} disabled={selected===0} onClick={()=>choose(selected-1)}><ChevronUp size={17}/></button>
    <button type="button" aria-label={'Next '+kind+' entry'} disabled={selected===entries.length-1} onClick={()=>choose(selected+1)}><ChevronDown size={17}/></button>
   </div>
  </div>
  <div role="tabpanel" tabIndex={0} id={kind+'-detail'} aria-labelledby={kind+'-tab-'+selected} className="entry-detail">
   <motion.div key={selected} initial={reduced?false:{opacity:0,y:10,filter:'blur(4px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} transition={{duration:.4}}>
    <h3>{item.subtitle}</h3><p>{item.description}</p><p className="entry-stack">{item.stack}</p>
    {item.images&&<div className={'entry-images '+(item.title==='Cardfolio'?'phone-shots':'')}>{item.images.map((src,i)=><a key={src} href={src} target="_blank" rel="noreferrer" aria-label={'Open '+item.title+' screenshot '+(i+1)}><img src={src} loading="lazy" alt={item.title+' screenshot '+(i+1)}/></a>)}</div>}
   </motion.div>
  </div>
 </div>;
}

export function MinimalPortfolio() {
 const reduced=useReducedMotion();
 const [intro,setIntro]=useState(true);
 const [shot,setShot]=useState(0);
 const [active,setActive]=useState<'projects'|'experience'|null>(null);
 const [remFailed,setRemFailed]=useState(false);
 useEffect(()=>{
  if(reduced){setIntro(false);return;}
  photos.forEach(src=>{const image=new Image();image.src=src;});
  if(!intro)return;
  const cuts=[500,950,1400,1850,2300,2750].map((time,index)=>window.setTimeout(()=>setShot(index+1),time));
  const finish=window.setTimeout(()=>setIntro(false),3350);
  return ()=>{cuts.forEach(clearTimeout);clearTimeout(finish);};
 },[intro,reduced]);
 return <>
  <header className="minimal-header">
   <motion.a className="nick-wordmark" href="#top" aria-label="Nick, back to top"
    initial={false} animate={intro?{left:'calc(50% + 130px)',top:'calc(50% + 170px)',x:'-100%',y:'-100%',fontSize:88}:{left:24,top:22,x:0,y:0,fontSize:27}}
    transition={reduced?{duration:0}:transition}>nick</motion.a>
   <motion.nav aria-label="Social links" className="social-links" initial={false} animate={{opacity:intro?0:1}} transition={{delay:intro?0:.45,duration:.35}}>
    <a href="https://github.com/NickCancino" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a>
    <a href="https://www.linkedin.com/in/nicolascancino10/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16}/></a>
    <a href="mailto:nicocancino0@gmail.com" aria-label="Email"><Mail size={16}/></a>
   </motion.nav>
   <a className="anime-link" href="https://myanimelist.net/animelist/Xcrimpo?status=2" target="_blank" rel="noreferrer" aria-label="MyAnimeList — Xcrimpo">
    {!remFailed&&<img className="rem-motion" src="https://media.tenor.com/STBXSVflTdcAAAAj/rem-rotating-the-finger.gif" alt="Rem spinning her fingers" width="64" height="64" onError={()=>setRemFailed(true)}/>}
    <span className={remFailed?'rem-fallback':'rem-still'}>MyAnimeList ↗</span>
   </a>
  </header>
  <AnimatePresence>{intro&&<motion.div key="opening" className="promo-intro" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.55}}>
   <div className="promo-frame">
    <motion.img key={shot} src={photos[shot]} alt="" initial={{scale:shot%2?1.18:.8}} animate={{scale:1}} transition={{duration:.45,ease:'easeOut'}}/>
    <div className="promo-crop" aria-hidden="true" key={'crop-'+shot}/>
   </div>
   <button className="skip-opening" type="button" onClick={()=>setIntro(false)}>Skip intro <ArrowUpRight size={15}/></button>
  </motion.div>}</AnimatePresence>
  <main id="top" className="minimal-main">
   <h1 className="sr-only">Nicolas Cancino — software developer</h1>
   <motion.div initial={false} animate={{opacity:intro?0:1,y:intro?12:0}} transition={{delay:intro?0:.5,duration:.5}}>
    {(['projects','experience'] as const).map(kind=><section key={kind} className="expand-section">
     <h2><button id={kind+'-toggle'} type="button" aria-expanded={active===kind} aria-controls={kind+'-panel'} onClick={()=>setActive(active===kind?null:kind)}>
      {kind==='projects'?'Projects':'Experience'}{active===kind?<Minus size={22}/>:<Plus size={22}/>}
     </button></h2>
     <AnimatePresence initial={false}>{active===kind&&<motion.div id={kind+'-panel'} role="region" aria-labelledby={kind+'-toggle'} initial={reduced?false:{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={reduced?{duration:0}:transition} className="expand-panel">
      <TextScroller kind={kind} entries={kind==='projects'?projects:experience}/>
     </motion.div>}</AnimatePresence>
    </section>)}
   </motion.div>
  </main>
  <footer className="minimal-footer"><span>Miami · FIU · May 2028</span><a href="/CS resume.pdf" target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={13}/></a></footer>
 </>;
}
