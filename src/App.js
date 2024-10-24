import { useState } from 'react';
import AppRouter from './pages/AppRouter/AppRouter';
import AuthRouter from './pages/AuthRouter/AuthRouter';
import { Toaster } from 'react-hot-toast';
import { useLocalStorage } from 'react-use';

function App() {

    // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('token', null);


    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            {isAuthenticated ? <AppRouter/> : <AuthRouter/>}
        </div>
    );
}

export default App;