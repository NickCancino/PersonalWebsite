import type { CSSProperties } from 'react';
const letters = [
 ['10001','11001','11001','10101','10011','10011','10001'],
 ['11111','00100','00100','00100','00100','00100','11111'],
 ['01111','10000','10000','10000','10000','10000','01111'],
 ['01110','10001','10001','10001','10001','10001','01110'],
 ['10000','10000','10000','10000','10000','10000','11111'],
 ['01110','10001','10001','11111','10001','10001','10001'],
 ['01111','10000','10000','01110','00001','00001','11110'],
];
export function PortfolioHero() {
 return <div className="quiet-hero">
  <svg className="name-graphic" viewBox="0 0 213 45" aria-hidden="true">
   {letters.flatMap((letter,l) => letter.flatMap((row,y) => [...row].flatMap((pixel,x) => pixel === '1' ? [
    <circle key={`${l}-${x}-${y}`} cx={6+l*30+x*5} cy={7+y*5} r="1.65"
     style={{'--delay': `${(l*7+x+y)*.018}s`, '--dx': `${(x-2)*8}px`, '--dy': `${(y-3)*6}px`} as CSSProperties}/>
   ] : [])))}
  </svg>
  <h1>Nicolas Cancino</h1>
  <p>Software developer in Miami.<br/>Computer science at FIU, graduating May 2028.</p>
  <div className="hero-actions"><a className="primary-button" href="#work">Explore my work <span aria-hidden="true">↗</span></a><a className="secondary-button" href="/CS resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a></div>
 </div>;
}
export default PortfolioHero;
