import React, { useEffect } from 'react';

const RegionSelector = ({ region, setRegion, tva, setTva, showCustomRate, setShowCustomRate, customRate, setCustomRate }) => {
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

  useEffect(() => {
    setTva(vatRates[region][0].rate);
    setShowCustomRate(false);
  }, [region]);

  return (
    <div>
      <label htmlFor="region">Région:</label>
      <select id="region" value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="France Métropolitaine">France Métropolitaine</option>
        <option value="DROM">DROM</option>
        <option value="Corse">Corse</option>
      </select>

      <label htmlFor="tauxTVA">Taux de TVA applicable:</label>
      <select id="tauxTVA" value={tva} onChange={(e) => {
        setTva(e.target.value);
        setShowCustomRate(e.target.value === 'custom');
      }}>
        {vatRates[region].map(rateObj => (
          <option key={rateObj.name} value={rateObj.rate}>
            {rateObj.name}
          </option>
        ))}
      </select>

      {showCustomRate && (
        <div id="customRateDiv">
          <label htmlFor="customRate">Taux personnalisé (%):</label>
          <input
            type="number"
            id="customRate"
            step="0.1"
            min="0"
            max="100"
            value={customRate}
            onChange={(e) => setCustomRate(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default RegionSelector;