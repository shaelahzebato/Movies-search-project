// App.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRouter from './pages/AppRouter/AppRouter';
import AuthRouter from './pages/AuthRouter/AuthRouter';
import toast, { Toaster } from 'react-hot-toast';
import { useLocalStorage } from "@uidotdev/usehooks";

// Modal pour informer de la fin de session
function ModalSessionExpired({ onReconnect }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">Session Expirée</h2>
                <p className="mb-4">Votre session a expiré. Veuillez vous reconnecter.</p>
                <button
                    onClick={onReconnect}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                    Se reconnecter
                </button>
            </div>
        </div>
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('token', null);
    const [expiresAt, setExpiresAt] = useLocalStorage('expires_at', null);
    const [sessionExpired, setSessionExpired] = useState(false);
    const navigate = useNavigate();

    // Fonction pour rafraîchir le token
    const refreshToken = async () => {
        try {
            const response = await fetch('https://symbian.stvffmn.com/nady/public/api/v1/refresh-token', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${isAuthenticated}`,
                    'Accept': 'application/json',
                }
            });
            const data = await response.json();
            console.log("datadata : ", data);
            console.log("datadata newToken : ", data.newToken);
            
            if (response.ok) {
                // Mettre à jour le token et l'expiration
                setIsAuthenticated(data.newToken);
                setExpiresAt(data.expires_at);
                toast.success("Session prolongée avec succès.");
            } else {
                // Si le rafraîchissement échoue, expirer la session
                handleSessionExpiration();
            }
        } catch (error) {
            console.error("Erreur lors du rafraîchissement du token:", error);
            handleSessionExpiration();
        }
    };

    // Fonction appelée pour expirer la session
    const handleSessionExpiration = () => {
        setSessionExpired(true);
        setIsAuthenticated(null);
        setExpiresAt(null);
        toast.error("Votre session a expiré, veuillez vous reconnecter.");
    };

    // Fonction pour reconnecter l'utilisateur et rediriger vers /signin
    const handleReconnect = () => {
        setSessionExpired(false);
        setIsAuthenticated(null);
        navigate('/signin');  // Redirection vers /signin
    };

    // Gestion de l'expiration et du rafraîchissement du token
    useEffect(() => {
        let timer, refreshTimer;

        if (isAuthenticated && expiresAt) {
            const expirationTime = new Date(expiresAt).getTime() - Date.now();
            const refreshTime = expirationTime - 5 * 60 * 1000; // Rafraîchissement 5 minutes avant expiration
            
            // Configurer le timer de rafraîchissement
            if (refreshTime > 0) {
                refreshTimer = setTimeout(() => {
                    refreshToken();
                }, refreshTime);
            }

            // Configurer le timer de déconnexion
            timer = setTimeout(() => {
                handleSessionExpiration();
            }, expirationTime);
        }
        
        // Nettoyer les timers lorsque le composant se démonte ou que l'état change
        return () => {
            clearTimeout(timer);
            clearTimeout(refreshTimer);
        };
    }, [isAuthenticated, expiresAt]);

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            {sessionExpired && <ModalSessionExpired onReconnect={handleReconnect} />}
            {isAuthenticated ? <AppRouter /> : <AuthRouter />}
        </div>
    );
}

export default App;

/**
//App.js

import { useEffect, useState } from 'react';
import AppRouter from './pages/AppRouter/AppRouter';
import AuthRouter from './pages/AuthRouter/AuthRouter';
import toast, { Toaster } from 'react-hot-toast';
import { useLocalStorage } from "@uidotdev/usehooks";

// Modal pour informer de la fin de session
function ModalSessionExpired({ onReconnect }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">Session Expirée</h2>
                <p className="mb-4">Votre session a expiré. Veuillez vous reconnecter.</p>
                <button onClick={onReconnect} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Se reconnecter
                </button>
            </div>
        </div>
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('token', null);
    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        let timer;

        if (isAuthenticated) {
            // Démarrer un timer de 15 minutes (900000 ms)
            timer = setTimeout(() => {
                // Expirer la session et afficher le modal
                setSessionExpired(true);
                setIsAuthenticated(null); // Déconnecter l'utilisateur
                toast.error("Votre session a expiré, veuillez vous reconnecter.");
            }, 900000); // 15 minutes

            // Nettoyer le timer en cas de déconnexion
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, setIsAuthenticated]);

    // Fonction pour reconnecter l'utilisateur
    const handleReconnect = () => {
        setSessionExpired(false);
        setIsAuthenticated(null); // Redirection automatique au composant AuthRouter
    };

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            {sessionExpired && <ModalSessionExpired onReconnect={handleReconnect} />}
            {isAuthenticated ? <AppRouter /> : <AuthRouter />}
        </div>
    );
}

export default App;
 */