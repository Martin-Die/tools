import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './Components/navbar';
import PestelForm from './Pages/Pestel/pestel';
import PorterForm from './Pages/Porter/porter';
import Facture from './Pages/TVA/facture';
import Swot from './Pages/Swot/swot';

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
            {location.pathname === "/" && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/PESTEL" element={<PestelForm />} />
                <Route path="/Porter" element={<PorterForm />} />
                <Route path="/Facture" element={<Facture />} />
                <Route path="/SWOT" element={<Swot />} />
            </Routes>
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
