import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import homepagebg from '../../images/accueil–1.png'
import logo from '../../images/Logo.png'

//S'inscrire
function SignUp() {
    
    const [email, setEmail] =  useState("");
    const [password, setPassword] =  useState("");
    const [username, setUsername] =  useState("");
    const [userSurname, setUserSurname] =  useState("");
    const [phone, setPhone] = useState("")
    const [country, setCountry] = useState("")


    const register = (e) => {
        e.preventDefault()
        fetch('http://symbian.stvffmn.com:10050/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                nom: username,
                prenoms: userSurname,
                email: email,
                password: password,
                telephone: phone,
                pays_id: 1
            }),
        })
        .then(response => response.json())
        .then(data => console.log("data :: ", data))
        .catch(error => console.error('Error:', error));

    }
    
    return (
        <div className='min-h-screen bg-center bg-cover' style={{backgroundImage:`url(${homepagebg})`}}>
            <div className="container mx-auto py-10 px-4 lg:px-0">
                <div className="max-w-4xl mx-auto bg-mycolorr bg-opacity-95 text-white rounded-sm mt-0 md:mt-10">
                    <div className="w-3/4 mx-auto py-14 flex flex-col gap-10">
                        <Link to={"/"} className="flex items-center justify-center">
                            <img className='w-20' src={logo} alt="Website logo" />
                        </Link>
                        <form onSubmit={register} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                                <div className="mb-4">
                                    <label className="block text-white text-lg font-medium mb-2" htmlFor="name">
                                    Nom
                                    </label>
                                    <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-4 bg-[#141314] rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    placeholder="Entrez votre nom"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block ttext-white text-lg font-medium mb-2" htmlFor="surname">
                                    Prénom(s)
                                    </label>
                                    <input
                                    value={userSurname}
                                    onChange={(e) => setUserSurname(e.target.value)}
                                    type="text"
                                    id="surname"
                                    className="w-full px-4 py-4 bg-[#141314] rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    placeholder="Entrez votre prénom"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white text-lg font-medium mb-2" htmlFor="email">
                                    Email
                                    </label>
                                    <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-4 bg-[#141314] rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    placeholder="Entrez votre email"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-white text-lg font-medium mb-2" htmlFor="password">
                                    Mot de passe
                                    </label>
                                    <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-4 bg-[#141314] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    placeholder="Entrez votre password"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white text-lg font-medium mb-2" htmlFor="phone">
                                    Téléphone
                                    </label>
                                    <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-4 bg-[#141314] rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    placeholder="Entrez votre numéro de téléphone"
                                    required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-white text-lg font-medium mb-2" htmlFor="country">
                                    Pays
                                    </label>
                                    <select
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full px-4 py-4 bg-[#141314] rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    required
                                    >
                                        <option value="" disabled>Selectionnez votre pays</option>
                                        <option value="CI">Côte D'ivoire</option>
                                        <option value="US">Etat Unis</option>
                                        <option value="CA">Canada</option>
                                        <option value="FR">France</option>
                                        <option value="DE">Allemagne</option>
                                        <option value="IN">Inde</option>
                                        <option value="BR">Brésil</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-sm transition duration-300">
                                S'inscrire
                            </button>
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

export default SignUp;