import React, { useState } from 'react';
import { Copy } from "lucide-react";

const LegalPreview = ({ formData }) => {
  const [copyMessage, setCopyMessage] = useState("");

  const copyToClipboard = async () => {
    const text = document.getElementById("legal-text")?.innerText;
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        alert("Texte copié");
      } catch (err) {
        setCopyMessage("Erreur lors de la copie");
      }
    }
  };

  return (
    <div>
      <div>
        <h2>Aperçu des mentions légales</h2>
        <button onClick={copyToClipboard}>
          <Copy size={18} />
          Copier
        </button>
      </div>

      {copyMessage && <div>{copyMessage}</div>}

      <div id="legal-text">
        <h3>Mentions légales</h3>
        {formData.companyName && (
          <>
            <h4>1. Présentation du site</h4>
            <p>
              En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site {formData.companyName} l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
            </p>
          </>
        )}
        {formData.director && (
          <>
            <h4>2. Directeur de publication</h4>
            <p>Le directeur de publication est : {formData.director}</p>
          </>
        )}
        {formData.companyName || formData.address || formData.siren ? (
          <>
            <h4>3. Informations légales</h4>
            {formData.companyName && <p>Raison sociale : {formData.companyName}</p>}
            {formData.address && <p>Adresse : {formData.address}</p>}
            {formData.siren && <p>SIREN : {formData.siren}</p>}
          </>
        ) : null}
        {formData.email || formData.phone ? (
          <>
            <h4>4. Contact</h4>
            {formData.email && <p>Email : {formData.email}</p>}
            {formData.phone && <p>Téléphone : {formData.phone}</p>}
          </>
        ) : null}
        {formData.host || formData.hostAddress ? (
          <>
            <h4>5. Hébergement</h4>
            {formData.host && <p>Le site est hébergé par : {formData.host}</p>}
            {formData.hostAddress && <p>Adresse : {formData.hostAddress}</p>}
          </>
        ) : null}
        <h4>6. Propriété intellectuelle</h4>
        <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
        <h4>7. Données personnelles</h4>
        <p>Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données.</p>
      </div>
    </div>
  );
};

export default LegalPreview;