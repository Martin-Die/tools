import { categories } from '../../pestel';
import makePDF from './synthese.jsx'
import startLoad from './startLoad.jsx'

const API_KEY = import.meta.env.VITE_API_KEY || process.env.API_KEY;

if (!API_KEY) {
    console.error('API Key is missing! Ensure it is set in the environment variables.');
}

export async function sendToGPT(data) {
    const answer = categories.map(
        (e) => {
            e.name = e.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
            return e;
        }
    ).map(
        (e) => e.original_name + '\n\n\t' + e.questions.map((libele, index) => libele + '\n\t' + data.get(e.name)[index] + '\n').join('\n\t') + '\n'
    ).flat(2).join('\n\n');

    const prompt = "Voici une analyse PESTEL complète. Veuillez analyser chaque catégorie et fournir une analyse détaillée suivie d'une synthèse de 60 mots au format JSON pour chacune:\n\n"
        + answer
        + "Répondez au format JSON comme suit: { \"categories\": [ { \"nom\": \"Politique\", \"analyse\": \"...\", \"synthese\": \"...\" }, ... ] }";

    console.log("Prompt envoyé à l'API : ", prompt);
    startLoad();
    // return;
    // return new Promise(resolve => setTimeout(resolve, 3000));


    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) throw new Error('Server error in response.');

        const data = await response.json();
        const results = JSON.parse(data.choices[0].message.content);

        const syntheses = results.categories.map(category => ({
            category: category.nom,
            synthesis: category.synthese
        }));

        localStorage.setItem('syntheses', JSON.stringify(syntheses));

        // Générer le PDF après avoir stocké les synthèses
        makePDF();

    } catch (error) {
        console.error('Error:', error);
    }
}
