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

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    const [userData, setUserData] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token non trouvé !');
                return;
            }

            try {
                const response = await fetch('https://symbian.stvffmn.com/nady/public/api/v1/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("data =>>> ", data);
                    setUserData(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message);
                }
            } catch (err) {
                setError('Erreurrrrrr.');
            }
        };

        fetchUserData();
    }, []);

   
    
    return (
        <div className='min-h-screen bg-center bg-cover' style={{backgroundImage:`url(${homepagebg})`}}>
            <NavBar/>
            <div className="h-[85%] lg:w-4/6 mx-auto flex flex-col gap-10 items-center justify-center">
                <h1 className='mt-32 md:mt-2 text-white text-3xl lg:text-4xl flex flex-col items-center justify-center gap-2'>
                    {userData ? <p className='mb-10 text-center'>Bonjour <strong className='font-bold text-orange-500'>{userData?.datas?.nom}...</strong></p> : ""}
                    <p className='text-center'>Bienvenue sur <strong className='text-orange-500'>BoxFun...</strong></p>
                    <p className='text-center'>Recherchez vos films, des plus epoustouflants</p>
                    <p className='text-center'>ici <FontAwesomeIcon className='text-orange-500 font-semibold' icon={faAngleDoubleDown}/>!</p>
                </h1>
                <form onSubmit={e => handleSubmit(e)} className="w-full md:w-3/6 lg:w-3/6 mx-auto px-4">
                    <div className=" flex flex-col gap-4">
                        <input type="text" value={movieNameEntered} onChange={handleChange} className='border p-4 rounded-md focus:outline-none' placeholder="Entrez le nom d'un film..."/>
                        <Link to={`/movies-results?name=${movieNameEntered}`} className='bg-orange-500 rounded-md text-white borde p-3 w-full text-center hover:bg-orange-600 font-semibold'>Rechercher</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MovieHomePage;