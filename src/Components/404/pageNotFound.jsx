import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pageNotFound.css';

const PageNotFound = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Retour à la page précédente dans l'historique
  };

  return (
    <div className="page-not-found">
      <h1>404</h1>
      <img
        src="/shadu.png"
        alt="Image not found"
        style={{ width: '250px', marginBottom: '30px' }}
      />
      <p>How did you get there</p>
      <a onClick={handleGoBack}>You should go back</a>
    </div>
  );
};

export default PageNotFound;
