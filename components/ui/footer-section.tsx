import type { ComponentProps, ComponentType, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FrameIcon, GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
  external?: boolean;
}
interface FooterSection { label: string; links: FooterLink[] }

const footerLinks: FooterSection[] = [
  { label: 'Explore', links: [
    { title: 'Projects', href: '#work' },
    { title: 'About me', href: '#about' },
    { title: 'Résumé', href: '/CS resume.pdf', external: true },
    { title: 'Back to top', href: '#top' },
  ] },
  { label: 'Projects', links: [
    { title: 'Community Schools', href: '#community-schools' },
    { title: 'Cardfolio', href: '#cardfolio' },
    { title: 'Deadlock Tracker', href: '#deadlock' },
  ] },
  { label: 'Connect', links: [
    { title: 'Email', href: 'mailto:nicocancino0@gmail.com', icon: MailIcon },
    { title: 'GitHub', href: 'https://github.com/NickCancino', icon: GithubIcon, external: true },
    { title: 'LinkedIn', href: 'https://www.linkedin.com/in/nicolascancino10/', icon: LinkedinIcon, external: true },
  ] },
];

export function Footer() {
  return <footer id="contact" className="portfolio-footer relative mx-auto w-full max-w-6xl rounded-t-4xl border-t px-6 py-12 lg:py-16">
    <div className="footer-highlight" aria-hidden="true" />
    <div className="footer-grid">
      <AnimatedContainer className="footer-brand">
        <a href="#top" className="footer-brand-link"><FrameIcon className="size-8" aria-hidden="true" /><span>Nicolas Cancino</span></a>
        <p>Software developer.<br />Computer science at FIU.</p>
        <p className="footer-copyright">© {new Date().getFullYear()} Nicolas Cancino.</p>
      </AnimatedContainer>
      <div className="footer-links-grid">
        {footerLinks.map((section, index) => <AnimatedContainer key={section.label} delay={.1 + index * .1}>
          <h3>{section.label}</h3>
          <ul>{section.links.map(link => <li key={link.title}>
            <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
              {link.icon && <link.icon className="footer-link-icon" aria-hidden="true" />}{link.title}
            </a>
          </li>)}</ul>
        </AnimatedContainer>)}
      </div>
    </div>
  </footer>;
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};
function AnimatedContainer({ className, delay = .1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;
  return <motion.div initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
    whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
    viewport={{ once: true }} transition={{ delay, duration: .8 }} className={className}>
    {children}
  </motion.div>;
}
