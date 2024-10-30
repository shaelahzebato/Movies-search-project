import React from 'react'
import { useLocalStorage } from "@uidotdev/usehooks"; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function ModalSession() {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('token', null);
    
    return (
        <div>
            {!isAuthenticated && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Session Expirée</h2>
                        <p>Votre session a expiré. Veuillez vous reconnecter pour continuer.</p>
                        <Link to={"/signin"}>
                            <button 
                                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                                onClick={() => navigate('/signin')} //window.location.reload()
                                >
                                Se reconnecter
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalSession;