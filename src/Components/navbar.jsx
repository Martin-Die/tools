import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '15px' }}>
                <li>
                    <Link to="/" style={{cursor: 'not-allowed', pointerEvents: 'none'}}>Home</Link>
                </li>
                <li>
                    <Link to="/Pestel">Pestel</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
