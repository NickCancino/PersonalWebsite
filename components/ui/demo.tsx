import type { CSSProperties } from 'react';
const photos = [1,2,3,4,5,6,7].map(n => `/assets/profile/${n}.${n===6?'jpeg':'JPG'}`);
export function PortfolioHero() {
 return <div className="directory-hero">
 <div className="directory-identity"><h1><span>Nicolas</span> <span>Cancino</span></h1><p>Software developer in Miami.</p><nav aria-label="Quick links"><a href="#experience">Experience</a><a href="#work">Projects</a><a href="/CS resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a></nav></div>
 <div className="mini-carousel" aria-label="Photos of Nicolas and friends">
 {photos.map((src,index)=><img key={src} src={src} alt={index===0?'Nicolas and friends':''} aria-hidden={index!==0} style={{'--photo-delay':`${index*4-1}s`} as CSSProperties}/>)}
 </div></div>;
}
export default PortfolioHero;
