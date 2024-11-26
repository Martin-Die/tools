import React, { useState, useEffect } from 'react';
import PurchaseList from './Components/purchaseList';
import RegionSelector from './Components/regionSelector';
import InvoiceDetails from './Components/invoiceDetails';
import Results from './Components/results';
import './facture.css';

const Facture = () => {
  const [purchases, setPurchases] = useState([{ name: '', amount: '' }]);
  const [region, setRegion] = useState('France Métropolitaine');
  const [tva, setTva] = useState('');
  const [customRate, setCustomRate] = useState('');
  const [showCustomRate, setShowCustomRate] = useState(false);
  const [results, setResults] = useState({ montantTVA: '', montantTTC: '' });
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);

  const handlePurchaseChange = (index, field, value) => {
    if (field === 'add') {
      setPurchases([...purchases, { name: '', amount: '' }]);
    } else {
      const newPurchases = [...purchases];
      newPurchases[index][field] = value;
      setPurchases(newPurchases);
    }
  };

  const handleRemovePurchase = (index) => {
    const newPurchases = purchases.filter((_, i) => i !== index);
    setPurchases(newPurchases);
  };

  useEffect(() => {
    calculateVAT();
  }, [purchases, tva, customRate]);

  const calculateVAT = () => {
    let totalHT = purchases.reduce((sum, purchase) => sum + parseFloat(purchase.amount || 0), 0);
    let tauxTVA = tva === 'custom' ? parseFloat(customRate) : parseFloat(tva);
    if (isNaN(totalHT) || isNaN(tauxTVA)) {
      setResults({ montantTVA: '', montantTTC: '' });
      return;
    }
    const montantTVA = totalHT * tauxTVA / 100;
    const montantTTC = totalHT + montantTVA;
    setResults({ montantTVA: montantTVA.toFixed(2), montantTTC: montantTTC.toFixed(2) });
  };

  const handleCreateInvoice = () => {
    // Logique pour générer le PDF ici
    // Vous pouvez utiliser jsPDF pour créer le PDF
    console.log("Générer la facture PDF...");
  };

  return (
    <div>
      <h1>Calculez le montant TTC de votre facture</h1>
      <form id="vatForm">
        <PurchaseList 
          purchases={purchases} 
          onPurchaseChange={handlePurchaseChange} 
          onRemovePurchase={handleRemovePurchase} 
        />
        <RegionSelector 
          region={region} 
          setRegion={setRegion} 
          tva={tva} 
          setTva={setTva} 
          showCustomRate={showCustomRate} 
          setShowCustomRate={setShowCustomRate} 
          customRate={customRate} 
          setCustomRate={setCustomRate} 
        />
      </form>
      <Results results={results} />
      <button type="button" id="createInvoiceButton" onClick={() => setShowInvoiceDetails(true)}>
        Créer cette facture
      </button>

      {/* Affichage des détails de la facture */}
      <InvoiceDetails show={showInvoiceDetails} onClose={() => setShowInvoiceDetails(false)} />
      
      {/* Bouton pour générer le PDF */}
      {showInvoiceDetails && (
        <button type="button" id="generateInvoiceButton" onClick={handleCreateInvoice}>
          Générer le PDF
        </button>
      )}
    </div>
  );
};

export default Facture;