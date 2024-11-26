import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import PestelForm from './Pages/Pestel/pestel';
import Navbar from './Components/navbar';

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
                <Route path="/Pestel" element={<PestelForm />} />
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
