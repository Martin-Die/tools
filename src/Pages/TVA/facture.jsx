import React, { useState, useEffect } from 'react';
import PurchaseList from './Components/purchaseList';
import RegionSelector from './Components/regionSelector';
import InvoiceDetails from './Components/invoiceDetails';
import Results from './Components/results';
import generateInvoice from './Components/generate';
import './facture.css';

const Facture = () => {
  const [purchases, setPurchases] = useState([{ name: '', amount: '' }]);
  const [region, setRegion] = useState('France Métropolitaine');
  const [tva, setTva] = useState('');
  const [customRate, setCustomRate] = useState('');
  const [showCustomRate, setShowCustomRate] = useState(false);
  const [results, setResults] = useState({ montantTVA: '', montantTTC: '' });
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);

  const calculateVAT = (currentPurchases, currentTva, currentCustomRate) => {
    const totalHT = currentPurchases.reduce(
      (sum, purchase) => sum + parseFloat(purchase.amount || 0),
      0
    );
    const tauxTVA = currentTva === 'custom' ? parseFloat(currentCustomRate) : parseFloat(currentTva);
    if (isNaN(totalHT) || isNaN(tauxTVA)) {
      setResults({ montantTVA: '', montantTTC: '' });
      return;
    }
    const montantTVA = totalHT * tauxTVA / 100;
    const montantTTC = totalHT + montantTVA;
    setResults({ montantTVA: montantTVA.toFixed(2), montantTTC: montantTTC.toFixed(2) });
  };


  useEffect(() => {
    if (tva) {
      calculateVAT(purchases, tva, customRate);
    }
  }, [purchases, tva, customRate]);

  const handlePurchaseChange = (index, field, value) => {
    if (field === 'add') {
      setPurchases((prevPurchases) => [
        ...prevPurchases,
        { name: '', amount: '' },
      ]);
    } else {
      const updatedPurchases = [...purchases];
      updatedPurchases[index][field] = value;
      setPurchases(updatedPurchases);
    }
  };

  const handleRemovePurchase = (index) => {
    const updatedPurchases = purchases.filter((_, i) => i !== index);
    setPurchases(updatedPurchases);
  };

  const handleFormSubmit = (invoiceData) => {
    const purchaseDetails = purchases.map((purchase) => ({
      name: purchase.name,
      amount: parseFloat(purchase.amount) || 0,
    }));
    const totalHT = purchases.reduce(
      (sum, purchase) => sum + parseFloat(purchase.amount || 0),
      0
    );

    const finalInvoiceData = {
      ...invoiceData,
      purchaseDetails,
      totalHT,
      montantTVA: parseFloat(results.montantTVA) || 0,
      montantTTC: parseFloat(results.montantTTC) || 0,
    };

    generateInvoice(finalInvoiceData);
  };

  return (
    <div>
      <h1>Calculez le montant TTC de votre facture</h1>
      <form id="vatForm">
        {/* Composant pour la liste des achats */}
        <PurchaseList
          purchases={purchases}
          onPurchaseChange={handlePurchaseChange}
          onRemovePurchase={handleRemovePurchase}
        />
        {/* Composant pour sélectionner la région et le taux de TVA */}
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
      {/* Composant pour afficher les résultats */}
      <Results results={results} />
      {!showInvoiceDetails && (
        <button
          type="button"
          onClick={() => setShowInvoiceDetails(true)}
        >
          Créer cette facture
        </button>
      )}
      {/* Composant pour afficher les détails de la facture */}
      {showInvoiceDetails && (
        <InvoiceDetails
          show={showInvoiceDetails}
          onClose={() => setShowInvoiceDetails(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Facture;
