import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage/homepage'
import Characters from './pages/characters/characters'
import Jutsus from './pages/jutsus/jutsus'
import Clans from './pages/clans/clans'
import Others from './pages/others/others'
import CharactersExpanded from './pages/charactersExpanded/charactersExpanded'
import JutsusExpanded from './pages/jutsusExpanded/jutsusExpanded'
import ClansExpanded from './pages/clansExpanded/clansExpanded'
import OthersExpanded from './pages/othersExpanded/othersExpanded'
import './index.css'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharactersExpanded />} />
            <Route path="/jutsus" element={<Jutsus />} />
            <Route path="/jutsus/:id" element={<JutsusExpanded />} />
            <Route path="/clans" element={<Clans />} />
            <Route path="/clans/:id" element={<ClansExpanded />} />
            <Route path="/others" element={<Others />} />
            <Route path="/others/:id" element={<OthersExpanded />} />
        </Routes>
    )
}

export default App