import React, { useState } from 'react';
import homepagebg from '../../images/accueil–1.png';
import NavBar from '../../components/NavBar/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

function MovieHomePage() {
    const [movieTitle, setMovieTitle] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [errors, setErrors] = useState({ movieTitle: '' });

    const handleInputChange = (e) => {
        setMovieTitle(e.target.value);
    };

    const handleMovieSearch = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!isAuthenticated) {
            toast.error('Veuillez vous connecter ou créer un compte pour effectuer cette opération !');
        } else if (!movieTitle) {
            newErrors.movieTitle = "Le nom d'un film est requis.";
            setErrors(newErrors);
        } else if (movieTitle.length < 3) {
            newErrors.movieTitle = "Le nom d'un film doit contenir au moins 3 caractères.";
            setErrors(newErrors);
        } else {
            window.location.href = `/movies-results?name=${movieTitle}`;
        }
    };

    return (
        <div className="min-h-screen bg-center bg-cover" style={{ backgroundImage: `url(${homepagebg})` }}>
            <NavBar />
            <div className="max-md:w-full fixed left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center gap-10
                top-[40%] md:top-1/2 md:-translate-y-1/2 ">
                <h1 className="text-white text-3xl lg:text-4xl flex flex-col items-center justify-center gap-2">
                    <p className="text-center">Bienvenue sur <strong className="text-orange-500">BoxFun...</strong></p>
                    <p className="text-center">Recherchez vos films, des plus époustouflants</p>
                    <p className="text-center">ici <FontAwesomeIcon className="text-orange-500 font-semibold" icon={faAngleDoubleDown} />!</p>
                </h1>
                <form onSubmit={handleMovieSearch} className="w-full mx-auto px-4 max-md:bg-red-600">
                    <div className="flex flex-col gap-2">
                        {errors.movieTitle && <p className="text-red-500 text-xs italic">{errors.movieTitle}</p>}
                        <input
                            type="text"
                            value={movieTitle}
                            onChange={handleInputChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Entrez le nom d'un film..."
                        />
                        <button
                            type="submit"
                            className="transform transition duration-300 bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-700 text-lg border-4 text-white py-2.5 px-2 rounded font-semibold text-center"
                        >
                            Rechercher
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MovieHomePage;









// import React, { useEffect, useState } from 'react'

// import homepagebg from '../../images/accueil–1.png'
// import NavBar from '../../components/NavBar/NavBar'
// import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
// import toast from 'react-hot-toast'


// function MovieHomePage() {

//     const [movieNameEntered, setMovieNameEntered] = useState("");
 
//     const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

//     const [errors, setErrors] = useState({
//         moviename: ""
//     });

    
//     const handleChange = (e) => {
//         console.log(e.target.value);
//         setMovieNameEntered(e.target.value)
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//     }

//     const userIsActive = (e) => {
//         e.preventDefault()
        
//         let newErrors = {};

//         if(!isAuthenticated) {
//             toast.error("Veuillez vous connecter ou créer un compte pour effectuer cette opération !")
//         }
//         else if(isAuthenticated && !movieNameEntered) {
//             newErrors.moviename = "Le nom d'un film est requis.";
//             setErrors(newErrors);
//         }
//         else if(isAuthenticated && movieNameEntered.length < 3) {
//             newErrors.moviename = "Le nom d'un film doit contenir au moins 3 caractères.";
//             setErrors(newErrors);
//         }
//         else if(isAuthenticated && movieNameEntered.length >= 3) {
//             window.location.href = `/movies-results?name=${movieNameEntered}`;
//         }
//     }

    
   
    
//     return (
//         <div className='min-h-screen bg-center bg-cover' style={{backgroundImage:`url(${homepagebg})`}}>
//             <NavBar/>
//             {/*  md:top-[26%] */}
//             <div className="max-md:w-full fixed top-[40%] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center gap-10">
//                 <h1 className='text-white text-3xl lg:text-4xl flex flex-col items-center justify-center gap-2'>
//                     <p className='text-center'>Bienvenue sur <strong className='text-orange-500'>BoxFun...</strong></p>
//                     <p className='text-center'>Recherchez vos films, des plus epoustouflants</p>
//                     <p className='text-center'>ici <FontAwesomeIcon className='text-orange-500 font-semibold' icon={faAngleDoubleDown}/>!</p>
//                 </h1>
//                 <form onSubmit={e => handleSubmit(e)} className="w-full mx-auto px-4 max-md:bg-red-600">
//                     <div className="flex flex-col gap-2">
//                         {errors.moviename && <p className="text-red-500 text-xs italic">{errors.moviename}</p>}
//                         <input type="text" value={movieNameEntered} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Entrez le nom d'un film..."/>
//                         <button onClick={(e) => userIsActive(e)} className='flex-shrink-0 transform transition duration-300 bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-700 text-lg border-4 text-white py-2.5 px-2 rounded text-center font-semibold'>Rechercher</button>
//                         {/* <Link onClick={() => userIsActive()} to={`/movies-results?name=${movieNameEntered}`} className='flex-shrink-0 transform transition duration-300 bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-700 text-lg border-4 text-white py-2.5 px-2 rounded text-center font-semibold'>Rechercher</Link> */}
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default MovieHomePage;