import { useState } from 'react';
import AppRouter from './pages/AppRouter/AppRouter';
import AuthRouter from './pages/AuthRouter/AuthRouter';
import { Toaster } from 'react-hot-toast';

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));


    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            {isAuthenticated ? <AppRouter/> : <AuthRouter/>}
        </div>
    );
}

export default App;