import { faArrowRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'

function MovieShoppingCartPage() {

    const [moviesShopCart, setMoviesShopCart]= useState([])

    const imgBase = "https://image.tmdb.org/t/p/original/";

    const getMoviesForShopCart = () => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=a7370479d17c1c001f3a2bb1dc10dd53')
        .then(response => response.json())
        .then(data => {
            const getResult = data.results;
            const dataSliced = getResult.slice(0, 3)
            setMoviesShopCart(dataSliced)
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getMoviesForShopCart()
    })


    return (
        <>
            <div className='bg-black bg-opacity-85'>
                <NavBar/>
            </div>
            <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-orange-500">Panier d'achat(s)</h2>
                                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">3 article(s)</h2>
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
                                                    <button className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                        <FontAwesomeIcon className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" icon={faMinus}/>
                                                    </button>
                                                    <input type="text"
                                                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[12px]  text-center bg-transparent"
                                                        placeholder="1"/>
                                                    <button className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                        <FontAwesomeIcon className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" icon={faPlus}/>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                                <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-orange-600">$120.00</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            {/* <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                                <div className="w-full md:max-w-[126px]">
                                    <img src="https://pagedone.io/asset/uploads/1701162866.png" alt="perfume bottle" className="mx-auto rounded-xl"/>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                    <div className="md:col-span-2">
                                        <div className="flex flex-col max-[500px]:items-center gap-3">
                                            <h6 className="font-semibold text-base leading-7 text-black">Musk Rose Cooper</h6>
                                            <h6 className="font-normal text-base leading-7 text-gray-500">Parfum</h6>
                                            <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-orange-600">$120.00</h6>
                                        </div>
                                    </div>
                                    <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                        <div className="flex items-center h-full">
                                            <button className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                <FontAwesomeIcon className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" icon={faMinus}/>
                                            </button>
                                            <input type="text"
                                                className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[12px]  text-center bg-transparent"
                                                placeholder="2"/>
                                            <button className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                <FontAwesomeIcon className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" icon={faPlus}/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                        <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-orange-600">$240.00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                                <div className="w-full md:max-w-[126px]">
                                    <img src="https://pagedone.io/asset/uploads/1701162880.png" alt="perfume bottle" className="mx-auto rounded-xl"/>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                    <div className="md:col-span-2">
                                        <div className="flex flex-col max-[500px]:items-center gap-3">
                                            <h6 className="font-semibold text-base leading-7 text-black">Dusk Dark Hue</h6>
                                            <h6 className="font-normal text-base leading-7 text-gray-500">Parfum</h6>
                                            <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-orange-600">$120.00</h6>
                                        </div>
                                    </div>
                                    <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                        <div className="flex items-center h-full">
                                            <button className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                <FontAwesomeIcon className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" icon={faMinus}/>
                                            </button>
                                            <input type="text"
                                                className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[12px]  text-center bg-transparent"
                                                placeholder="1"/>
                                            <button
                                                className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                <FontAwesomeIcon className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" icon={faPlus}/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                        <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-orange-600">$120.00</p>
                                    </div>
                                </div>
                            </div> */}


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
                                    <p className="font-normal text-lg leading-8 text-black">3 article(s)</p>
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
                                        <p className="font-medium text-xl leading-8 text-black">3 article(s)</p>
                                        <p className="font-semibold text-xl leading-8 text-orange-600">$485.00</p>
                                    </div>
                                    <button className="w-full text-center bg-orange-500 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-orange-600">Payer</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MovieShoppingCartPage;