import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import moi from '../../images/moii.png'
import { Link } from 'react-router-dom';

function UserAccountPage() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { name: 'Playlist', content: 'Contenus de la table Playlist' },
        { name: 'Films regardés', content: 'Contenus de la table Films regardés' },
        { name: 'Favoris', content: 'Contenus de la table Favoris' },
    ];

    return (
        <div className='w-full h-screen bg-black'>
            <NavBar/>
            <div className="bg-slate-800 py-6">
                <div className="container mx-auto">
                    <Link className='flex items-center gap-4 py-4 hover:text-orange-500 px-2'>
                        <img className='w-24 h-20 object-cover bg-center rounded-md' src={moi} alt="" />
                        <div className="flex flex-col gap-2">
                            <h2 className='text-xl font-bold text-orange-500'>Nadia Karène</h2>
                            <Link className='text-sm text-white'>nadiakareneshaelah@gmail.com</Link>
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
    )
}

export default UserAccountPage;