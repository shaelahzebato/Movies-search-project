import AppRouter from './pages/AppRouter/AppRouter';
import AuthRouter from './pages/AuthRouter/AuthRouter';
import toast, { Toaster } from 'react-hot-toast';
import { useLocalStorage } from "@uidotdev/usehooks"; 
import { useEffect } from 'react';

function App() {

    // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('token', null);

    const [token, setToken] = useLocalStorage('token', null);
    
    useEffect(() => {
        // Vérifier l'expiration de la session
        const checkSessionExpiration = () => {
            const tokenExpiryTime = localStorage.getItem('tokenExpiry');
            const currentTime = Date.now();

            if (tokenExpiryTime && currentTime > tokenExpiryTime) {
                // Si la session est expirée
                handleSessionExpired();
            }
        };

        // Fonction de déconnexion lorsque la session est expirée
        const handleSessionExpired = () => {
            setToken(null);
            setIsAuthenticated(false);
            toast.error('Votre session a expiré. Veuillez vous reconnecter.', { duration: 5000 });
        };

        // Vérifier l'expiration toutes les 5 minutes
        const interval = setInterval(checkSessionExpiration, 5 * 60 * 1000); // 5 minutes

        return () => clearInterval(interval); // Nettoyage lors du démontage
    }, [token, setToken]);



    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            {isAuthenticated ? <AppRouter/> : <AuthRouter/>}
        </div>
    );
}

export default App;