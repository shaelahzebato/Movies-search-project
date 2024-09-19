import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

import searchImg from '../../images/Resultats-de-recherche–1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../../components/NavBar/NavBar';


function MovieSearchResultsPage() {
    
    const [searchParams] = useSearchParams();
    
    const name = searchParams.get('name');

    const [inputValue, setInputValue] = useState(name)

    const apiKey = "a7370479d17c1c001f3a2bb1dc10dd53";

    const [movieFetchData, setMovieFetchData] = useState([])

    const [cart, setCart] = useState([]);

    const [errors, setErrors] = useState({
        moviename: ""
    });


    const handleChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(name)}`;
        fetch(url).then((response) => response.json()).then((data) => {
            setMovieFetchData(data.results)
        })
    }, [name])

    // const searchMovies = (e) => {
    //     e.preventDefault()
    //     const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(inputValue)}`;
    //     fetch(url).then((response) => response.json()).then((data) => {
    //         setMovieFetchData(data.results)
    //     })
    // }

    const searchMovies = (e) => {
        e.preventDefault()

        let newErrors = {};

        if(!inputValue) {
            newErrors.moviename = "Le nom d'un film est requis.";
            setErrors(newErrors);
        }
        else if(inputValue.length < 3) {
            newErrors.moviename = "Le nom d'un film doit contenir au moins 3 caractères.";
            setErrors(newErrors);
        }
        else if(inputValue.length >= 3) {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(inputValue)}`;
            fetch(url).then((response) => response.json()).then((data) => {
                setMovieFetchData(data.results)
            })
        }
    }

    const addToCart = (movieId) => {
        // Trouvez le film correspondant avec movieId
        const movie = movieFetchData.find(movie => movie.id === movieId);
        if (movie) {
            setCart([...cart, movie]);
            alert(`${movie.title} a été ajouté au panier`);
        }
    };


    return (
        // <div className='min-h-screen bg-cover bg-center' style={{backgroundImage:`url(${searchImg})`}}>
        //     <div className="container mx-auto flex flex-col py-10 gap-10 px-4 lg:px-0">
        //         <NavBar/>
        //         <div className="flex flex-col gap-4">
        //             <form onSubmit={(e) => searchMovies(e)} className='lg:w-[35%] flex gap-2'>
        //                 <input value={inputValue} onChange={handleChangeInput} className='w-full p-2 rounded-sm focus:outline-none border-none' type="text" name="" id="" />
        //                 <button className='bg-orange-500 text-white px-4 rounded-sm'>Rechercher</button>
        //             </form>
        //             {errors.moviename && <p className="text-red-500 text-xs italic">{errors.moviename}</p>}
        //             <span className='text-gray-300'>{movieFetchData.length} résultats de la recherche.</span>
        //         </div>
        //         {name && (
        //             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-white">
        //                 {movieFetchData.map((movie, index) => (
        //                     <Link to={`/movie-details?id=${movie.id}`} key={index} className="relative w-full h-64 bg-gray-600">
        //                         <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`} alt="fond" className="w-full h-full object-cover"/>
        //                         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        //                             <h1 className="text-white text-center text-xl font-bold Montserrat">{movie.title}</h1>
        //                         </div>
        //                     </Link>
        //                 ))}
        //             </div>
        //         )}
        //     </div>
        // </div>
        <div className='min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${searchImg})` }}>
    <div className="container mx-auto flex flex-col py-10 gap-10 px-4 lg:px-0">
        <NavBar />
        <div className="flex flex-col gap-4">
            <form onSubmit={(e) => searchMovies(e)} className='lg:w-[35%] flex gap-2'>
                <input 
                    value={inputValue} 
                    onChange={handleChangeInput} 
                    className='w-full p-3 rounded-sm focus:outline-none border-2 border-gray-300 bg-white shadow-md transition duration-300 ease-in-out focus:border-orange-500' 
                    type="text" 
                    placeholder="Recherchez un film..."
                />
                <button 
                    type="submit" 
                    className='bg-orange-500 text-white px-6 py-3 rounded-sm shadow-md transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none'
                >
                    Rechercher
                </button>
            </form>
            {errors.moviename && <p className="text-red-500 text-xs italic">{errors.moviename}</p>}
            <span className='text-gray-300'>{movieFetchData.length} résultats de la recherche.</span>
        </div>
        {name && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
                {movieFetchData.map((movie, index) => (
                    <div key={index} className="relative group bg-gray-600 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                        <Link to={`/movie-details?id=${movie.id}`}>
                            <img 
                                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`} 
                                alt={movie.title} 
                                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ease-in-out group-hover:opacity-100 opacity-80">
                                <h1 className="text-white text-lg font-bold Montserrat">{movie.title}</h1>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-orange-400 text-sm font-semibold">${movie.price || 'N/A'}</span>
                                    <button 
                                        onClick={() => addToCart(movie.id)} 
                                        className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none"
                                    >
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        )}
    </div>
</div>

    )
}

export default MovieSearchResultsPage