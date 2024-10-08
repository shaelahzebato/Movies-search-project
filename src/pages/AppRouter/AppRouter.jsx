import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MovieHomePage from './MoviesHomePage';
import MovieSearchResultsPage from './MoviesSearchResultsPage';
import MovieDetailsPage from './MovieDetailsPage';
import MovieShoppingCartPage from './MoviesShoppingCartPage';
import UserProfilePage from './UserProfilePage';

function AppRouter() {

    return (
        <Routes>
            <Route path='/' element={<MovieHomePage/>}/>
            <Route path='/movies-results' element={<MovieSearchResultsPage/>}/>
            <Route path='/movie-details' element={<MovieDetailsPage/>}/>
            <Route path='/movies-shopping-cart' element={<MovieShoppingCartPage/>}/>
            <Route path='/profile' element={<UserProfilePage/>}/>
            <Route path='/*' element={<Navigate replace to="/" />} />
        </Routes>
    );
}

export default AppRouter