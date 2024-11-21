import { sendToGPT } from './Components/GPTresponder';
import Spinner from './Components/spinner/Spinner';
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
            {loading && <Spinner />}
        </div>
    );
};

export default App;