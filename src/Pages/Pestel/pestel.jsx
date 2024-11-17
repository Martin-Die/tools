import React, { useState } from 'react';
// import validateForm from '../../Components/verification.jsx';
import './pestel.css';

import categories from '../../../pestel';

const PestelForm = () => {
    const str_categories = categories["categories"].map((category) =>
        category.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
    )
    const [formValues, setFormValues] = useState(new Map(
        str_categories.map((e) => [e, ''])
    ));
    // console.log(formValues);
    function handleChange(e) {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formValues);
    }
  
    return (
        <div className="container">
            <h2>Réaliser mon PESTEL</h2>
            <h6>Identifier l'environnement dans lequel mon projet va évoluer</h6>
            <form id="pestelForm" onSubmit={handleSubmit}>
                {str_categories.map((category, catIndex) => (
                    <div key={catIndex}>
                        <h3>{category}</h3>
                        <input name={category} type='text' onChange={handleChange} placeholder='arbre'></input>
                        {/* {category.questions.map((question, qIndex) => (
                            <div key={qIndex}>
                                <label htmlFor={`${category.name.toLowerCase()}Q${qIndex + 1}`}>
                                    {`${catIndex * 2 + qIndex + 1}. ${question}`}
                                </label>
                                <textarea
                                    id={`${category.name.toLowerCase()}Q${qIndex + 1}`}
                                    onChange={handleChange}
                                    placeholder="Votre réponse"
                                    value="Boulangerie"
                                    data-question={question}
                                />
                            </div>
                        ))} */}
                    </div>
                ))}
                <button type="submit" id="pestelButton">Envoyer les réponses</button>
            </form>
        </div>
    );
};

export default PestelForm;