import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

import toast from 'react-hot-toast';
import apiKey from '../../Api/Api'
import imgBase from '../../Api/imgBase';
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer';
import { useLocalStorage } from "@uidotdev/usehooks"; 


function MovieDetailsPage() {

    const [token, setToken] = useLocalStorage('token', null);
    const [searchParams] = useSearchParams();
    const movieId = searchParams.get('id');
    const [movieDetails, setMovieDetails] = useState();
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [favoris, setFavoris] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [existingCartItemBtn, setExistingCartItemBtn] = useState(false);


    const navigate = useNavigate();
    const location = useLocation();

    // Récupère tous les paramètres actuels de l'URL
    const currentSearchParams = location.search;

    // Fonction pour revenir en arrière en gardant les paramètres
    const handleBackClick = () => {
        navigate(-1, { state: { from: location.pathname + currentSearchParams } });
    };

    //Fonction pour afficher les détails par defaut des films sur lesquels l'user clique depuisla page de resultat !
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

    //Fonction pour afficher les films similaires aux films sur lesquels l'user clique !
    useEffect(() => {
        const fetchSimilarMovies = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`);
                const data = await response.json();
                setSimilarMovies(data.results.slice(0, 6));
            } catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchSimilarMovies();
    }, [movieId]);

    //Ce code vérifi si un film est bien en favori ou non, et fait un affichage de coeur en fonction
    useEffect(() => {
        const fetchIfMovieIsFav = async () => {
            try {
                const response = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/favorites-movies/${movieId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                })
                if(response.ok) {
                    setFavoris(true)
                    const data = await response.json()
                    console.log('response : ', data);
                }
                else if (response.status === 404) {
                    console.log(`Le film ${movieId} n'est pas en favori`);
                } else {
                    console.log(`Erreur lors de la vérification du favori : ${response.status}`);
                }
            }
            catch(err) {
                console.error(err)
            }
        }
        fetchIfMovieIsFav()
    }, [movieId])
    

    //Ce code ajoute et retire en favoris en fonction de l'etat.
    const toggleFavoris = async (movieId) => {
    
        try {
            // Vérification si le film est déjà en favoris /api/v1/users/favorites-movies
            const checkResponse = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/favorites-movies/${movieId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
    
            if (checkResponse.ok) {
                // Si le film est déjà en favoris, on le retire
                const removeResponse = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/favorites-movies/${movieId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                });
    
                if (removeResponse.ok) {
                    console.log(`Le film avec l'ID ${movieId} a été retiré des favoris`);
                    toast.success("Le film a été retiré de vos favoris");
                    setFavoris(false);
                } else {
                    console.log(`Erreur lors du retrait des favoris : ${removeResponse.status}`);
                }
    
            } else if (checkResponse.status === 404) {
                // Si le film n'est pas en favoris, on l'ajoute
                const addResponse = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/favorites-movies`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        movie: {
                            id: movieId
                        }
                    })
                });
    
                if (addResponse.ok) {
                    const data = await addResponse.json();
                    console.log(`Film ajouté aux favoris :`, data);
                    toast.success("Le film a été ajouté à vos favoris");
                    setFavoris(true);
                } else {
                    console.log(`Erreur lors de l'ajout aux favoris : ${addResponse.status}`);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la requête', error);
        }
    };
    
    // Récupère le panier d'un utilisateur et verifie l'existence de film (id).
    const existingCartItem = async (movieId) => {
        const checkResponse = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/cart`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        })

        const responseMovieInCart = await checkResponse.json();
        console.log("responseMovieInCart >>>> ", responseMovieInCart);

        const cartItems = responseMovieInCart.datas;
        return cartItems.find(item => item.id === movieId);
    };
        
    // Fonction pour ajouter au panier
    const addToCart = async (productId, quantity = 1) => {
        const checkResponse = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/cart`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })

        const existingItem = await existingCartItem(movieId);
        if (existingItem) {
            setExistingCartItemBtn(true);
            // Si le film existe déjà, on modifie la quantité
            updateCartQuantity(movieId, existingItem.quantity + 1);
        } 
        else {
            try {
                setExistingCartItemBtn(false)
                setLoading(true);
                const response = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/cart`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        product: {
                            id: productId 
                        },
                        quantity: quantity
                    }),
                });

                const data = await response.json();
                
                if (response.ok) {
                    console.log("dataaaaa : ", data);
                    toast.success(data.message)                    
                } else {
                    console.error("Erreur lors de l'ajout au panier:", data.message);
                }
            }
            catch (error) {
                console.error('Erreur réseau:', error);
            }
            finally {
                setLoading(false);
            }
        }
    };

  // Fonction pour modifier la quantité
    const updateCartQuantity = async (cartItemId, newQuantity) => {
        try {
            const putQty = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/cart/${cartItemId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    quantity: newQuantity,
                }),
            });
            const data = await putQty.json();
            if (putQty.ok) {
                console.log("updateCartQuantity : ", data);
            } else {
                console.error('Erreur lors de la mise à jour de la quantité:', data.message);
            }
        }
        catch (error) {
            console.error('Erreur réseau:', error);
        }
    };





    //Fonction pour les slides des films similaires(gauche), mobile.
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? similarMovies.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    //Fonction pour les slides des films similaires(droite), mobile.
    const nextSlide = () => {
        const isLastSlide = currentIndex === similarMovies.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
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
                        <button
                            onClick={handleBackClick}
                            className="flex items-center space-x-2 p-2 text-orange-500 hover:text-white hover:bg-orange-500 rounded-full transition ease-out duration-300"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            <span>Retour</span>
                        </button>
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
                                    <div className="flex flex-col gap-4">
                                            <div className="flex items-center">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill={index < Math.round(movieDetails?.vote_average / 2) ? "currentColor" : "none"}
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        className="w-5 h-5 text-yellow-400"
                                                    >
                                                        <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.478 4.55a1 1 0 00.95.69h4.788c.969 0 1.371 1.24.588 1.81l-3.876 2.826a1 1 0 00-.364 1.118l1.478 4.55c.3.921-.755 1.688-1.538 1.118l-3.876-2.826a1 1 0 00-1.176 0l-3.876 2.826c-.783.57-1.837-.197-1.538-1.118l1.478-4.55a1 1 0 00-.364-1.118L2.733 9.977c-.783-.57-.381-1.81.588-1.81h4.788a1 1 0 00.95-.69l1.478-4.55z"
                                                        />
                                                    </svg>
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-sm text-white">({movieDetails?.vote_average}/10)</span>
                                            </div>
                                            <p className="text-sm text-white mb-4">Date de sortie : {movieDetails?.release_date}</p>
                                        </div>
                                    <p className="text-sm">{movieDetails?.overview}</p>
                                </div>
                                <div className="flex justify-between items-center mt-2 mb-20">
                                    <span className="text-orange-400 text-2xl font-semibold">${'100'}</span>
                                    <button 
                                        onClick={() => addToCart(movieDetails?.id, 1)} 
                                        className={`flex items-center justify-center gap-2 text-white text-sm transition duration-300 ease-in-out focus:outline-none ${loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
                                        disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-4 w-4 rounded-full border-2 border-dashed animate-spin"></div>
                                                    <span>Ajout...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    {existingCartItemBtn ? (
                                                        <div className="flex items-center gap-1 h-full">
                                                            <button>    
                                                                <FontAwesomeIcon className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" icon={faMinus}/>    
                                                            </button>
                                                            <input type="text" className="outline-none text-white font-semibold text-lg w-full max-w-[34px] min-w-[24px] placeholder:text-gray-900  text-center bg-transparent" value="1"/>
                                                            <button>
                                                                <FontAwesomeIcon icon={faPlus}/>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center">
                                                            <span className='bg-orange-600 p-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                                </svg>
                                                            </span>
                                                            <span className='uppercase text-sm px-2'>Ajouter au panier</span>
                                                        </div>      
                                                    )} 
                                                </>
                                            )}
                                    </button>
                                </div>

                                {/* Boutons d'actions */}
                                {/* <ul className="flex gap-4 justify-center mt-6">
                                    <li>
                                        <button onClick={() => toggleFavoris(movieDetails.id)}>
                                            {
                                            favoris ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>
                                            }
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                            </svg>
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                        </button>
                                    </li>
                                </ul> */}
                                <ul className="flex flex-col justify-center gap-4">
                                            <li>
                                                <button onClick={() => toggleFavoris(movieDetails.id)}>
                                                    {
                                                    favoris ?
                                                        <button className='flex items-center bg-green-500'>
                                                            <span className='bg-green-600 p-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                                </svg>
                                                            </span>
                                                            <span className='uppercase text-sm px-4'>Retirer</span>
                                                        </button>
                                                        :
                                                        <button className='flex items-center bg-red-500'>
                                                            <span className='bg-red-600 p-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                                </svg>
                                                            </span>
                                                            <span className='uppercase text-sm px-4'>Ajouter</span>
                                                        </button>
                                                    }
                                                </button>
                                            </li>
                                            <li>
                                                <button className='flex items-center bg-blue-400'>
                                                    <span className='bg-blue-500 p-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                                        </svg>
                                                    </span>
                                                    <span className='uppercase text-sm px-4'>Partager</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button className='flex items-center bg-amber-400'>
                                                    <span className='bg-amber-500 p-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                        </svg>
                                                    </span>
                                                    <span className='uppercase text-sm px-4'>Télécharger</span>
                                                </button>
                                            </li>
                                        </ul>

                                {/* Films similaires */}
                                {
                                    similarMovies.length > 0 ? 
                                    <div className="flex flex-col gap-4 mt-10">
                                        <h2 className="text-2xl font-semibold">Films similaires</h2>
                                        {loading ? (
                                            <div className="flex flex-col justify-center items-center gap-2">
                                                <div className="h-8 w-8 rounded-full border-2 border-orange-600 border-dashed animate-spin"></div>
                                                <span>Chargement...</span>
                                            </div>
                                            ) : (
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
                                            )
                                        }
                                    </div>
                                :
                                    <p className='text-xl text-center'>Ce film n'a pas de similarité.!</p>
                                }
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
                        <button
                            onClick={handleBackClick}
                            className="flex items-center space-x-2 p-2 text-orange-500 hover:text-white hover:bg-orange-500 rounded-full transition ease-out duration-300"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            <span>Retour</span>
                        </button>
                        <div className="container mx-auto py-10">
                            <div className="flex flex-col gap-16">
                                <div className="flex flex-col gap-14">
                                    <h1 className='text-6xl font-bold text-center'>{movieDetails?.title}</h1>
                                    <div className="max-w-6xl mx-auto">
                                        <img src={`${imgBase}${movieDetails?.backdrop_path || movieDetails?.poster_path}`} alt={`${movieDetails?.title} backdrop`} />
                                    </div>
                                    <div className="w-full flex flex-col gap-10">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill={index < Math.round(movieDetails?.vote_average / 2) ? "currentColor" : "none"}
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        className="w-5 h-5 text-yellow-400"
                                                    >
                                                        <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.478 4.55a1 1 0 00.95.69h4.788c.969 0 1.371 1.24.588 1.81l-3.876 2.826a1 1 0 00-.364 1.118l1.478 4.55c.3.921-.755 1.688-1.538 1.118l-3.876-2.826a1 1 0 00-1.176 0l-3.876 2.826c-.783.57-1.837-.197-1.538-1.118l1.478-4.55a1 1 0 00-.364-1.118L2.733 9.977c-.783-.57-.381-1.81.588-1.81h4.788a1 1 0 00.95-.69l1.478-4.55z"
                                                        />
                                                    </svg>
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-sm text-white">({movieDetails?.vote_average}/10)</span>
                                            </div>
                                            <p className="text-sm text-white mb-4">Date de sortie : {movieDetails?.release_date}</p>
                                        </div>
                                        <p className='text-xl -mt-4'>{movieDetails?.overview}</p>
                                        <ul className="flex items-center justify-center gap-4">
                                            <li>
                                                <button onClick={() => toggleFavoris(movieDetails.id)}>
                                                    {
                                                    favoris ?
                                                        <button className='flex items-center bg-green-500'>
                                                            <span className='bg-green-600 p-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                                </svg>
                                                            </span>
                                                            <span className='uppercase text-sm px-4'>Retirer</span>
                                                        </button>
                                                        :
                                                        <button className='flex items-center bg-red-500'>
                                                            <span className='bg-red-600 p-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                                </svg>
                                                            </span>
                                                            <span className='uppercase text-sm px-4'>Ajouter</span>
                                                        </button>
                                                    }
                                                </button>
                                            </li>
                                            <li>
                                                <button className='flex items-center bg-blue-400'>
                                                    <span className='bg-blue-500 p-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                                        </svg>
                                                    </span>
                                                    <span className='uppercase text-sm px-4'>Partager</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button className='flex items-center bg-amber-400'>
                                                    <span className='bg-amber-500 p-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                        </svg>
                                                    </span>
                                                    <span className='uppercase text-sm px-4'>Télécharger</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 mt-2">
                                    <div className="bg-white/95 p-2 px-6">
                                        <span className="text-orange-400 text-lg font-semibold">${'100'}</span>
                                    </div>
                                    <button 
                                        onClick={() => addToCart(movieDetails?.id, 1)} 
                                        className={`flex items-center justify-center gap-2 text-white text-sm transition duration-300 ease-in-ou focus:outline-none ${loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
                                        disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-4 w-4 rounded-full border-2 border-dashed animate-spin"></div>
                                                    <span>Ajout...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    {existingCartItemBtn ? (
                                                        <div className="flex items-center gap-1 h-full">
                                                            <button>    
                                                                <FontAwesomeIcon className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" icon={faMinus}/>    
                                                            </button>
                                                            <input type="text" className="border-y border-x border-gray-200 outline-none text-white font-semibold text-lg w-full max-w-[34px] min-w-[24px] placeholder:text-gray-900  text-center bg-transparent" value="1"/>
                                                            <button>
                                                                <FontAwesomeIcon icon={faPlus}/>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center">
                                                            <span className='bg-orange-600 p-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                                </svg>
                                                            </span>
                                                            <span className='uppercase text-sm px-2'>Ajouter au panier</span>
                                                        </div>     
                                                    )} 
                                                </>
                                            )}
                                    </button>
                                </div>
                                {
                                    similarMovies.length > 0 ?
                                    <div className="flex flex-col gap-4">
                                    <h2 className='text-2xl'>Films similaires</h2>
                                    {loading ? (
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <div className="h-8 w-8 rounded-full border-2 border-orange-600 border-dashed animate-spin"></div>
                                            <span>Chargement...</span>
                                        </div>
                                        ) : (
                                            <div className="grid grid-cols-6 gap-4">
                                                {similarMovies.map((simov) => (
                                                    <Link to={`/movie-details?id=${simov.id}`} key={simov.id} className="relative w-full h-64 rounded-lg bg-gray-600 transition-transform transform hover:scale-105">
                                                        <img src={`${imgBase}${simov.backdrop_path}`} alt={`${simov.title} backdrop`} className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110" />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                            <h1 className="text-white text-center text-xl font-bold">{simov.title}</h1>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )
                                    }
                                </div>
                                :
                                    <p className='text-xl text-center'>Ce film n'a pas de similarité.!</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MovieDetailsPage;