import React, { useState } from 'react';

export default function FormInput() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  // Fonction de validation (simple exemple)
  const validateInput = () => {
    if (inputValue === '') {
      setError(true);
      // Retirer l'erreur après un délai pour enlever l'effet de tremblement
      setTimeout(() => {
        setError(false);
      }, 500); // Effet de tremblement dure 500ms
    } else {
      setError(false);
      // Envoyer le formulaire ou autre logique
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Saisis quelque chose"
        className={`border p-2 rounded-md outline-none transition-all duration-300
          ${error ? 'border-red-500 animate-shake' : 'border-gray-300'}`}
      />
      <button
        onClick={validateInput}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Valider
      </button>
    </div>
  );
}


/**
 * // tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};

 */