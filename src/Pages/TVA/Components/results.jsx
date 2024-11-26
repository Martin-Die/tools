import React from 'react';

const Results = ({ results }) => {
  return (
    <div id="results">
      <p>Montant de la TVA : <span>{results.montantTVA}</span></p>
      <p>Montant de la facture (TTC) : <span>{results.montantTTC}</span></p>
    </div>
  );
};

export default Results;