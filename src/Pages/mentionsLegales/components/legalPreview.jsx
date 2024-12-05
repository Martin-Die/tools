import React from "react";
import { Copy } from "lucide-react";
import legalContent from "./legalContent.json";

const LegalPreview = ({ formData }) => {

  const copyToClipboard = async () => {

    const requiredFields = [
      formData.companyName,
      formData.address,
      formData.email,
      formData.phone,
      formData.siren,
      formData.director,
      formData.host,
      formData.hostAddress
    ];

    // Vérifier si tous les champs sont remplis
    const missingFields = requiredFields.filter(field => !field);

    if (missingFields.length > 0) {
      alert("Veuillez remplir tous les champs avant de copier.");
      return; // Empêche la copie si des champs sont manquants
    }

    const text = document.getElementById("legal-text")?.innerText;
    if (text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Texte copié !");
      } catch (err) {
        alert("Erreur lors de la copie");
      }
      document.body.removeChild(textArea);
    } else {
      alert("Aucun texte à copier");
    }
  };

  let sectionNumber = 1; // Compteur pour les titres dynamiques

  return (
    <div>
      <div>
        <h2>Aperçu des mentions légales</h2>
        <button onClick={copyToClipboard}>
          <Copy size={18} />
          Copier
        </button>
      </div>

      <div id="legal-text">
        <h3>Mentions légales</h3>
        {legalContent.sections.map((section) => {
          const showSection = section.condition
            ? new Function("formData", `return ${section.condition}`)(formData)
            : true;

          if (!showSection) return null;

          return (
            <div key={section.id}>
              <h4>{sectionNumber++}. {section.title}</h4>
              {Array.isArray(section.content) ? (
                section.content.map((item, index) => (
                  <p key={index}>
                    {item.replace(/\{(.*?)\}/g, (_, key) => formData[key.trim()] || "")}
                  </p>
                ))
              ) : (
                <p>
                  {section.content.replace(/\{(.*?)\}/g, (_, key) => formData[key.trim()] || "")}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LegalPreview;
