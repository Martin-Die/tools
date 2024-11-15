import React, { useEffect, useState } from 'react';
import validateForm from '../../Components/verification.jsx';
import startLoad from '../../Components/startLoad.jsx';
import stopLoad from '../../Components/stopLoad.jsx';
import sendToGPT from '../../Components/GPTresponder.jsx';
import './pestel.css';

const PestelForm = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadQuestions = async () => {
            const response = await fetch('./pestel.json');
            const data = await response.json();
            setCategories(data.categories);
        };
        loadQuestions();
    }, []);

    useEffect(() => {
        const form = document.getElementById('pestelForm');
        const submitButton = document.getElementById('pestelButton');

        if (form && submitButton) {
            const handleSubmit = (event) => {
                event.preventDefault();
                validateForm();
            };

            submitButton.addEventListener('click', handleSubmit);

            // Nettoyage de l'écouteur d'événements
            return () => {
                submitButton.removeEventListener('click', handleSubmit);
            };
        } else {
            console.error('Formulaire ou bouton non trouvé.');
        }
    }, [categories]);

    return (
        <div className="container">
            <h2>Réaliser mon PESTEL</h2>
            <h6>Identifier l'environnement dans lequel mon projet va évoluer</h6>
            <form id="pestelForm">
                {categories.map((category, catIndex) => (
                    <div key={catIndex}>
                        <h3>{category.name}</h3>
                        {category.questions.map((question, qIndex) => (
                            <div key={qIndex}>
                                <label htmlFor={`${category.name.toLowerCase()}Q${qIndex + 1}`}>
                                    {`${catIndex * 2 + qIndex + 1}. ${question}`}
                                </label>
                                <textarea
                                    id={`${category.name.toLowerCase()}Q${qIndex + 1}`}
                                    placeholder="Votre réponse"
                                    value="boulangerie"
                                    data-question={question}
                                />
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit" id="pestelButton">Envoyer les réponses</button>
            </form>
        </div>
    );
};

export default PestelForm;