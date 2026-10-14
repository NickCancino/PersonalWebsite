import type { CSSProperties } from 'react';
export function Footer() {
 return <footer id="contact" className="quiet-footer">
  <div className="footer-inner">
   <h2>Say hello.</h2>
   <a className="email-link" href="mailto:nicocancino0@gmail.com">nicocancino0@gmail.com <span aria-hidden="true">↗</span></a>
   <nav aria-label="Social links"><a href="https://github.com/NickCancino" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/nicolascancino10/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="#top">Back to top ↑</a></nav>
   <p className="footer-credit">© {new Date().getFullYear()} Nicolas Cancino · Miami, FL</p>
  </div>
  <svg className="footer-wave" viewBox="0 0 1200 180" preserveAspectRatio="none" aria-hidden="true">
   {Array.from({length:80},(_,x) => <g key={x} style={{'--phase':`${-x*.095}s`} as CSSProperties}>
    {Array.from({length:10},(_,y) => <circle key={y} cx={x*15+7.5} cy={70+Math.sin(x*.16)*22+y*13} r="2" opacity={.3+y*.065}/>)}
   </g>)}
  </svg>
 </footer>;
}
