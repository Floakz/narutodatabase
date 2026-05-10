import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './components/scrolltotop.jsx'
import { clarity } from 'clarity-js';
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'


function ClarityPageTracker() {
    const location = useLocation();

    useEffect(() => {
        if (import.meta.env.PROD && localStorage.getItem('devMode') !== 'true') {
            clarity.set("page", location.pathname);
        }
    }, [location]);

    return null;
}

if (import.meta.env.PROD && localStorage.getItem('devMode') !== 'true') {
    clarity.start({
        projectId: 'wol6ws4jdd'
    });
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ClarityPageTracker />
            <App />
            <ScrollToTop />
        </BrowserRouter>
    </StrictMode>,
)
