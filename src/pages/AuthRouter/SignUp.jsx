import React from 'react'
import { Link } from 'react-router-dom'

import homepagebg from '../../images/accueil–1.png'
import logo from '../../images/Logo.png'

//S'inscrire
function SignUp() {
    return (
        <div className='h-screen bg-cover' style={{backgroundImage:`url(${homepagebg})`}}>
            <div className="container mx-auto py-10">
                <div className="max-w-xl mx-auto bg-mycolorr bg-opacity-75 text-white rounded-md">
                    <div className="w-3/4 mx-auto py-14 flex flex-col gap-10">
                        <Link to={"/"} className="flex items-center justify-center">
                            <img className='w-20' src={logo} alt="Website logo" />
                        </Link>
                        <form className="flex flex-col gap-4">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                <label for="floating_first_name" className="peer-focus:font-medium absolute text-[1rem] px-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 font-lato">Nom ou Pseudo</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="email" name="floating_email" id="floating_email" className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                <label for="floating_email" className="peer-focus:font-medium absolute text-[1rem] px-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 font-lato">Adresse email</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="password" name="floating_password" id="floating_password" className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                <label for="floating_password" className="peer-focus:font-medium absolute text-[1rem] px-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 font-lato">Mot de passe</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-[1rem] px-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 font-lato">Confirmation de mot de passe</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                <label for="floating_phone" className="peer-focus:font-medium absolute text-[1rem] px-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 font-lato">Téléphone (078-980-7498)</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_company" id="floating_company" className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                <label for="floating_company" className="peer-focus:font-medium absolute text-[1rem] px-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2">Pays</label>
                            </div>
                            <button type="submit" className="font-lato text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-[.2rem] text-sm w-full sm:w-auto px-5 py-2.5 text-center">S'inscrire</button>
                        </form>
                        <div className="flex flex-col gap-4 items-center">
                            <p className='text-center'>Vous avez déjà un compte ? <Link to={"/signin"} className='text-orange-500 ml-2'>Connectez-vous ici !</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp