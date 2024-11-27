import React, { useState } from 'react';

const InvoiceDetails = ({ show, onClose, onSubmit }) => {

  const [formData, setFormData] = useState({
    companyName: '',
    adress: '',
    postalCode: '',
    mail: '',
    phoneNumber: '',
    invoiceNumber: '',
    logo: null,
    clientName: '',
    clientAdress: '',
    clientPostalCode: '',
    invoiceDate: '',
    paymentDate: '',
    paymentMethod: '',
    discountTerms: 0,
    lateFees: 0,
    location: false,
    liquidation: false,
    member: false,
    autofacturation: false,
    website: '',
    siret: '',
    tvaNumber: '',
    iban: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData); // Transmet les données au parent (Facture) pour générer le PDF
    onClose(); // Ferme le formulaire
  };

  return (
    <div id="invoiceDetails" style={{ display: show ? 'block' : 'none' }}>
      <h2>Détails de la facture</h2>

      <h3>Informations sur l'entreprise</h3>
      <form id="invoiceForm">
        <div>
          <label htmlFor="companyName">Nom de la société:</label>
          <input
            type="text"
            maxLength={50}
            id="companyName"
            name="companyName"
            placeholder="Votre entreprise"
            value={formData.companyName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="adress">Adresse:</label>
          <input
            type="text"
            maxLength={50}
            id="adress"
            name="adress"
            placeholder="Adresse de l'entreprise"
            value={formData.adress}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Code postal:</label>
          <input
            type="text"
            maxLength={6}
            id="postalCode"
            name="postalCode"
            placeholder="Code postal de l'entreprise"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="mail">Mail:</label>
          <input
            type="email"
            required pattern=".+@.+\\..+"
            maxLength={50}
            id="mail"
            name="mail"
            placeholder="example@mail.com"
            value={formData.mail}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Téléphone:</label>
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            maxLength={14} id="phoneNumber"
            name="phoneNumber"
            placeholder="01 23 45 67 89"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="invoiceNumber">Numéro de facture:</label>
          <input
            type="text"
            maxLength={15}
            id="invoiceNumber"
            name="invoiceNumber"
            placeholder="Numéro de facture"
            value={formData.invoiceNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="logo">Télécharger un logo (facultatif):</label>
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </div>

        <h3>Informations sur votre client</h3>
        <div>
          <label htmlFor="clientName">Nom du client:</label>
          <input
            type="text"
            maxLength={50}
            id="clientName"
            name="clientName"
            placeholder="Nom du client"
            value={formData.clientName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="clientAdress">Adresse du client:</label>
          <input
            type="text"
            maxLength={50}
            id="clientAdress"
            name="clientAdress"
            placeholder="Adresse du client"
            value={formData.clientAdress}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="clientPostalCode">Code postal du client:</label>
          <input
            type="text"
            maxLength={6}
            id="clientPostalCode"
            name="clientPostalCode"
            placeholder="Code postal du client"
            value={formData.clientPostalCode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="invoiceDate">Date:</label>
          <input
            type="date"
            id="invoiceDate"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={handleInputChange}
          />
        </div>
      </form>

      <h3>Conditions de règlement</h3>
      <form id="paymentForm">
        <div>
          <label htmlFor="paymentDate">Date de paiement limite:</label>
          <input
            type="date"
            id="paymentDate"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Mode de paiement:</label>
          <input
            type="text"
            maxLength={50}
            id="paymentMethod"
            name="paymentMethod"
            placeholder="Mode de paiement"
            value={formData.paymentMethod}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="discountTerms">Conditions d'escompte:</label>
          <input
            type="number"
            id="discountTerms"
            name="discountTerms"
            placeholder="Conditions d'escompte"
            step="0.1"
            min="0"
            max="100"
            value={formData.discountTerms}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lateFees">Taux des pénalités de retard:</label>
          <input
            type="number"
            id="lateFees"
            name="lateFees"
            placeholder="Taux des pénalités"
            step="0.1"
            min="0"
            max="100"
            value={formData.lateFees}
            onChange={handleInputChange}
          />
        </div>
      </form>

      <h3>Cas supplémentaires</h3>
      <form id="cases">
        <div>
          <input
            type="checkbox"
            id="location"
            name="location"
            value="Location gérance ou franchisé"
          />
          <label htmlFor="location">Location gérance ou franchisé</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="liquidation"
            name="liquidation"
            value="Société en liquidation"
          />
          <label htmlFor="liquidation">Société en liquidation</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="member"
            name="member"
            value="Membre d'un centre de gestion agrée"
          />
          <label htmlFor="member">Membre d'un centre de gestion agrée</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="autofacturation"
            name="autofacturation"
            value="Autofacturation"
          />
          <label htmlFor="autofacturation">Autofacturation</label>
        </div>
      </form>

      <h3>Informations complémentaires</h3>
      <form id="credits">
        <div>
          <label htmlFor="website">Site:</label>
          <input
            type="url"
            maxLength={50}
            id="website"
            name="website"
            placeholder="http://www.example.com/index.html"
            value={formData.website}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="siret">Siret:</label>
          <input
            type="text"
            maxLength={17}
            id="siret"
            name="siret"
            placeholder="362 521 879 00034"
            value={formData.siret}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="tvaNumber">Numéro TVA:</label>
          <input
            type="text"
            maxLength={15}
            id="tvaNumber"
            name="tvaNumber"
            placeholder="FR 32 123456789"
            value={formData.tvaNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="iban">IBAN:</label>
          <input
            type="text"
            maxLength={33}
            id="iban"
            name="iban"
            placeholder="FR14 2004 1010 0505 0001 3M02 606"
            value={formData.iban}
            onChange={handleInputChange}
          />
        </div>
      </form>

      <button type="button" onClick={handleSubmit}>Générer la facture</button>
      <button type="button" onClick={onClose}>Fermer</button>
    </div>
  );
};

export default InvoiceDetails;
