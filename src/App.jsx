import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './Components/navbar';
import Facture from './Pages/TVA/facture';
import Mentions from "./Pages/mentionsLegales/mentions";
import './App.css';

const Home = () => {
    return (
        <div>
            <h1>Menu tools</h1>
        </div>
    );
};

const Root = () => {
    const location = useLocation();

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Facture" element={<Facture />} />
                <Route path="/Mentions_Legales" element={<Mentions />} />
            </Routes>
            {location.pathname === "/" && <Navbar />}
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Root />
        </Router>
    );
};

export default App;
