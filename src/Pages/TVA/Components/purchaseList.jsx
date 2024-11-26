import React from 'react';

const PurchaseList = ({ purchases, onPurchaseChange, onRemovePurchase }) => {
  return (
    <div id="purchases">
      {purchases.map((purchase, index) => (
        <div key={index} className="purchase">
          <input
            type="text"
            maxLength={30}
            placeholder="Nom de l'achat"
            value={purchase.name}
            onChange={(e) => onPurchaseChange(index, 'name', e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            min="0"
            max="99999"
            placeholder="Montant HT"
            value={purchase.amount}
            onChange={(e) => onPurchaseChange(index, 'amount', e.target.value)}
          />
          {index > 0 && ( // Ne pas afficher le bouton pour le premier achat
            <button type="button" className="removePurchase" onClick={() => onRemovePurchase(index)}>
              Supprimer
            </button>
          )}
        </div>
      ))}
      <button type="button" id="addPurchase" onClick={() => onPurchaseChange(purchases.length, 'add', '')}>
        Ajouter un achat
      </button>
    </div>
  );
};

export default PurchaseList;