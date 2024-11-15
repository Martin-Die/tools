async function sendToGPT() {
    const form = document.getElementById('pestelForm');
    const pestelCategories = [];
    const API_KEY = import.meta.env.VITE_API_KEY;

    if (!API_KEY) {
        console.error('API_KEY is not defined. Please check your .env file.');
        return;
    }

    let currentCategory = null;

    Array.from(form.children).forEach(child => {
        if (child.tagName === 'H3') {
            if (currentCategory) pestelCategories.push(currentCategory);
            currentCategory = { name: child.textContent.trim(), questionsAndAnswers: [] };
        } else if (child.tagName === 'TEXTAREA') {
            const questionText = child.getAttribute("data-question");
            const answer = child.value.trim() || '';
            currentCategory.questionsAndAnswers.push({ question: questionText, answer: answer });
        }
    });
    if (currentCategory) pestelCategories.push(currentCategory);

    let prompt = "Voici une analyse PESTEL complète. Veuillez analyser chaque catégorie et fournir une analyse détaillée suivie d'une synthèse de 60 mots au format JSON pour chacune:\n\n";
    pestelCategories.forEach(category => {
        prompt += `Categorie: ${category.name}\n`;
        category.questionsAndAnswers.forEach(qa => {
            prompt += `Question: ${qa.question}\nRéponse: ${qa.answer}\n`;
        });
        prompt += "\n";
    });
    prompt += "Répondez au format JSON comme suit: { \"categories\": [ { \"nom\": \"Politique\", \"analyse\": \"...\", \"synthese\": \"...\" }, ... ] }";

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

export default sendToGPT;