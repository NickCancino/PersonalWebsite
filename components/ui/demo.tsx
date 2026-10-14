import { TiltedGridHero } from './tilted-grid-hero';

const photos = [1, 2, 3, 4, 5, 6, 7].map(index => ({
  src: `/assets/profile/${index}.${index === 6 ? 'jpeg' : 'JPG'}`,
  alt: 'Nicolas Cancino and friends',
}));

export function PortfolioHero() {
  return <TiltedGridHero images={photos} className="tilted-hero" speed={4.5} tileHeight={38} aspectRatio={.75} gap={10} axis={69} curve={70} fade={10}>
    <div className="hero-content">
      <div className="hero-title"><p className="eyebrow">Software developer · Miami, FL</p><h1>Hi, I’m Nicolas.</h1><p>I study computer science at FIU and build tools for schools, games, and collectors.</p></div>
      <div className="hero-actions"><a className="primary-button" href="#work">View my projects <span aria-hidden="true">↓</span></a><a className="secondary-button" href="/CS resume.pdf" target="_blank" rel="noreferrer">View résumé ↗</a></div>
    </div>
  </TiltedGridHero>;
}

export function PortfolioFooter() {
  return <TiltedGridHero images={photos} className="tilted-footer" speed={6} tileHeight={29} aspectRatio={1.4} gap={10} axis={47} curve={65} fade={18}>
    <div className="footer-content"><h2>Get in touch</h2><div className="contact-bottom"><a href="mailto:nicocancino0@gmail.com">nicocancino0@gmail.com <span aria-hidden="true">↗</span></a><div><a href="https://github.com/NickCancino" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/nicolascancino10/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div></div>
  </TiltedGridHero>;
}
export default PortfolioHero;
