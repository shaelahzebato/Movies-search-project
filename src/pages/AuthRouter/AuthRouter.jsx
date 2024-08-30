import { Routes, Route, Navigate } from 'react-router-dom'
import MovieHomePage from '../AppRouter/MoviesHomePage';
import SignIn from './SignIn';
import SignUp from './SignUp';

function AuthRouter() {

    return (
        <Routes>
            <Route path='/' element={<MovieHomePage/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/*' element={<Navigate replace to="/"/>}/>
        </Routes>
    );
}

export default AuthRouter