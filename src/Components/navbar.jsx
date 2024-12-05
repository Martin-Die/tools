import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '15px' }}>
                <li>
                    <Link to="/" style={{cursor: 'not-allowed', pointerEvents: 'none'}}>Home</Link>
                </li>
                <li>
                    <Link to="/Facture">Facture</Link>
                </li>
                <li>
                    <Link to="/Mentions_Legales">Mentions Légales</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
