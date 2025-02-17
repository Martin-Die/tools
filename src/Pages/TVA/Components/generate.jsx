'use strict';

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Générateur de facture.
 * @param {Object} invoiceData - Les données nécessaires pour générer la facture.
 */
async function generateInvoice(invoiceData) {

    // Création du document PDF
    const doc = new jsPDF();

    // En-tête
    doc.setFontSize(16);
    doc.text("FACTURE", 105, 20, null, null, 'center');

    // Logo (optionnel)
    const { logo } = invoiceData;
    if (logo) {
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                const width = 30;
                const height = width / aspectRatio;
                doc.addImage(logo, 'PNG', 170, 10, width, height);
                resolve();
            };
            img.onerror = reject;
            img.src = logo;
        });
    }

    // Informations de l'entreprise
    doc.setFontSize(12);
    const { companyName, adress, postalCode, mail, phoneNumber } = invoiceData;
    doc.text(companyName, 14, 30);
    doc.text(adress, 14, 35);
    doc.text(postalCode, 14, 40);
    doc.text(mail, 14, 45);
    doc.text(phoneNumber, 14, 50);

    // Numéro de facture et informations client
    const { invoiceNumber, clientName, clientAdress, clientPostalCode, invoiceDate } = invoiceData;
    doc.text("Numéro de facture : " + invoiceNumber, 14, 60);
    doc.text(clientName, 150, 60, null, null, 'right');
    doc.text(clientAdress, 150, 65, null, null, 'right');
    doc.text(clientPostalCode, 150, 70, null, null, 'right');
    doc.text("Réalisée le " + invoiceDate, 150, 80, null, null, 'right');

    // Tableau des achats
    const { purchaseDetails, totalHT, montantTVA, montantTTC } = invoiceData;
    const tableColumn = ["Désignation", "Montant HT (€)"];
    const tableRows = purchaseDetails.map(item => [item.name, item.amount.toFixed(2)]);

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 90,
        theme: 'grid',
        styles: { fontSize: 12 }
    });

    const finalY = doc.lastAutoTable.finalY || 120;
    doc.text("Total HT : " + totalHT.toFixed(2) + " €", 150, finalY + 10, null, null, 'right');
    doc.text("Total TVA : " + montantTVA.toFixed(2) + " €", 150, finalY + 20, null, null, 'right');
    doc.text("Total TTC : " + montantTTC.toFixed(2) + " €", 150, finalY + 30, null, null, 'right');

    // Informations de paiement
    const { paymentDate, paymentMethod, discountTerms, lateFees } = invoiceData;
    const paymentDetailsBody = [
        ['Date de paiement limite: ' + paymentDate],
        ['Méthode de paiement : ' + paymentMethod],
        ['Conditions de remise : ' + discountTerms + '%'],
        ['Frais de retard : ' + lateFees + '%']
    ];

    autoTable(doc, {
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

    // Cas supplémentaires
    const additionalCases = [];
    if (invoiceData.location) additionalCases.push("Location gérance ou franchisé");
    if (invoiceData.liquidation) additionalCases.push("Société en liquidation");
    if (invoiceData.member) additionalCases.push("Membre d'un centre de gestion agrée");
    if (invoiceData.autofacturation) additionalCases.push("Autofacturation");

    if (additionalCases.length > 0) {
        const casesYStart = doc.lastAutoTable.finalY + 20; // Position après les informations de paiement
        doc.text("Cas supplémentaires :", 14, casesYStart);

        additionalCases.forEach((caseText, index) => {
            doc.text("- " + caseText, 20, casesYStart + 10 + (index * 6));
        });
    }

    // Pied de page
    const { website, siret, tvaNumber, iban } = invoiceData;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const end = pageHeight - 30;

    function centerText(text, y) {
        const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, y);
    }
    centerText("Site : " + website, end + 10);
    centerText("Siret : " + siret, end + 15);
    centerText("Numéro TVA : " + tvaNumber, end + 20);
    centerText("IBAN : " + iban, end + 25);

    // Téléchargement de la facture
    doc.save('facture_' + invoiceNumber + '.pdf');
}

export default generateInvoice;