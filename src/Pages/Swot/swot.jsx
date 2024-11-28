import { categories } from './Components/swot';
import React, { useState } from 'react';
import './swot.css';
import { sendToGPT } from './Components/GPTresponder';
import Spinner from '../../Components/Spinner';

const initialState = new Map(categories.map(
    (e) => {
        e.original_name = e.name.repeat(1);
        e.name = e.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
        return e;
    }
).map(
    (e) => [e.name, new Array(e.questions.length)]
));

const SwotForm = ({ callback }) => {
    const [formValues, setFormValues] = useState(initialState);
    const [loading, setLoading] = useState(false);

    function sendToAnalyze(data) {
        setLoading(true);
        sendToGPT(data)
            .then(() => setLoading(false));
    }

    function handleChange(e, idX) {
        const { name, value } = e.target;
        const newVal = new Map([...formValues.entries()]);
        const arr = newVal.get(name);
        arr[idX] = value
        newVal.set(name, arr);
        setFormValues(newVal);
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendToAnalyze(formValues);
    }

    return (
        <div className="container">
            <h2>Réaliser mon SWOT</h2>
            <h6>Identifier l'environnement dans lequel mon projet va évoluer</h6>
            <form id="swotForm" onSubmit={handleSubmit}>
                {categories.map(({ name, questions }, catIndex) => (
                    <div key={`cat_${catIndex}`}>
                        <h3>{name}</h3>
                        {questions.map((q, qIndex) => {
                            const id = `cat_${catIndex}_q_${qIndex}`;
                            return (
                                <span key={id}>
                                    <label htmlFor={id}>{q}</label>
                                    <textarea
                                        id={id}
                                        name={name}
                                        onChange={(e) => handleChange(e, qIndex)}
                                        // required
                                    ></textarea>
                                </span>
                            );
                        })}
                    </div>
                ))}
                <button type="submit" disabled={loading}>Envoyer les réponses</button>
            </form>
            <Spinner loading={loading} />
        </div>
    );
};

export default SwotForm;