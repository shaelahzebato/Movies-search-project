import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import apiKey from '../../Api/Api'
import imgBase from '../../Api/imgBase';
import NavBar from '../../components/NavBar/NavBar'
import toast from 'react-hot-toast';

//Chargement film similaire !!!

function MovieDetailsPage() {

    const [searchParams] = useSearchParams();
    const movieId = searchParams.get('id');
    const [movieDetails, setMovieDetails] = useState();
    const [similarMovies, setSimilarMovies] = useState([]);
    const [cart, setCart] = useState([]);


    const actionIcons = [
        (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        ),
        (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg>
        ),
        (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        ),
    ];

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
                const data = await response.json();
                setMovieDetails(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    useEffect(() => {
        const fetchSimilarMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`);
                const data = await response.json();
                setSimilarMovies(data.results.slice(0, 6));
            } catch (error) {
                console.error(error);
            }
        };
        fetchSimilarMovies();
    }, [movieId]);

    
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? similarMovies.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === similarMovies.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const addToCart = (movieId) => {
        // Trouvez le film correspondant avec movieId
        if (movieDetails?.id === movieId) {
            setCart([...cart, movieDetails]);
            toast.success(`${movieDetails.title} a été ajouté au panier`);
        }
    };

    return (
        <>
            {/* Petit ecran */}
            <div className="relative lg:hidden min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${imgBase}${movieDetails?.backdrop_path || movieDetails?.poster_path})` }}>
  
                {/* Overlay de fond */}
                <div className="absolute inset-0 bg-black opacity-85"></div>
                
                {/* Contenu */}
                <div className="relative z-10 flex items-center justify-center h-full text-white">
                    <div className="lg:hidden min-h-screen bg-cover bg-center text-white p-4 z-10">
                    
                        <NavBar />
                        
                        <div className="container mx-auto py-10">
                            <div className="flex flex-col gap-10">
                            
                                {/* Détails du film */}
                                <div className="flex flex-col gap-6">
                                    <h1 className="text-3xl text-center">{movieDetails?.title}</h1>
                                    <div className="w-full flex justify-center">
                                        <img 
                                            src={`${imgBase}${movieDetails?.backdrop_path || movieDetails?.poster_path}`} 
                                            alt={`${movieDetails?.title} poster`} 
                                            className="max-h-96 object-cover rounded-lg"
                                        />
                                    </div>
                                    <p className="text-sm mt-4">{movieDetails?.overview}</p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-orange-400 text-sm font-semibold">${'100'}</span>
                                    <button 
                                        onClick={() => addToCart(movieDetails?.id)} 
                                        className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none"
                                    >
                                        <FontAwesomeIcon icon={faPlus}/>
                                        <span>Panier</span>
                                    </button>
                                </div>

                                {/* Boutons d'actions */}
                                <ul className="flex gap-4 justify-center mt-6">
                                    {actionIcons.map((icon, index) => (
                                        <li key={index} className="text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 duration-500 ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer">
                                            {icon}
                                        </li>
                                    ))}
                                </ul>
                                
                                {/* Films similaires */}
                                <div className="flex flex-col gap-4 mt-10">
                                    <h2 className="text-2xl font-semibold">Films similaires</h2>
                                    
                                    <div className="relative group max-w-full h-[300px] w-full py-8 m-auto">
                                        <div 
                                            style={{ backgroundImage: `url(${imgBase}/${similarMovies[currentIndex]?.backdrop_path})` }} 
                                            className="w-full h-full bg-center bg-cover duration-500 rounded-lg">
                                        </div>

                                        {/* Titre du film similaire */}
                                        <Link 
                                            to={`/movie-details?id=${similarMovies[currentIndex]?.id}`} 
                                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-70"
                                        >
                                            <h1 className="text-white text-xl font-bold">{similarMovies[currentIndex]?.title}</h1>
                                        </Link>

                                        {/* Flèches de navigation */}
                                        <button 
                                            className="absolute top-1/2 -translate-y-1/2 left-4 text-2xl p-2 bg-black/20 text-white rounded-full hover:bg-black/40" 
                                            onClick={prevSlide} 
                                            aria-label="Slide précédent">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 4.5L11.25 12l7.5 7.5M5.25 12l7.5 7.5" />
                                            </svg>
                                        </button>

                                        <button 
                                            className="absolute top-1/2 -translate-y-1/2 right-4 text-2xl p-2 bg-black/20 text-white rounded-full hover:bg-black/40" 
                                            onClick={nextSlide} 
                                            aria-label="Slide suivant">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5l7.5 7.5-7.5 7.5M18.75 12L11.25 19.5" />
                                            </svg>
                                        </button>

                                        {/* Points d'indication */}
                                        <div className="flex justify-center absolute bottom-2 left-0 right-0">
                                            {similarMovies.map((slideIndex) => (
                                                <div 
                                                    key={slideIndex} 
                                                    onClick={() => setCurrentIndex(slideIndex)} 
                                                    className={`cursor-pointer w-3 h-3 rounded-full mx-1 ${currentIndex === slideIndex ? 'bg-white' : 'bg-gray-400'}`}>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            
            {/* Grand ecran */}
            <div className="relative hidden lg:block min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${imgBase}${movieDetails?.backdrop_path || movieDetails?.poster_path})` }}>
                <div className="absolute inset-0 bg-black opacity-85"></div>
                <div className="relative z-10 flex items-center justify-center h-full text-white">
                    <div className="relative text-white p-4 z-10 w-full">
                        <NavBar />
                        <div className="container mx-auto py-10">
                            <div className="flex flex-col gap-16">
                                <div className="flex flex-col gap-14">
                                    <div className="max-w-6xl mx-auto">
                                        <img src={`${imgBase}${movieDetails?.backdrop_path || movieDetails?.poster_path}`} alt={`${movieDetails?.title} backdrop`} />
                                    </div>
                                    <div className="w-full flex flex-col gap-10">
                                        <div className="flex items-center gap-6">
                                            <h1 className='text-6xl font-bold'>{movieDetails?.title}</h1>
                                            <div className="flex items-center gap-1">
                                                {[...Array(3)].map((_, index) => (
                                                    <small key={index} className='text-sm text-yellow-400'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                                        </svg>
                                                    </small>
                                                ))}
                                                <small className='text-sm text-white'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                                    </svg>
                                                </small>
                                            </div>
                                        </div>
                                        <p className='text-xl'>{movieDetails?.overview}</p>
                                        <ul className="flex gap-4">
                                            {actionIcons.map((icon, index) => (
                                                <li key={index} className="text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 duration-500 ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer">
                                                    {icon}
                                                </li>
                                            ))}
                                            {/* {[
                                                {
                                                    icon: (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                    ),
                                                    label: 'Like',
                                                },
                                                {
                                                    icon: (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                                    ),
                                                    label: 'Share',
                                                },
                                                {
                                                    icon: (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    ),
                                                    label: 'Download',
                                                }
                                            ].map((action, index) => (
                                                <li key={index} className='text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 transition ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                                                        {action.icon}
                                                    </svg>
                                                </li>
                                            ))} */}
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-orange-400 text-sm font-semibold">${'100'}</span>
                                    <button 
                                        onClick={() => addToCart(movieDetails?.id)} 
                                        className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none"
                                    >
                                        <FontAwesomeIcon icon={faPlus}/>
                                        <span>Panier</span>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h2 className='text-2xl'>Films similaires</h2>
                                    <div className="grid grid-cols-6 gap-4">
                                        {similarMovies.map((simov) => (
                                            <Link to={`/movie-details?id=${simov.id}`} key={simov.id} className="relative w-full h-64 bg-gray-600">
                                                <img src={`${imgBase}${simov.backdrop_path}`} alt={`${simov.title} backdrop`} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                    <h1 className="text-white text-center text-xl font-bold">{simov.title}</h1>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetailsPage