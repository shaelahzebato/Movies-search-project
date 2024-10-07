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

//Petite fonction d'ajout au panier
// const addToCart = (movieId) => {
//     // Trouvez le film correspondant avec movieId
//     if (movieDetails?.id === movieId) {
//         setCart([...cart, movieDetails]);
//         toast.success(`${movieDetails.title} a été ajouté au panier`);
//     }
// };

// const addToCart = (movieId) => {
//     // Trouvez le film correspondant avec movieId
//     const movie = movieFetchData.find(movie => movie.id === movieId);
//     if (movie) {
//         setCart([...cart, movie]);
//         toast.success(`${movie.title} a été ajouté au panier`);
//     }
// };