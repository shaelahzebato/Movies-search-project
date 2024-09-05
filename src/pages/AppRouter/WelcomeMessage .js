import React, { useState, useEffect } from 'react';

const WelcomeMessage = () => {
  // State pour gérer l'affichage du message de bienvenue
  const [showMessage, setShowMessage] = useState(true);

  // Utilisation de useEffect pour créer un timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);  // Masque le message après 3 secondes
    }, 3000);

    // Nettoyage du timer pour éviter les fuites de mémoire
    return () => clearTimeout(timer);
  }, []); // [] signifie que l'effet s'exécute une seule fois après le premier rendu

  return (
    <div>
      {showMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p>Bienvenue sur notre site !</p>
        </div>
      )}
    </div>
  );
};

export default WelcomeMessage;