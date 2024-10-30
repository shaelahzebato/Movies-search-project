import { faArrowRight, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import apiKey from '../../Api/Api'
import imgBase from '../../Api/imgBase'
import toast from 'react-hot-toast'
import { useLocalStorage } from "@uidotdev/usehooks"; 

function MovieShoppingCartPage() {

    const [moviesShopCart, setMoviesShopCart]= useState([])
    const [quantities, setQuantities] = useState({});
    const [productNumber, setProductNumber] = useState(0)
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useLocalStorage('token', null);

    
    const fetchShopCart = async () => {
        if (!token || token === undefined) {
            console.log('Token non trouvé !');
            return;
        }

        try {
            const response = await fetch('https://symbian.stvffmn.com/nady/public/api/v1/users/cart', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                const inCart = data.datas
                setProductNumber(inCart.length)

                const fetchedMovies = await Promise.all(
                    inCart.map(async movie => {
                        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.product_id}?api_key=${apiKey}`);
                        const data = await response.json();
                        return { ...data, quantity: movie.quantity, cartItemId: movie.id };
                    })
                );
                
                setMoviesShopCart(fetchedMovies);

                // Initialiser les quantités pour chaque produit
                const initialQuantities = {};
                inCart.forEach(movie => {
                    initialQuantities[movie.id] = movie.quantity;
                });
                
                setQuantities(initialQuantities);
                
                console.log("setQuantities(initialQuantities); ::: ", initialQuantities);
                
            } else {
                const errorData = await response.json();
                console.log(errorData.message);
            }
        } catch (err) {
            console.log('Erreurrrrrr.');
        }
    };
    useEffect(() => {
        fetchShopCart()
    }, [])

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
                toast.success(data.message)

                // Mettre à jour la quantité
                setQuantities(prevQuantities => ({
                    ...prevQuantities,
                    [cartItemId]: newQuantity,
                }));
                // fetchShopCart(); // Rafraîchir le panier après la mise à jour
            } else {
                console.error('Erreur lors de la mise à jour de la quantité:', data.message);
            }
        }
        catch (error) {
            console.error('Erreur réseau:', error);
        }
    };


    // Fonction pour retirer du panier
    const removeFromCart = async (cartItemId) => {
        try {
            setLoading(true);
            const response = await fetch(`https://symbian.stvffmn.com/nady/public/api/v1/users/cart/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log("deleteee : ", data, data.message);
                toast.success(data.message)
                fetchShopCart(); // Rafraîchir le panier après la suppression
            } else {
                console.error('Erreur lors de la suppression du produit:', data.message);
            }
        }
        catch (error) {
            console.error('Erreur réseau:', error);
        }
        finally {
            setLoading(false);
        }
    };

    
    const incrementQuantity = (cartItemId) => {
        const currentQuantity = quantities[cartItemId] || 1;
        updateCartQuantity(cartItemId, currentQuantity + 1);
    };

    const decrementQuantity = (cartItemId) => {
        const currentQuantity = quantities[cartItemId] || 1;
        if (currentQuantity > 1) {
            updateCartQuantity(cartItemId, currentQuantity - 1);
        }
    }; 
    

    return (
        <>
            <div className='bg-black bg-opacity-85 z-50'>
                <NavBar/>
            </div>
            <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-orange-500">Panier d'achat(s)</h2>
                                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{productNumber} article(s)</h2>
                            </div>
                            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                <div className="col-span-12 md:col-span-7">
                                    <p className="font-normal text-lg leading-8 text-gray-400">Détails des produits</p>
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-3">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantitée</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                moviesShopCart.map((cart, index) => (
                                    <div key={index} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                                        <div className="w-full md:max-w-[126px]">
                                            <img src={`${imgBase}${cart?.backdrop_path}`} alt="perfume bottle" className="mx-auto rounded-xl"/>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                            <div className="md:col-span-2">
                                                <div className="flex flex-col max-[500px]:items-center gap-3">
                                                    <h6 className="font-semibold text-base leading-7 text-black">{cart.title}</h6>
                                                    <h6 className="font-normal text-base leading-7 text-gray-500">Serie</h6>
                                                    <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-orange-600">$120.00</h6>
                                                </div>
                                            </div>
                                            <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                                <div className="flex items-center h-full">
                                                    <button onClick={() => decrementQuantity(cart.id)} className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                        {cart.quantity === 1 ?
                                                            <button onClick={(e) => {e.preventDefault(); removeFromCart(cart.id)}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-black hover:text-orange-500 transition duration-300 ease-in-out">
                                                                <path d="M9 3H7.5a1.5 1.5 0 0 0-1.5 1.5v.75H3.75a.75.75 0 0 0 0 1.5H5v12A2.25 2.25 0 0 0 7.25 21.75h9.5A2.25 2.25 0 0 0 19 19.5V7.5h1.25a.75.75 0 0 0 0-1.5H18v-.75A1.5 1.5 0 0 0 16.5 3H15V1.5A1.5 1.5 0 0 0 13.5 0h-3A1.5 1.5 0 0 0 9 1.5V3Zm1.5-1.5h3V3h-3V1.5Zm-3 6.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-9Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-9Z"/>
                                                                </svg>
                                                            </button>
                                                          
                                                        :
                                                            <FontAwesomeIcon className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" icon={faMinus}/>    
                                                        }
                                                    </button>
                                                    <input type="text"
                                                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[12px]  text-center bg-transparent"
                                                        value={quantities[cart.id] || cart.quantity} />
                                                    <button onClick={() => {incrementQuantity(cart.id); console.log("cart>>>", cart);
                                                    }} className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                        <FontAwesomeIcon className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" icon={faPlus}/>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                                <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-orange-600">${120.00 }</p> {/***quantity */}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="flex items-center justify-end mt-8">
                                <Link to={"/movies-results"} className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-orange-500 shadow-sm shadow-transparent transition-all duration-500 hover:text-orange-600 italic">
                                    Acheter à nouveau
                                    <FontAwesomeIcon className="transition-all duration-500 group-hover:translate-x-2" icon={faArrowRight}/>
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">Résumé de la commande</h2>
                            <div className="mt-8">
                                <div className="flex items-center justify-between pb-6">
                                    <p className="font-normal text-lg leading-8 text-black">{productNumber} article(s)</p>
                                    <p className="font-medium text-lg leading-8 text-black">$480.00</p>
                                </div>
                                <form>
                                    <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">Promo Code</label>
                                    <div className="flex pb-4 w-full">
                                        <div className="relative w-full ">
                                            <input type="text" className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "placeholder="xxxx xxxx xxxx"/>
                                        </div>
                                    </div>
                                    <div className="flex items-center border-b border-gray-200">
                                        <button className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">Appliquer</button>
                                    </div>
                                    <div className="flex items-center justify-between py-8">
                                        <p className="font-medium text-xl leading-8 text-black">{productNumber} article(s)</p>
                                        <p className="font-semibold text-xl leading-8 text-orange-600">$485.00</p>
                                    </div>
                                    <button className="w-full text-center bg-orange-500 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-orange-600">Payer</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default MovieShoppingCartPage;