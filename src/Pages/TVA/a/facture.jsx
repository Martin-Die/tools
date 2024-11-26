'use strict';
/* global document, window, console */

document.addEventListener("DOMContentLoaded", function () {
    const vatRates = {
        "France Métropolitaine": [
            { name: "Général (20%)", rate: 20 },
            { name: "Réduit (10%)", rate: 10 },
            { name: "Réduit (5,5%)", rate: 5.5 },
            { name: "Taux particulier (2,1%)", rate: 2.1 },
            { name: "Autre", rate: "custom" }
        ],
        "DROM": [
            { name: "Général (8,5%)", rate: 8.5 },
            { name: "Taux particulier (1,05%)", rate: 1.05 },
            { name: "Taux particulier (1,75%)", rate: 1.75 },
            { name: "Taux réduit (2,1%)", rate: 2.1 },
            { name: "Autre", rate: "custom" }
        ],
        "Corse": [
            { name: "Général (20%)", rate: 20 },
            { name: "Spécifique (2,1%)", rate: 2.1 },
            { name: "Taux spécifique (10%)", rate: 10 },
            { name: "Ventes produits pétroliers (13%)", rate: 13 },
            { name: "Autre", rate: "custom" }
        ]
    };

    // Initialisation des dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
    document.getElementById('paymentDate').value = today;

    // Validation des champs de saisie
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^a-zA-Z0-9., ]/g, '');
        });
    });

    // Formatage des codes postaux et numéros de téléphone
    function formatPostalCode(input) {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length > 2) {
                this.value = this.value.slice(0, 2) + ' ' + this.value.slice(2);
            }
        });
    }

    formatPostalCode(document.getElementById('postalCode'));
    formatPostalCode(document.getElementById('clientPostalCode'));

    document.getElementById('phoneNumber').addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '').replace(/(\d{2})(?=\d)/g, '$1 ');
    });

    // Formatage du SIRET et du numéro de TVA
    function formatSiret(input) {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length > 3) {
                this.value = this.value.slice(0, 3) + ' ' + this.value.slice(3);
            }
            if (this.value.length > 7) {
                this.value = this.value.slice(0, 7) + ' ' + this.value.slice(7);
            }
            if (this.value.length > 11) {
                this.value = this.value.slice(0, 11) + ' ' + this.value.slice(11);
            }
        });
    }

    formatSiret(document.getElementById('siret'));

    document.getElementById('tvaNumber').addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
        if (this.value.length > 2) {
            this.value = this.value.slice(0, 2) + ' ' + this.value.slice(2);
        }
        if (this.value.length > 5) {
            this.value = this.value.slice(0, 5) + ' ' + this.value.slice(5);
        }
    });

    document.getElementById('iban').addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z0-9]/g, '').replace(/(.{4})(?=.)/g, '$1 ');
    });

    // Mise à jour des options de taux de TVA
    const regionSelect = document.getElementById('region');
    const tauxTVASelect = document.getElementById('tauxTVA');
    const customRateDiv = document.getElementById('customRateDiv');

    function updateTauxTVAOptions() {
        const selectedRegion = regionSelect.value;
        const rates = vatRates[selectedRegion];

        // Effacer les options existantes
        tauxTVASelect.innerHTML = '';

        // Remplir les nouvelles options
        rates.forEach(rateObj => {
            const option = document.createElement('option');
            option.value = rateObj.rate;
            option.textContent = rateObj.name;
            tauxTVASelect.appendChild(option);
        });

        // Afficher/cacher le champ de taux personnalisé
        tauxTVASelect.addEventListener('change', function () {
            customRateDiv.style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }

    // Initialisation et mise à jour lors du changement de région
    updateTauxTVAOptions();
    regionSelect.addEventListener('change', updateTauxTVAOptions);

    // Gestion du calcul lors de la soumission du formulaire
    const vatForm = document.getElementById('vatForm');
    vatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        calculateVAT();
    });

    // Ajout d'un champ d'achat
    const addPurchaseButton = document.getElementById('addPurchase');
    const purchasesContainer = document.getElementById('purchases');

    function addPurchaseField() {
        const purchases = document.querySelectorAll('.purchase');
        if (purchases.length >= 8) {
            alert("Vous ne pouvez ajouter que 8 achats maximum.");
            return;
        }

        const purchaseDiv = document.createElement('div');
        purchaseDiv.className = 'purchase';
        purchaseDiv.innerHTML = `
            <input type="text" maxlength="30" class="purchaseName" placeholder="Nom de l'achat">
            <input type="number" class="purchaseAmount" step="0.01" min="0" max="99999" placeholder="Montant HT" oninput="this.value = Math.min(this.value, this.max);">
            <button type="button" class="removePurchase">Supprimer</button>
        `;
        purchasesContainer.appendChild(purchaseDiv);

        const removeButton = purchaseDiv.querySelector('.removePurchase');
        removeButton.addEventListener('click', function () {
            purchasesContainer.removeChild(purchaseDiv);
        });
    }

    addPurchaseButton.addEventListener('click', addPurchaseField);

    // Calcul de la TVA
    function calculateVAT() {
        const purchases = document.querySelectorAll('.purchase');
        let totalHT = 0;
        let purchaseDetails = [];

        purchases.forEach(purchase => {
            const name = purchase.querySelector('.purchaseName').value;
            const amount = parseFloat(purchase.querySelector('.purchaseAmount').value);
            if (name && !isNaN(amount)) {
                totalHT += amount;
                purchaseDetails.push({ name, amount });
            }
        });

        let tauxTVA = tauxTVASelect.value === 'custom' ? parseFloat(document.getElementById('customRate').value) : parseFloat(tauxTVASelect.value);

        if (isNaN(totalHT) || isNaN(tauxTVA)) {
            alert('Veuillez entrer des montants valides et sélectionner un taux de TVA.');
            return;
        }

        const montantTVA = totalHT * tauxTVA / 100;
        const montantTTC = totalHT + montantTVA;

        document.getElementById('montantTVA').textContent = montantTVA.toFixed(2) + ' €';
        document.getElementById('montantTTC').textContent = montantTTC.toFixed(2) + ' €';

        return { totalHT, montantTVA, montantTTC, purchaseDetails };
    }

    // Gestion de la création de la facture
    const createInvoiceButton = document.getElementById('createInvoiceButton');
    const invoiceDetails = document.getElementById('invoiceDetails');
    const paymentDetails = document.getElementById('paymentDetails');
    const specialcase = document.getElementById('specialcase');
    const credits = document.getElementById('credits');
    const generateInvoiceButton = document.getElementById('generateInvoiceButton');

    createInvoiceButton.addEventListener('click', function () {
        invoiceDetails.style.display = 'block';
        paymentDetails.style.display = 'block';
        specialcase.style.display = 'block';
        credits.style.display = 'block';
    });

    // Gestion du logo
    const logoInput = document.getElementById('logo');
    let logoUrl = '';
    let logoWidth = 0;
    let logoHeight = 0;
    logoInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const maxSizeInMB = 2; // Taille maximum en Mo
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Conversion en octets

            if (file.size > maxSizeInBytes) {
                alert(`Le fichier est trop volumineux. La taille maximum est de ${maxSizeInMB} Mo.`);
                this.value = ''; // Réinitialiser l'input
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                logoUrl = e.target.result; // Stocker l'URL du logo

                // Créer un élément image temporaire pour obtenir les dimensions d'origine
                const img = new Image();
                img.src = logoUrl;
                img.onload = function () {
                    const originalWidth = img.width;
                    const originalHeight = img.height;

                    // Taille maximale dans le document
                    const maxWidth = 30;
                    const maxHeight = 30;

                    // Calcul des nouvelles dimensions en conservant les proportions
                    let width = originalWidth;
                    let height = originalHeight;

                    if (width > maxWidth || height > maxHeight) {
                        const widthRatio = maxWidth / width;
                        const heightRatio = maxHeight / height;
                        const minRatio = Math.min(widthRatio, heightRatio);
                        width = width * minRatio;
                        height = height * minRatio;
                    }

                    // Stocker les dimensions calculées
                    logoWidth = width;
                    logoHeight = height;
                };
            };
            reader.readAsDataURL(file);
        }
    });

    // Génération de la facture
    generateInvoiceButton.addEventListener('click', function () {
        const { totalHT, montantTVA, montantTTC, purchaseDetails } = calculateVAT();
        const companyName = document.getElementById('companyName').value;
        const adress = document.getElementById('adress').value;
        const postalCode = document.getElementById('postalCode').value;
        const mail = document.getElementById('mail').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const invoiceNumber = document.getElementById('invoiceNumber').value;
        const clientName = document.getElementById('clientName').value;
        const clientAdress = document.getElementById('clientAdress').value;
        const clientPostalCode = document.getElementById('clientPostalCode').value;
        const invoiceDate = document.getElementById('invoiceDate').value;
        const paymentDate = document.getElementById('paymentDate').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        const discountTerms = document.getElementById('discountTerms').value;
        const lateFees = document.getElementById('lateFees').value;
        const website = document.getElementById('website').value;
        const siret = document.getElementById('siret').value;
        const tvaNumber = document.getElementById('tvaNumber').value;
        const iban = document.getElementById('iban').value;

        if (!companyName || !adress || !postalCode || !mail || !phoneNumber || !invoiceNumber || !clientName || !clientAdress || !clientPostalCode || !invoiceDate || !paymentDate || !paymentMethod || !discountTerms || !lateFees || !website || !siret || !tvaNumber || !iban || purchaseDetails.length === 0) {
            alert('Veuillez remplir toutes les informations de la facture et ajouter au moins un achat.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Ajouter l'en-tête de la facture
        doc.setFontSize(16);
        doc.text("FACTURE", 105, 20, null, null, 'center');

        // Informations de l'entreprise
        doc.setFontSize(12);
        doc.text(companyName, 14, 30);
        doc.text(adress, 14, 35);
        doc.text(postalCode, 14, 40);
        doc.text(mail, 14, 45);
        doc.text(phoneNumber, 14, 50);
        if (logoUrl && logoWidth && logoHeight) {
            // Ajouter le logo à la position voulue avec les dimensions calculées
            doc.addImage(logoUrl, 'PNG', 170, 10, logoWidth, logoHeight);
        }

        // Numéro de facture
        doc.text("Numéro de facture : " + invoiceNumber, 14, 60);

        // Informations du client
        doc.text(clientName, 150, 60, null, null, 'right');
        doc.text(clientAdress, 150, 65, null, null, 'right');
        doc.text(clientPostalCode, 150, 70, null, null, 'right');
        doc.text("Réalisée le " + invoiceDate, 150, 80, null, null, 'right');

        // Détails de la facture
        const checkboxes = document.getElementById('cases').querySelectorAll('input[type="checkbox"]:checked');
        if (checkboxes.length !== 0) {
            const columns = ["Options sélectionnées"];
            const data = Array.from(checkboxes).map(checkbox => [checkbox.value]);

            doc.autoTable({
                startY: 90,
                head: [columns],
                body: data,
                theme: 'plain',
                headStyles: {
                    fillColor: [200, 200, 200],
                    textColor: [0, 0, 0],
                    fontStyle: 'bold'
                },
                columnStyles: {
                    0: { cellWidth: 'wrap' }
                },
                tableWidth: 'wrap',
                tableLineWidth: 0.1,
                tableLineColor: [0, 0, 0],
            });
        }

        const caseEnd = doc.lastAutoTable.finalY || 90;
        const tableColumn = ["Désignation", "Montant HT (€)"];
        const tableRows = purchaseDetails.map(item => [item.name, item.amount.toFixed(2)]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: caseEnd + 10,
            theme: 'grid',
            styles: { fontSize: 12 }
        });

        const finalY = doc.lastAutoTable.finalY || 120;
        doc.text("Total HT : " + totalHT.toFixed(2) + " €", 150, finalY + 10, null, null, 'right');
        doc.text("Total TVA : " + montantTVA.toFixed(2) + " €", 150, finalY + 20, null, null, 'right');
        doc.text("Total TTC : " + montantTTC.toFixed(2) + " €", 150, finalY + 30, null, null, 'right');

        // Informations de paiement
        const paymentDetailsBody = [
            ['Date de paiement limite: ' + paymentDate],
            ['Méthode de paiement : ' + paymentMethod],
            ['Conditions de remise : ' + discountTerms + '%'],
            ['Frais de retard : ' + lateFees + '%']
        ];

        doc.autoTable({
            startY: finalY + 40,
            head: [['Informations de paiements']],
            body: paymentDetailsBody,
            margin: { left: 10 },
            theme: 'grid',
            headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
            bodyStyles: { textColor: [0, 0, 0] },
            columnStyles: {
                0: { cellWidth: 'wrap' },
            },
            tableWidth: 'wrap',
        });

        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const end = pageHeight - 30;
        // Fonction pour centrer le texte
        function centerText(text, y) {
            const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const textX = (pageWidth - textWidth) / 2;
            doc.text(text, textX, y);
        }
        centerText("Site : " + website, end + 10);
        centerText("Siret : " + siret, end + 15);
        centerText("Numéro TVA : " + tvaNumber, end + 20);
        centerText("IBAN : " + iban, end + 25);

        // Télécharger la facture
        doc.save('facture_' + invoiceNumber + '.pdf');
    });
});