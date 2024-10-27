import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import apiKey from '../../Api/Api';
import { useLocalStorage } from "@uidotdev/usehooks"; 

function MoviesWatchedByUser() {
  
    const [loading, setLoading] = useState(false);
    const [movieWatchedList, setMovieWatchedList] = useState([])
    const [token, setToken] = useLocalStorage('token', null);

    useEffect( () => {
        setLoading(true)
        // const token = localStorage.getItem('token');
        const fetchMovieWatchedByUser = async () => {
            try {
                const response = await fetch("https:/symbian.stvffmn.com/nady/public/api/v1/users/watched-movies", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                })
                if(response.ok) {
                    const data = await response.json()
                    console.log("movieWatched list ::: ", data.datas);
                    const movieWatchedIds = data.datas

                    movieWatchedIds.map(async movie => {
                        try {
                            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.movie_id}?api_key=${apiKey}`);
                            const data = await response.json()
                            // setmovieWatchedList([...movieWatchedList, data])
                            // Mise à jour de l'état avec la dernière version de movieWatchedList
                            setMovieWatchedList(prevMovieWatchedList => [...prevMovieWatchedList, data]);
                        }
                        catch(err) {
                            console.log("Error : ", err);
                            
                        }
                    })
                }
                else {
                    console.log("Status d'erreur reçu : ", response.status);                    
                }
            }
            catch(err) {
                console.log("Erreur", err);                
            }
            finally {
                setLoading(false)
            }
        }


        fetchMovieWatchedByUser()
    }, [])
    

    return (
        <section>
            {loading ? (
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="h-8 w-8 rounded-full border-2 border-orange-600 border-dashed animate-spin"></div>
                    <span>Chargement...</span>
                </div>
                ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
                    {movieWatchedList.map((movie, index) => (
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
                                        <span className="text-orange-400 text-sm font-semibold">${movie.price || '100'}</span>
                                        <button 
                                            
                                            className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none"
                                        >
                                            <FontAwesomeIcon icon={faPlus}/>
                                            <span>Panier</span>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default MoviesWatchedByUser