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


                                                    {/* {btn ? (
                                                        <div className="flex items-center gap-1 h-full">
                                                            <button> */}
                                                                {/* {quantity === 1 ? */}
                                                                    {/* <button>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white transition duration-300 ease-in-out">
                                                                        <path d="M9 3H7.5a1.5 1.5 0 0 0-1.5 1.5v.75H3.75a.75.75 0 0 0 0 1.5H5v12A2.25 2.25 0 0 0 7.25 21.75h9.5A2.25 2.25 0 0 0 19 19.5V7.5h1.25a.75.75 0 0 0 0-1.5H18v-.75A1.5 1.5 0 0 0 16.5 3H15V1.5A1.5 1.5 0 0 0 13.5 0h-3A1.5 1.5 0 0 0 9 1.5V3Zm1.5-1.5h3V3h-3V1.5Zm-3 6.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-9Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-9Z"/>
                                                                        </svg>
                                                                    </button> */}
                                                                
                                                                {/* :
                                                                    <FontAwesomeIcon className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" icon={faMinus}/>    
                                                                } */}
                                                            {/* </button>
                                                            <input type="text" className="border-y border-x border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[34px] min-w-[24px] placeholder:text-gray-900  text-center bg-transparent" value="1"/>
                                                            <button>
                                                                <FontAwesomeIcon icon={faPlus}/>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <FontAwesomeIcon icon={faPlus}/>
                                                            <span>Panier</span>
                                                        </div>     
                                                    )} */}