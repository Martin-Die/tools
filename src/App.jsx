import { sendToGPT } from './Components/GPTresponder';
import PestelForm from './Pages/Pestel/pestel';
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
            {loading && <h1>Je prépare à manger</h1>}
        </div>
    );
};

export default App;