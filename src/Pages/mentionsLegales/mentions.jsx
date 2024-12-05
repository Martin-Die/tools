import React, { useState } from 'react';
import LegalForm from "./components/legalForm";
import LegalPreview from "./components/legalPreview";
import './mentions.css';

const Mentions = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    email: "",
    phone: "",
    siren: "",
    director: "",
    host: "",
    hostAddress: "",
  });

  return (
    <main className='mentions'>
      <h1>Générateur de mentions légales</h1>
      <div className="container">
        <div className="form-container">
          <LegalForm formData={formData} setFormData={setFormData} />
        </div>
        <div className="preview-container">
          <LegalPreview formData={formData} />
        </div>
      </div>
    </main>
  );
};

export default Mentions;