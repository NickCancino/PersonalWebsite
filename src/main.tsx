import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { MinimalPortfolio } from '@/components/ui/minimal-portfolio';
import './styles.css';
import '../stylesheet.css';
const root=document.getElementById('app');
if(root)createRoot(root).render(<React.StrictMode><MinimalPortfolio/></React.StrictMode>);
