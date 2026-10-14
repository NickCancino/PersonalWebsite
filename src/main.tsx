import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { PortfolioHero, PortfolioFooter } from '@/components/ui/demo';
import './styles.css';
import '../stylesheet.css';

const hero = document.getElementById('hero-root');
const footer = document.getElementById('footer-root');
if (hero) createRoot(hero).render(<React.StrictMode><PortfolioHero /></React.StrictMode>);
if (footer) createRoot(footer).render(<React.StrictMode><PortfolioFooter /></React.StrictMode>);
