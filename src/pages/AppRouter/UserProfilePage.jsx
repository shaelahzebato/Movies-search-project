import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import moi from '../../images/moii.png'
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import UserFavoris from '../../components/UserFavoris/UserFavoris';
import MoviesWatchedByUser from '../../components/MoviesWatchedUser/MoviesWatchedByUser';

function UserProfilePage() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { name: 'Playlist', content: 'Contenus de la table Playlist' },
        { name: 'Films regardés', content: <MoviesWatchedByUser/> }, //'Contenus de la table Films regardés' 
        { name: 'Favoris', content: <UserFavoris/>}, //'Contenus de la table Favoris' 
    ];


    const [userData, setUserData] = useState('');
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token || token === undefined) {
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

    
    if(userData) {
        return (
            <>
                <div className='w-full min-h-screen bg-cover bg-center bg-black'>
                    <NavBar/>
                    <div className="bg-[#1a1919] py-6">
                        <div className="container mx-auto">
                            <Link className='flex items-center gap-4 py-4 hover:text-orange-500 px-2'>
                                <img className='w-24 h-20 object-cover bg-center rounded-md' src={moi} alt="" />
                                <div className="flex flex-col gap-2">
                                    <h2 className='text-xl font-bold text-orange-500'>{userData.datas.nom} {userData.datas.prenoms}</h2>
                                    <Link className='text-sm text-white'>{userData.datas.email}</Link>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="container mx-auto py-10">
                        <div className="w-full">
                            <div className="flex justify-center items-center flex-wrap space-x-1">
                                {tabs.map((tab, index) => (
                                    <button
                                    key={index}
                                    className={`py-2 px-4 text-sm md:text-lg font-semibold focus:outline-none ${
                                        activeTab === index
                                        ? 'border-b-2 border-orange-500 text-gray-300'
                                        : 'text-gray-500 hover:text-orange-500'
                                    }`}
                                    onClick={() => setActiveTab(index)}
                                    >
                                    {tab.name}
                                    </button>
                                ))}
                            </div>
                            <div className="p-4 text-white py-6">
                                <p>{tabs[activeTab].content}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
    else {
        return (
            <>
                <div className="w-full min-h-screen flex items-center justify-center">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <div className="h-8 w-8 rounded-full border-2 border-orange-600 border-dashed animate-spin"></div>
                        <span>Chargement...</span>
                    </div>
                    {/* <p className='text-lg'>Données indisponible, veuillez vérifier votre connexion...</p> */}
                </div>
                <Footer/>
            </>
        )
    }    
}

export default UserProfilePage;