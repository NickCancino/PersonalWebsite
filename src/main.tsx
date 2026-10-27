import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { DottedIntro } from '@/components/ui/dotted-intro';
import { PortfolioHero } from '@/components/ui/demo';
import { Footer } from '@/components/ui/footer-section';
import './styles.css';
import '../stylesheet.css';

const hero = document.getElementById('hero-root');
const footer = document.getElementById('footer-root');
if (hero) createRoot(hero).render(<React.StrictMode><DottedIntro /><PortfolioHero /></React.StrictMode>);
if (footer) createRoot(footer).render(<React.StrictMode><Footer /></React.StrictMode>);
