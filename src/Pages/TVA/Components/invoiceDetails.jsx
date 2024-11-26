import React from 'react';

const InvoiceDetails = ({ show, onClose }) => {
  return (
    <div id="invoiceDetails" style={{ display: show ? 'block' : 'none' }}>
      <h2>Détails de la facture</h2>
      
      <h3>Informations sur l'entreprise</h3>
      <form id="invoiceForm">
        <div>
          <label htmlFor="companyName">Nom de la société:</label>
          <input type="text" maxLength={50} id="companyName" name="companyName" placeholder="Votre entreprise" />
        </div>
        <div>
          <label htmlFor="adress">Adresse:</label>
          <input type="text" maxLength={50} id="adress" name="adress" placeholder="Adresse de l'entreprise" />
        </div>
        <div>
          <label htmlFor="postalCode">Code postal:</label>
          <input type="text" maxLength={6} id="postalCode" name="postalCode" placeholder="Code postal de l'entreprise" />
        </div>
        <div>
          <label htmlFor="mail">Mail:</label>
          <input type="email" required pattern=".+@.+\\..+" maxLength={50} id="mail" name="mail" placeholder="example@mail.com" />
        </div>
        <div>
          <label htmlFor="phoneNumber">Téléphone:</label>
          <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength={14} id="phoneNumber" name="phoneNumber" placeholder="01 23 45 67 89" />
        </div>
        <div>
          <label htmlFor="invoiceNumber">Numéro de facture:</label>
          <input type="text" maxLength={15} id="invoiceNumber" name="invoiceNumber" placeholder="Numéro de facture" />
        </div>
        <div>
          <label htmlFor="logo">Télécharger un logo (facultatif):</label>
          <input type="file" id="logo" accept="image/*" />
        </div>

        <h3>Informations sur votre client</h3>
        <div>
          <label htmlFor="clientName">Nom du client:</label>
          <input type="text" maxLength={50} id="clientName" name="clientName" placeholder="Nom du client" />
        </div>
        <div>
          <label htmlFor="clientAdress">Adresse du client:</label>
          <input type="text" maxLength={50} id="clientAdress" name="clientAdress" placeholder="Adresse du client" />
        </div>
        <div>
          <label htmlFor="clientPostalCode">Code postal du client:</label>
          <input type="text" maxLength={6} id="clientPostalCode" name="clientPostalCode" placeholder="Code postal du client" />
        </div>
        <div>
          <label htmlFor="invoiceDate">Date:</label>
          <input type="date" id="invoiceDate" name="invoiceDate" />
        </div>
      </form>

      <h3>Conditions de règlement</h3>
      <form id="paymentForm">
        <div>
          <label htmlFor="paymentDate">Date de paiement limite:</label>
          <input type="date" id="paymentDate" name="paymentDate" />
        </div>
        <div>
          <label htmlFor="paymentMethod">Mode de paiement:</label>
          <input type="text" maxLength={50} id="paymentMethod" name="paymentMethod" placeholder="Mode de paiement" />
        </div>
        <div>
          <label htmlFor="discountTerms">Conditions d'escompte:</label>
          <input type="number" id="discountTerms" name="discountTerms" placeholder="Conditions d'escompte" step="0.1" min="0" max="100" />
        </div>
        <div>
          <label htmlFor="lateFees">Taux des pénalités de retard:</label>
          <input type="number" id="lateFees" name="lateFees" placeholder="Taux des pénalités" step="0.1" min="0" max="100" />
        </div>
      </form>

      <h3>Cas supplémentaires</h3>
      <form id="cases">
        <div>
          <input type="checkbox" id="location" name="location" value="Location gérance ou franchisé" />
          <label htmlFor="location">Location gérance ou franchisé</label>
        </div>
        <div>
          <input type="checkbox" id="liquidation" name="liquidation" value="Société en liquidation" />
          <label htmlFor="liquidation">Société en liquidation</label>
        </div>
        <div>
          <input type="checkbox" id="member" name="member" value="Membre d'un centre de gestion agrée" />
          <label htmlFor="member">Membre d'un centre de gestion agrée</label>
        </div>
        <div>
          <input type="checkbox" id="autofacturation" name="autofacturation" value="Autofacturation" />
          <label htmlFor="autofacturation">Autofacturation</label>
        </div>
      </form>

      <h3>Informations complémentaires</h3>
      <form id="credits">
        <div>
          <label htmlFor="website">Site:</label>
          <input type="url" maxLength={50} id="website" name="website" placeholder="http://www.example.com/index.html" />
        </div>
        <div>
          <label htmlFor="siret">Siret:</label>
          <input type="text" maxLength={17} id="siret" name="siret" placeholder="362 521 879 00034" />
        </div>
        <div>
          <label htmlFor="tvaNumber">Numéro TVA:</label>
          <input type="text" maxLength={15} id="tvaNumber" name="tvaNumber" placeholder="FR 32 123456789" />
        </div>
        <div>
          <label htmlFor="iban">IBAN:</label>
          <input type="text" maxLength={33} id="iban" name="iban" placeholder="FR14 2004 1010 0505 0001 3M02 606" />
        </div>
      </form>

      <button type="button" onClick={onClose}>Fermer</button>
    </div>
  );
};

export default InvoiceDetails;
