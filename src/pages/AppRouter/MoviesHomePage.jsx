import React, { useEffect, useState } from 'react'

import homepagebg from '../../images/accueil–1.png'
import NavBar from '../../components/NavBar/NavBar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'


function MovieHomePage() {

    const [movieNameEntered, setMovieNameEntered] = useState("");
 
    const handleChange = (e) => {
        console.log(e.target.value);
        setMovieNameEntered(e.target.value)
    }


    return (
        <div className='h-screen bg-cover' style={{backgroundImage:`url(${homepagebg})`}}>
            <NavBar/>
            <div className="h-[85%] lg:w-4/6 mx-auto flex flex-col gap-10 items-center justify-center">
                <h1 className='text-white text-3xl lg:text-4xl flex flex-col items-center justify-center gap-2'>
                    <p className='text-center'>Bienvenue sur <strong className='text-orange-500'>BoxFun...</strong></p>
                    <p className='text-center'>Recherchez vos films, des plus epoustouflants</p>
                    <p className='text-center'>ici <FontAwesomeIcon className='text-orange-500 font-semibold' icon={faAngleDoubleDown}/>!</p>
                </h1>
                <form className="w-full md:w-3/6 lg:w-3/6 mx-auto px-4">
                    <div className=" flex flex-col gap-4">
                        <input type="text" value={movieNameEntered} onChange={handleChange} className='border p-2 focus:outline-none' placeholder="Entrez le nom d'un film..."/>
                        <Link to={`/movies-results?name=${movieNameEntered}`} className='bg-orange-500 rounded-sm text-white borde p-3 w-full text-center hover:bg-orange-600 font-semibold'>Rechercher</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MovieHomePage;