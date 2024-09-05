import React, { useEffect, useState } from 'react'

import NavBar from '../../components/NavBar/NavBar'
import { Link, useSearchParams } from 'react-router-dom';

function MovieDetailsPage() {


    const [searchParams] = useSearchParams();

    const movieId = searchParams.get('id');

    const [movieDetails, setMovieDetails] = useState()

    const apiKey = "a7370479d17c1c001f3a2bb1dc10dd53"

    const imgBase = "https://image.tmdb.org/t/p/original/";

    const [similarMovies, setSimilarMovies] = useState([])
    
    const getSimilarMovies = () => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=a7370479d17c1c001f3a2bb1dc10dd53')
        .then(response => response.json())
        .then(data => {
            const getResult = data.results;
            const dataSliced = getResult.slice(0, 6)
            setSimilarMovies(dataSliced)
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getSimilarMovies()
    })
    

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setMovieDetails(data)
            console.log(data)
        })
    }, [movieId])

    
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


    return (
        <>
            {/* Petit ecran */}
            <div className="relative lg:hidden min-h-screen bg-cover bg-center" style={{backgroundImage:`url(${`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path||movieDetails?.poster_path}`})`}}>
                <div className="absolute inset-0 bg-black opacity-85"></div>
                <div className="relative z-10 flex items-center justify-center h-full text-white">
                    <div className="lg:hidden min-h-screen bg-cover bg-center text-white p-4 z-10">
                        <NavBar/>
                        <div className="container mx-auto py-10">
                            <div className="flex flex-col gap-10">
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="flex flex-col gap-6">
                                        <h1 className='text-3xl text-center'>{movieDetails?.title}</h1>
                                        <div className="">
                                            <img src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path||movieDetails?.poster_path}`} alt="" />
                                        </div>
                                    </div>
                                    <p className='text-sm'>{movieDetails?.overview}</p>
                                    <ul className="flex gap-4 relative">
                                        <li className='text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 duration-500 ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                        </li>
                                        <li className='text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 duration-500 ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                            </svg>
                                        </li>
                                        <li className='text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 duration-500 ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h2 className='text-2xl font-semibold'>Films similaires</h2>
                                    <div className="max-w-full h-[300px] w-full m-auto py-8 relative group">
                                        <div style={{ backgroundImage: `url(${imgBase}/${similarMovies[currentIndex]?.backdrop_path})` }} className="w-full h-full bg-center bg-cover duration-500"></div>
                                        
                                        <Link to={similarMovies[currentIndex]?.id} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                            <h1 className="text-white text-center text-xl font-bold">{similarMovies[currentIndex]?.title}</h1>
                                        </Link>

                                        {/* Flèche droite */}
                                        <div className="absolute top-1/2 -translate-y-1/2 left-0 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer" onClick={prevSlide}        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                            </svg>
                                        </div>

                                        {/* Flèche gauche */}
                                        <div className="absolute top-1/2 -translate-y-1/2 right-0 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer" onClick={nextSlide}> 
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>
                                    
                                        {/* Points d'indication */}
                                        <div className="flex justify-center py-2 absolute bottom-0 left-0 right-0">
                                            {similarMovies.map((simov, slideIndex) => (
                                            <div key={slideIndex} onClick={() => setCurrentIndex(slideIndex)} className={`cursor-pointer w-10 h-10 rounded-full mx-1 ${ currentIndex === slideIndex ? 'border-2 border-white' : 'border-2 border-gray-400' }`}>
                                                <img className=' w-10 h-10 rounded-full object-cover' src={`${imgBase}/${simov?.backdrop_path}`} alt="" />
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
            <div className="relative max-lg:hidden min-h-screen bg-cover  bg-center" style={{backgroundImage:`url(${`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path||movieDetails?.poster_path}`})`}}>
                <div className="absolute inset-0 bg-black opacity-85"></div>
                <div className="relative z-10 flex items-center justify-center h-full text-white">
                    <div className="max-lg:hidden min-h-screen bg-cover bg-center relative text-white p-4 z-10">
                        <NavBar/>
                        <div className="container mx-auto py-10">
                            <div className="flex flex-col gap-16">
                                <div className="flex flex-col gap-14">
                                    <div className="max-w-6xl mx-auto">
                                        <img src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path||movieDetails?.poster_path}`} alt="" />
                                    </div>
                                    <div className="w-full flex flex-col gap-10">
                                        <div className="flex items-center gap-6">
                                            <h1 className='text-6xl font-bold'>{movieDetails?.title}</h1>
                                            <div className='flex items-center gap-1 relative'>
                                                <small className='text-sm text-yellow-400'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                                    </svg>
                                                </small>

                                                <small className='text-sm text-yellow-400'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                                    </svg>
                                                </small>

                                                <small className='text-sm text-yellow-400'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                                    </svg>
                                                </small>

                                                <small className='text-sm text-white'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                                    </svg>
                                                </small>

                                            </div>
                                        </div>
                                        <p className='text-xl'>{movieDetails?.overview}</p>
                                        <ul className="flex gap-4 relative">
                                            <li className='text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 duration-500 ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>
                                            </li>
                                            <li className='text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 duration-500 ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                                </svg>
                                            </li>
                                            <li className='text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 duration-500 ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                </svg>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h2 className='text-2xl'>Films similaires</h2>
                                    <div className="max-lg:hidden grid grid-cols-6 gap-4">
                                        {similarMovies.map((simov, index) => (
                                            <Link to={`/movie-details?id=${simov.id}`} key={index} className="relative w-full h-64 bg-gray-600">
                                                <img src={`https://image.tmdb.org/t/p/original/${simov.backdrop_path}`} alt="fond" className="w-full h-full object-cover"/>
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

            {/* <div className="max-lg:hidden min-h-screen bg-cover bg-center relative text-white p-4 z-10 " style={{backgroundImage:`url(${`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path||movieDetails?.poster_path}`})`}}>
                <NavBar/>
                <div className="container mx-auto py-10">
                    <div className="flex flex-col gap-16">
                        <div className="flex flex-col gap-14">
                            <div className="max-w-6xl mx-auto">
                                <img src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path||movieDetails?.poster_path}`} alt="" />
                            </div>
                            <div className="w-full flex flex-col gap-10">
                                <div className="flex items-center gap-6">
                                    <h1 className='text-6xl font-bold'>{movieDetails?.title}</h1>
                                    <div className='flex items-center gap-1 relative'>
                                        <small className='text-sm text-yellow-400'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                            </svg>
                                        </small>

                                        <small className='text-sm text-yellow-400'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                            </svg>
                                        </small>

                                        <small className='text-sm text-yellow-400'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                            </svg>
                                        </small>

                                        <small className='text-sm text-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                            </svg>
                                        </small>

                                    </div>
                                </div>
                                <p className='text-xl'>{movieDetails?.overview}</p>
                                <ul className="flex gap-4 relative">
                                    <li className='text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 duration-500 ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                    </li>
                                    <li className='text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 duration-500 ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                        </svg>
                                    </li>
                                    <li className='text-2xl rounded-full p-2 bg-black/50 hover:bg-white/90 duration-500 ease-out border border-gray-700 font-semibold text-orange-500 cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2 className='text-2xl'>Films similaires</h2>
                            <div className="max-lg:hidden grid grid-cols-6 gap-4">
                                {similarMovies.map((simov, index) => (
                                    <div key={index} className="relative w-full h-64 bg-gray-600">
                                        <img src={`https://image.tmdb.org/t/p/original/${simov.backdrop_path}`} alt="fond" className="w-full h-full object-cover"/>
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                            <h1 className="text-white text-center text-xl font-bold">{simov.title}</h1>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default MovieDetailsPage