import { useState } from 'react';
import AppRouter from './pages/AppRouter/AppRouter';
import AuthRouter from './pages/AuthRouter/AuthRouter';

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));


    return (
        isAuthenticated ? <AppRouter/> : <AuthRouter/>
    );
}

export default App;