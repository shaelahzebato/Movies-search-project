import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/AuthRouter/SignIn';
import SignUp from './pages/AuthRouter/SignUp';
import MoviesHomePage from './pages/AppRouter/MoviesHomePage';
import MoviesShoppingCartPage from './pages/AppRouter/MoviesShoppingCartPage';
import MoviesSearchResultsPage from './pages/AppRouter/MoviesSearchResultsPage';
import MovieDetailsPage from './pages/AppRouter/MovieDetailsPage';
import UserAccountPage from './pages/AppRouter/UserAccountPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<MoviesHomePage/>}/>
                <Route path='/movies-results' element={<MoviesSearchResultsPage/>}/>
                <Route path='/movie-details' element={<MovieDetailsPage/>}/>
                <Route path='/movies-shopping-cart' element={<MoviesShoppingCartPage/>}/>
                <Route path='/my-account' element={<UserAccountPage/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
            </Routes>
        </div>
    );
}

export default App;
