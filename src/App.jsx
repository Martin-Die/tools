import { sendToGPT } from './Components/GPTresponder';
import PestelForm from './Pages/Pestel/pestel';
import { RingLoader } from 'react-spinners';
import { useState } from 'react';

const App = () => {

    const [loading, setLoading] = useState(false);

    function sendToAnalyze(data) {
        setLoading(true);
        sendToGPT(data)
            .then(() => setLoading(false));
    }

    const loaderContainerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 1000
    };

    return (
        <div>
            <PestelForm callback={sendToAnalyze} />
            {loading && (
                <div style={loaderContainerStyle}>
                    <RingLoader size={150} />
                </div>
            )}
        </div>
    );
};

export default App;