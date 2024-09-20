import React from 'react';
import apple from '../../images/apple.webp';
import googleplay from '../../images/google-play.webp';
import logo from '../../images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    return (
        <section className="w-full bg-[#1b1b1b] text-white px-6 py-12">
            <div className="container mx-auto flex flex-col gap-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="col-span-3 flex flex-col gap-2 lg:gap-6">
                        <img
                        src={logo}
                        alt="Website logo"
                        className="w-36 transition-transform duration-300 hover:scale-110"
                        />
                        <div className="flex items-center gap-1 lg:gap-2 text-gray-300">
                            <span>Email:</span>
                            <strong className="hover:text-orange-500 transition-colors">
                                persoadress@boxfun.com
                            </strong>
                        </div>
                        <div className="flex flex-col justify-center gap-1 text-gray-300">
                            <span className="text-sm">SERVICES</span>
                            <strong className="text-lg font-bold">
                                <FontAwesomeIcon icon={faPlus} /> (225) 0789807498
                            </strong>
                        </div>
                    </div>

                    <div className="col-span-6 grid grid-cols-1 lg:flex lg:gap-0 gap-6">
                        <div className="col-span-2 flex flex-col gap-1 lg:gap-4">
                            <h2 className="font-bold text-lg">Lorem, ipsum.</h2>
                            <ul className="flex flex-col text-gray-300">
                                <li className="hover:text-orange-500 transition-colors">Lorem, ipsum dolor.</li>
                                <li className="hover:text-orange-500 transition-colors">Necessitatibus, voluptates veritatis.</li>
                                <li className="hover:text-orange-500 transition-colors">Corrupti, veritatis sint.</li>
                            </ul>
                        </div>

                        <div className="col-span-2 flex flex-col gap-1 lg:gap-4">
                            <h2 className="font-bold text-lg">Assumenda, illum.</h2>
                            <ul className="flex flex-col text-gray-300">
                                <li className="hover:text-orange-500 transition-colors">Lorem, ipsum dolor.</li>
                                <li className="hover:text-orange-500 transition-colors">Necessitatibus, voluptates veritatis.</li>
                                <li className="hover:text-orange-500 transition-colors">Corrupti, veritatis sint.</li>
                            </ul>
                        </div>

                        <div className="col-span-2 flex flex-col gap-1 lg:gap-4">
                            <h2 className="font-bold text-lg">Eveniet, cupiditate?</h2>
                            <ul className="flex flex-col text-gray-300">
                                <li className="hover:text-orange-500 transition-colors">Lorem, ipsum dolor.</li>
                                <li className="hover:text-orange-500 transition-colors">Necessitatibus, voluptates veritatis.</li>
                                <li className="hover:text-orange-500 transition-colors">Corrupti, veritatis sint.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-span-3 flex flex-col gap-4">
                        <h2 className="font-bold text-lg">Souscrire à la newsletter.</h2>
                        <form className="flex">
                            <input
                                type="text"
                                className="flex-grow bg-black focus:border focus:border-orange-500 outline-none p-3 rounded-l-sm"
                                placeholder="Email*"
                            />
                            <button className="bg-orange-500 px-4 py-2 rounded-r-sm transition-transform duration-300 hover:scale-105">
                                Souscrire
                            </button>
                        </form>
                        <div className="flex items-center gap-2 mt-10">
                            <h2 className="text-sm text-gray-300">Suivre :</h2>
                            <div className="flex items-center gap-4">
                                <FontAwesomeIcon
                                icon={faFacebook}
                                className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:scale-125"
                                />
                                <FontAwesomeIcon
                                icon={faTwitter}
                                className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:scale-125"
                                />
                                <FontAwesomeIcon
                                icon={faGithub}
                                className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:scale-125"
                                />
                                <FontAwesomeIcon
                                icon={faInstagram}
                                className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:scale-125"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-[1px] w-full bg-slate-500"></div>

                <div className="lg:self-end flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Téléchargez Fox Fun.</h2>
                    <div className="flex items-center sm:justify-center gap-10">
                        <img
                        src={apple}
                        alt="App Store"
                        className="w-32 transition-transform duration-300 hover:scale-110"
                        />
                        <img
                        src={googleplay}
                        alt="Google Play"
                        className="w-32 transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;




// import React from 'react'
// import apple from '../../images/apple.webp'
// import googleplay from '../../images/google-play.webp'
// import logo from '../../images/Logo.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faA, faPlus } from '@fortawesome/free-solid-svg-icons'


// function Footer() {
//   return (
//     <section className='w-full bg-[#1b1b1b] text-white px-6 py-10'>
//         <div className="container mx-auto flex flex-col gap-10">
//             <div className="grid grid-cols-12 gap-10">
//                 <div className="col-span-3 flex flex-col gap-6">
//                     <img src={logo} alt="Website logo" className='w-36'/>
//                     <div className="flex items-center gap-2 text-gray-300">
//                         <span>Email : </span>
//                         <strong>persoadress@boxfun.com</strong>
//                     </div>
//                     <div className="flex flex-col justify-center gap-1 text-gray-300">
//                         <span className='text-sm'>SERVICES </span>
//                         <strong className='text-lg font-bold'><FontAwesomeIcon icon={faPlus}/> (225) 0789807498</strong>
//                     </div>
//                 </div>
//                 <div className="col-span-6 flex">
//                     <div className="col-span-2 flex flex-col gap-4">
//                         <h2 className='font-bold text-lg'>Lorem, ipsum.</h2>
//                         <ul className='flex flex-col text-gray-300'>
//                             <li>Lorem, ipsum dolor.</li>
//                             <li>Necessitatibus, voluptates veritatis.</li>
//                             <li>Corrupti, veritatis sint.</li>
//                         </ul>
//                     </div>
//                     <div className="col-span-2 flex flex-col gap-4">
//                         <h2 className='font-bold text-lg'>Assumenda, illum.</h2>
//                         <ul className='flex flex-col text-gray-300'>
//                             <li>Lorem, ipsum dolor.</li>
//                             <li>Necessitatibus, voluptates veritatis.</li>
//                             <li>Corrupti, veritatis sint.</li>
//                         </ul>
//                     </div>
//                     <div className="col-span-2 flex flex-col gap-4">
//                         <h2 className='font-bold text-lg'>Eveniet, cupiditate?</h2>
//                         <ul className='flex flex-col text-gray-300'>
//                             <li>Lorem, ipsum dolor.</li>
//                             <li>Necessitatibus, voluptates veritatis.</li>
//                             <li>Corrupti, veritatis sint.</li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="col-span-3 flex flex-col gap-4">
//                     <h2 className='font-bold text-lg'>Souscrire à la newsletter.</h2>
//                     <form className='col-span-4 flex'>
//                         <input type="text" className='col-span-3 bg-black focus:border focus:border-orange-500 outline-none p-3 rounded-l-sm' placeholder='Email*' />
//                         <button className='col-span-1 bg-orange-500 px-2 rounded-r-sm'>Souscrire</button>
//                     </form>
//                     <div className="flex items-center gap-2 mt-10">
//                         <h2 className='text-sm text-gray-300'>Suivre : </h2>
//                         <div className="flex items-center gap-4">
//                             <FontAwesomeIcon icon={faA}/>
//                             <FontAwesomeIcon icon={faA}/>
//                             <FontAwesomeIcon icon={faA}/>
//                             <FontAwesomeIcon icon={faA}/>
//                             <FontAwesomeIcon icon={faA}/>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="h-[1px] w-full bg-slate-500"></div>
//             <div className="self-end flex flex-col gap-4">
//                 <h2>Téléchargez Fox Fun.</h2>
//                 <div className="flex items-center gap-10">
//                     <img src={apple} alt="" />
//                     <img src={googleplay} alt="" />
//                 </div>
//             </div>
//         </div>
//     </section>
//   )
// }

// export default Footer