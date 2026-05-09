import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './components/scrolltotop.jsx'
import { clarity } from 'clarity-js';

if (import.meta.env.PROD) {
    clarity.start({
        projectId: 'wol6ws4jdd'
    });
}
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
            <ScrollToTop />
        </BrowserRouter>
    </StrictMode>,
)
