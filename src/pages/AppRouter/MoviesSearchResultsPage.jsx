import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

import searchImg from '../../images/Resultats-de-recherche–1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../../components/NavBar/NavBar';
import toast from 'react-hot-toast';
import apiKey from '../../Api/Api';
import Footer from '../../components/Footer/Footer';
import { useLocalStorage } from "@uidotdev/usehooks"; 



function MovieSearchResultsPage() {
    
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const [inputValue, setInputValue] = useState(name)
    const [movieFetchData, setMovieFetchData] = useState([])

    const [errors, setErrors] = useState({ moviename: "" });
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useLocalStorage('token', null);
    const [existingCartItemBtn, setExistingCartItemBtn] = useState();


    const handleChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    //Le code qui lance la recherche au chargement du composant, depuis la home page.
    useEffect(() => {
        if (name) {  // Vérifie que 'name' est bien défini
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(name)}`;
            fetch(url).then((response) => response.json()).then((data) => {
                setMovieFetchData(data.results);
                console.log("Depuis la home page :: ", data.results);
                
            }).catch(error => {
                console.error('Erreur lors de la récupération des films:', error);
                toast.error('Erreur lors de la récupération des films.');
            });
        }
    }, [name]);
    

    //Le code qui lance la recherche depuis cette page(resultpage) en fonction de ce que l'utilisateur saisit.
    const searchMovies = async (e) => {
        e.preventDefault();
        setLoading(true);
        let newErrors = {};
    
        try {
            if (!inputValue) {
                newErrors.moviename = "Le nom d'un film est requis.";
                setErrors(newErrors);
            } else if (inputValue.length < 3) {
                newErrors.moviename = "Le nom d'un film doit contenir au moins 3 caractères.";
                setErrors(newErrors);
            } else {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(inputValue)}`);
                const data = await response.json();
                if (data.results) {
                    setMovieFetchData(data.results);
                } else {
                    toast.error("Aucun résultat trouvé.");
                }
            }
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            toast.error('Erreur lors de la recherche.');
        } finally {
            setLoading(false);
        }
    };
    

    const addToWatchedList = async (movieId) => {
    
        try {
            // 1 : Récupérer la liste des films déjà regardés
            const fetchWatchedResponse = await fetch('https://symbian.stvffmn.com/nady/public/api/v1/users/watched-movies', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    
            if (!fetchWatchedResponse.ok) {
                console.error('Erreur lors de la récupération des films regardés');
            }
    
            const watchedMovies = await fetchWatchedResponse.json();
            const watchedList = Array.isArray(watchedMovies) ? watchedMovies : watchedMovies.data?.movies || []; // Si la liste est contenue dans une autre propriété
    
            console.log("Liste des films déjà regardés :", watchedList);
    
            // 2 : Vérifier si le film est déjà dans la liste des films regardés
            const isMovieAlreadyWatched = watchedList.find(movie => movie.id === movieId);
    
            if (isMovieAlreadyWatched) {
                console.log("Le film est déjà dans la liste des films regardés.");
                toast.info("Le film est déjà dans votre liste de films regardés.");
                return; // Sortir de la fonction si le film est déjà regardé
            }
    
            // 3 : Ajouter le film à la liste des films regardés s'il n'y est pas déjà
            const response = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/watched-movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    movie: {
                        id: movieId
                    }
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Film ajouté à la liste des films regardés :", data);
                toast.success(data.message);
            } else {
                console.error("Erreur lors de l'ajout du film à la liste des films regardés", response.status);
                toast.error("Erreur lors de l'ajout du film à la liste des films regardés.");
            }
    
        } catch (error) {
            console.error('Erreur lors de la requête', error);
            toast.error("Une erreur s'est produite lors de l'ajout à la liste des films regardés."); //L'erreur ici
        }
    };



    const existingCartItem = async (movieId) => {
        const checkResponse = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/cart`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });
    
        const responseMovieInCart = await checkResponse.json();
        
        // Vérifiez que les données sont bien présentes
        const cartItems = responseMovieInCart.datas;
    
        // Utilisez reduce de manière synchrone
        const cartQuantities = cartItems.reduce((acc, item) => {
            acc[item.product_id] = item.quantity;
            return acc;
        }, {});
        
        setExistingCartItemBtn(cartQuantities)
        // Cherchez l'élément spécifique par ID
        return cartItems.find(item => item.id === movieId);
    };
    

    const loadCartItems = async () => {
        try {
            const checkResponse = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/cart`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
    
            const responseMovieInCart = await checkResponse.json();
            const cartItems = responseMovieInCart.datas;

            // Construire un objet avec les quantités d'articles dans le panier
            const cartQuantities = cartItems.reduce((acc, item) => {
                acc[item.product_id] = item.quantity;
                return acc;
            }, {});

            setExistingCartItemBtn(cartQuantities);
        } catch (error) {
            console.error("Erreur lors du chargement des articles du panier:", error);
        }
    };
    useEffect(() => {
    
        loadCartItems();
    }, [token]);
    
    // Fonction d'ajout au panier
    const addToCart = async (movieId) => {
        const existingItemQuantity = existingCartItemBtn?.[movieId];
    
        if (existingItemQuantity) {
            // Si le film est déjà dans le panier, on incrémente la quantité
            updateCartItemQuantity(movieId, existingItemQuantity + 1);
        } else {
            try {
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
                            id: movieId 
                        },
                        quantity: 1    
                    }),
                });
                const data = await response.json();
                    
                if (response.ok) {
                    toast.success(data.message);
                    setExistingCartItemBtn(prev => ({ ...prev, [movieId]: 1 })); // Met à jour le bouton d'ajout
                } else {
                    console.error("Erreur lors de l'ajout au panier:", data.message);
                }
            } catch (error) {
                console.error("Erreur lors de l'ajout de l'article au panier:", error);
            } finally {
                setLoading(false);
            }
        }
    };
    


    // Modifier la quantité d'un elemebt dans le panier.
    const updateCartItemQuantity = async (movieId, newQuantity) => {

        try {
            setLoading(true);
            const response = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/cart/${movieId}`, {
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
            const data = await response.json();
            if (response.ok) {
                loadCartItems()
                console.log("updateCartQuantity : ", data);
            } else {
                console.error('Erreur lors de la mise à jour de la quantité:', data.message);
            }
        } 
        catch (error) {
            console.error("Error updating item quantity:", error);
        }
        finally {
            setLoading(false);
        }
    };

    

    const incrementCartItemQuantity = (movieId) => {
        const currentQuantity = existingCartItemBtn[movieId] || 0;
        updateCartItemQuantity(movieId, currentQuantity + 1);
    };

    const decrementCartItemQuantity = (movieId) => {
        const currentQuantity = existingCartItemBtn[movieId] || 0;
        if (currentQuantity > 1) {
            updateCartItemQuantity(movieId, currentQuantity - 1);
        } else {
            removeCartItem(movieId);
        }
    };

    const removeCartItem = async (movieId) => {
        try {
            setLoading(true);
            const response = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/cart/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                setExistingCartItemBtn(prev => {
                    const newCartItems = { ...prev };
                    delete newCartItems[movieId];
                    return newCartItems;
                });
                toast.success("Film retiré du panier.");
            } else {
                console.error('Erreur lors de la suppression de l\'élément du panier.');
            }
        } 
        catch (error) {
            console.error("Error removing item from cart:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <section className='min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${searchImg})` }}>
                <div className="container mx-auto flex flex-col py-10 gap-10 px-4 lg:px-0">
                    <NavBar />
                    <div className="flex flex-col gap-4">
                        <form onSubmit={(e) => searchMovies(e)} className='lg:w-[35%] flex gap-2'>
                            <input 
                                value={inputValue} 
                                onChange={handleChangeInput} 
                                className={`w-full p-3 rounded-sm focus:outline-none border-2 border-gray-300 bg-white shadow-md transition duration-300 ease-in-out focus:border-orange-500 ${errors.moviename ? "border-2 border-red-500 focus:ring-0" : ""}`}
                                type="text" 
                                placeholder="Recherchez un film..."
                            />
                            <button 
                                type="submit" 
                                className={`bg-orange-500 text-white px-6 py-3 rounded-sm shadow-md transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none ${loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
                                disabled={loading}
                            >
                                {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 rounded-full border-2 border-dashed animate-spin"></div>
                                            <span>Rechercher...</span>
                                        </div>
                                    ) : (
                                        "Rechercher"
                                    )}
                            </button>
                        </form>
                        {errors.moviename && <p className="text-red-500 text-xs italic">{errors.moviename}</p>}
                        <span className='text-gray-300'>{movieFetchData.length} résultats de la recherche.</span>
                    </div>
                    {name && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
                            {movieFetchData.map((movie, index) => (
                                <div key={index} className="relative group bg-gray-600 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                                    <Link onClick={() => addToWatchedList(movie.id)} to={`/movie-details?id=${movie.id}`}>
                                        <img 
                                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`} 
                                            alt={movie.title} 
                                            className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ease-in-out group-hover:opacity-100 opacity-80">
                                            <h1 className="text-white text-lg font-bold Montserrat">{movie.title}</h1>
                                            <div className="flex justify-between items-center mt-2">
                                                {/* <span className="text-orange-400 text-sm font-semibold">${movie.budget || existingCartItemBtn[movie.id] ? 100 * existingCartItemBtn[movie.id] : 100}</span> */}
                                                <span className="text-orange-400 text-lg font-semibold">
                                                    ${existingCartItemBtn && movie.id in existingCartItemBtn
                                                        ? 100 * existingCartItemBtn[movie.id]
                                                        : 100}
                                                </span>
                                                <button  // Empêche la propagation de l'événement de clic;
                                                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); addToCart(movie.id); }} 
                                                    className={`flex items-center justify-center gap-2 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none ${loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-4 w-4 rounded-full border-2 border-dashed animate-spin"></div>
                                                            <span>Ajout...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {existingCartItemBtn && existingCartItemBtn[movie.id] ? (
                                                                <div className="flex items-center gap-1 h-full">
                                                                    <button onClick={() => decrementCartItemQuantity(movie.id)}>    
                                                                        <FontAwesomeIcon icon={faMinus} className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"/>    
                                                                    </button>
                                                                    <input type="text" readOnly value={existingCartItemBtn[movie.id]} className="outline-none text-white font-semibold text-lg w-full max-w-[34px] min-w-[24px] placeholder:text-gray-900  text-center bg-transparent"/>
                                                                    <button onClick={() => incrementCartItemQuantity(movie.id)}>
                                                                        <FontAwesomeIcon icon={faPlus}/>
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                                    </svg>
                                                                    <span>Ajouter</span>
                                                                </div>     
                                                            )} 
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default MovieSearchResultsPage