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

    return (
        <div>
            <PestelForm callback={sendToAnalyze} />
            {loading && <RingLoader size={999} />}
        </div>
    );
};

export default App;