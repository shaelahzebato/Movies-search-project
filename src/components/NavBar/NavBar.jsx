import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/Logo.png'
import moi from '../../images/moii.png'

function NavBar() {

    const [isOpen, setIsOpen] = useState(false);
    const [isReOpen, setIsReOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    // const token = localStorage.getItem('token');

    console.log("isAuthenticated ::: ", isAuthenticated);

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token');
        setIsAuthenticated(false)
        window.location.href = '/';
    };

    return (
        <div className='container mx-auto'>
            {isAuthenticated ? 
                //Utilisateur connecté
                <nav className="flex justify-between items-center py-4 z-50">
                    <Link to={'/'} className="flex justify-between items-center gap-3">
                        <img className='w-24' src={logo} alt="Logo" />
                        <div className="text-white">
                            <p>Votre filmographie</p>
                            <p>epoustouflant</p>
                        </div>
                    </Link>
                    {/**Petit ecran */}
                    <div className="lg:hidden text-orange-500 cursor-pointer">
                        <div className="relative inline-block">
                            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-orange-500 focus:outline-none ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            {isOpen && (
                                <div className={`fixed top-0 right-0 w-full h-32 flex items-center justify-end px-10 bg-black text-white transform transition-transform duration-300 ease-in-out z-50`}>
                                    <div className="flex flex-col items-end justify-center gap-6">
                                        <button onClick={() => setIsOpen(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <div className="flex items-center">
                                            <div className="relative inline-block text-left">
                                                <button onClick={() => setIsReOpen(!isReOpen)} className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-orange-500 focus:outline-none ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                                    </svg>
                                                </button>
                                                {isReOpen && (
                                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-sm shadow-lg text-white z-50 bg-black bg-opacity-75 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="flex flex-col gap-6">
                                                            <Link className='flex items-center gap-2 border-b border-gray-600 py-4 hover:text-orange-500 px-2'>
                                                                <img className='w-10 h-10 object-cover bg-center rounded-full' src={moi} alt="" />
                                                                <span>Nadia Karène</span>
                                                            </Link>
                                                            <Link to={'/my-account'} className='flex items-center gap-2 hover:text-orange-500 px-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                                </svg>
                                                                <span>Profile</span>
                                                            </Link>
                                                            <button className='flex items-center gap-2 px-2 bg-orange-500 hover:bg-orange-600 text-white rounded-b-sm  py-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path d="M1.82209 15.9999C1.46654 15.9999 1.16283 15.874 0.910981 15.6221C0.659129 15.3703 0.533203 15.0666 0.533203 14.711V1.73322C0.533203 1.37767 0.659129 1.07397 0.910981 0.822114C1.16283 0.570262 1.46654 0.444336 1.82209 0.444336H7.95543V1.44434H1.82209C1.74802 1.44434 1.68135 1.47397 1.62209 1.53322C1.56283 1.59248 1.5332 1.65915 1.5332 1.73322V14.711C1.5332 14.7851 1.56283 14.8517 1.62209 14.911C1.68135 14.9703 1.74802 14.9999 1.82209 14.9999H7.95543V15.9999H1.82209ZM12.0888 11.5999L11.3554 10.8888L13.5332 8.73322H5.68876V7.711H13.511L11.3332 5.55545L12.0665 4.82211L15.4665 8.24434L12.0888 11.5999Z" fill="currentColor"></path>
                                                                </svg>
                                                                <button onClick={logout}>Se deconnecter</button>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <Link to={'/movies-shopping-cart'} className='text-orange-500 relative px-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/**Grand ecran */}
                    <div className="max-lg:hidden flex justify-between items-center gap-6">
                        <div className="relative inline-block text-left">
                            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-orange-500 focus:outline-none ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>
                            </button>
                            {isOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-sm shadow-lg text-white z-50 bg-black bg-opacity-75 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="flex flex-col gap-6">
                                        <Link className='flex items-center gap-2 border-b border-gray-600 py-4 hover:text-orange-500 px-2'>
                                            <img className='w-10 h-10 object-cover bg-center rounded-full' src={moi} alt="" />
                                            <span>Nadia Karène</span>
                                        </Link>
                                        <Link to={"/my-account"} className='flex items-center gap-2 hover:text-orange-500 px-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                            <span>Profile</span>
                                        </Link>
                                        <button className='flex items-center gap-2 px-2 bg-orange-500 hover:bg-orange-600 text-white rounded-b-sm  py-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M1.82209 15.9999C1.46654 15.9999 1.16283 15.874 0.910981 15.6221C0.659129 15.3703 0.533203 15.0666 0.533203 14.711V1.73322C0.533203 1.37767 0.659129 1.07397 0.910981 0.822114C1.16283 0.570262 1.46654 0.444336 1.82209 0.444336H7.95543V1.44434H1.82209C1.74802 1.44434 1.68135 1.47397 1.62209 1.53322C1.56283 1.59248 1.5332 1.65915 1.5332 1.73322V14.711C1.5332 14.7851 1.56283 14.8517 1.62209 14.911C1.68135 14.9703 1.74802 14.9999 1.82209 14.9999H7.95543V15.9999H1.82209ZM12.0888 11.5999L11.3554 10.8888L13.5332 8.73322H5.68876V7.711H13.511L11.3332 5.55545L12.0665 4.82211L15.4665 8.24434L12.0888 11.5999Z" fill="currentColor"></path>
                                            </svg>
                                            <button onClick={logout}>Se deconnecter</button>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link to={'/movies-shopping-cart'} className='text-orange-500 relative px-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </Link>
                    </div>
                </nav>

            :
                //Utilisateur connecté
                <nav className="flex justify-between items-center py-4 z-50">
                    <Link to={'/'} className="flex justify-between items-center gap-3 lg:gap-6">
                        <img className='w-24' src={logo} alt="Logo" />
                        <div className="text-white">
                            <p>Votre filmographie</p>
                            <p>epoustouflant</p>
                        </div>
                    </Link>
                    {/**Petit ecran */}
                    <div className="lg:hidden">
                        <div className="relative inline-block">
                            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-orange-500 focus:outline-none ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>

                            {isOpen && (
                                <div className={`fixed top-0 right-0 w-full h-32 flex items-center justify-end px-10 bg-black text-white transform transition-transform duration-300 ease-in-out z-50`}>
                                    <div className="flex flex-col items-end justify-center gap-6">
                                        <button onClick={() => setIsOpen(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <div className="flex items-center">
                                            <div className="relative inline-block text-left">
                                                <button onClick={() => setIsReOpen(!isReOpen)} className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-orange-500 focus:outline-none ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                                    </svg>
                                                </button>
                                                {isReOpen && (
                                                    <div className="origin-top-right absolute right-0 mt-2 w-56 py-4 rounded-sm shadow-lg text-white z-50 bg-black bg-opacity-75 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="flex justify-center gap-6 px-4">
                                                            <Link to={'/signin'} className='flex items-center gap-2 text-white p-2 bg-orange-500 rounded-md font-lato transform transition duration-300 hover:scale-105 hover:bg-orange-600 hover:text-white'>
                                                                <button className='text-sm'>Connexion</button>
                                                            </Link>
                                                            <Link to={'/signup'} className='flex items-center gap-2 text-white p-1.5 bg-black/35 border border-orange-600 rounded-md font-lato hover:bg-black/45 transform transition duration-300 hover:scale-105 hover:text-white'>
                                                                <button className='text-sm'>Inscription</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/**Grand ecran */}
                    <div className="max-lg:hidden flex justify-between items-center gap-4">
                        <Link to={'/signin'} className='flex items-center gap-2 text-white p-2 bg-orange-500 rounded-md font-lato transform transition duration-300 hover:scale-105 hover:bg-orange-600 hover:text-white'>
                            <button className='text-sm'>Connexion</button>
                        </Link>
                        {/* <div className="h-6 w-px bg-white mx-4"></div> */}
                        <Link to={'/signup'} className='flex items-center gap-2 text-white p-1.5 bg-black/35 border border-orange-600 rounded-md font-lato hover:bg-black/45 transform transition duration-300 hover:scale-105 hover:text-white'>
                            <button className='text-sm'>Inscription</button>
                        </Link>
                    </div>
                </nav>

            }
        </div>
    )
}

export default NavBar;