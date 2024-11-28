import { categories } from './swot';
import makePDF from './synthese.jsx'

const API_KEY = import.meta.env.VITE_API_KEY;

export function sendToGPT(data) {
    const answer = categories.map(
        (e) => {
            e.name = e.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
            return e;
        }
    ).map(
        (e) => e.original_name + '\n\n\t' + e.questions.map((libele, index) => libele + '\n\t' + data.get(e.name)[index] + '\n').join('\n\t') + '\n'
    ).flat(2).join('\n\n');

    const prompt = "Voici une analyse SWOT complète. Veuillez analyser chaque catégorie et fournir une analyse détaillée suivie d'une synthèse de 60 mots au format JSON pour chacune:\n\n"
        + answer
        + "Répondez au format JSON comme suit: { \"categories\": [ { \"nom\": \"Forces\", \"analyse\": \"...\", \"synthese\": \"...\" }, ... ] }";

    console.log("Prompt envoyé à l'API : ", prompt);
    makePDF(prompt);
    return new Promise(resolve => setTimeout(resolve, 9000));

    return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }]
        })
    })
    .then((data) => data.json())
    .then((data) => {
        // console.log(data);
        const results = JSON.parse(data.choices[0].message.content);
        const syntheses = results.categories.map(category => ({
            category: category.nom,
            synthesis: category.synthese
        }));

        makePDF(syntheses);
        // console.log(syntheses);
    })
    .catch(console.log);
}
