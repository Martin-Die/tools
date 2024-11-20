import { categories } from '../../../pestel';
import React, { useState } from 'react';
import './pestel.css';

const initialState = new Map(categories.map(
    (e) => {
        e.original_name = e.name.repeat(1);
        e.name = e.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
        return e;
    }
).map(
    (e) => [e.name, new Array(e.questions.length)]
));

const PestelForm = ({callback}) => {
    const [formValues, setFormValues] = useState(initialState);

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
        callback(formValues);
    }

    return (
        <div className="container">
            <h2>Réaliser mon PESTEL</h2>
            <h6>Identifier l'environnement dans lequel mon projet va évoluer</h6>
            <form id="pestelForm" onSubmit={handleSubmit}>
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
                                        required
                                    ></textarea>
                                </span>
                            );
                        })}
                    </div>
                ))}
                <button type="submit">Envoyer les réponses</button>
            </form>
        </div>
    );
};

export default PestelForm;