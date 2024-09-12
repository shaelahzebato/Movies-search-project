import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import homepagebg from '../../images/accueil–1.png'
import logo from '../../images/Logo.png'
import toast from 'react-hot-toast';

//S'inscrire
function SignUp() {
    
    const [email, setEmail] =  useState("");
    const [password, setPassword] =  useState("");
    const [username, setUsername] =  useState("");
    const [userSurname, setUserSurname] =  useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [country, setCountry] = useState("")
    const [countryList, setCountryList] = useState([])
    const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        username: "",
        userSurname: "",
        phoneNumber: ""
    });

    
    // Expressions régulières pour valider les numéros de téléphone
    const ciPhoneRegex = /^(0[1579]\d{8})$/; // Numérotation à 10 chiffres pour Côte d'Ivoire (local)
    const ciIntlPhoneRegex = /^\+225(0[1579]\d{8})$/; // Format international pour la Côte d'Ivoire
    const frPhoneRegex = /^0[1-9]\d{8}$/; // Numéro local pour la France
    const frIntlPhoneRegex = /^\+33[1-9]\d{8}$/; // Format international pour la France

    // Fonction de validation
    const enteredDataValidation = () => {
        let valid = true;
        let newErrors = {};

        // Validation de l'email
        if (!email) {
            newErrors.email = "L'email est requis.";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "L'email n'est pas valide.";
            valid = false;
        }

        // Validation du mot de passe
        if (!password) {
            newErrors.password = "Le mot de passe est requis.";
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
            valid = false;
        }

        // Validation du nom d'utilisateur
        if (!username) {
            newErrors.username = "Le nom d'utilisateur est requis.";
            valid = false;
        } else if (username.length < 3) {
            newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères.";
            valid = false;
        }

        // Validation du prenom d'utilisateur
        if (!userSurname) {
            newErrors.userSurname = "Le prenom d'utilisateur est requis.";
            valid = false;
        } else if (userSurname.length < 3) {
            newErrors.userSurname = "Le prenom d'utilisateur doit contenir au moins 3 caractères.";
            valid = false;
        }

        // Validation du téléphone d'utilisateur
        if (!phoneNumber) {
            newErrors.phoneNumber = "L'email est requis.";
            valid = false;
        }
        else if (!ciIntlPhoneRegex.test(phoneNumber)) {
        // else if (!frPhoneRegex.test(phoneNumber) || !frIntlPhoneRegex.test(phoneNumber) || !ciPhoneRegex.test(phoneNumber) || !ciIntlPhoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = "Le numéro n'est pas valide.";
            valid = false;
        }
        
            
        setErrors(newErrors);
        return valid;
    }


    const register = (e) => {
        e.preventDefault()
        if(enteredDataValidation()) {
            fetch('https://symbian.stvffmn.com/nady/public/api/v1/register', {
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
                    telephone: phoneNumber,
                    pays_id: country
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log("Les de l'utilisateur inscrit :: ", data)
                localStorage.setItem('token', data.access_token);
                if(data.success) {
                    toast.success(data.message)
                    setTimeout(() => {
                        window.location.href = '/signin';
                    }, 3000)
                }
                else {
                    toast.error(data.message)
                }
                console.log("data :: ", data)
    
            })
            .catch(error => console.error('Error:', error));
        }
    }

    console.log("phone number > ", typeof phoneNumber);
    

    useEffect(() => {
        console.log("Coucou");
        fetch('https://symbian.stvffmn.com/nady/public/api/v1/pays', {
            method: 'GET',
            headers: {
              'Accept': 'application/json', // Spécifiez que vous attendez du JSON en réponse
            },
        })
        .then((response) => response.json()).then((data) => {
            console.log("Coucou pays > ", data.datas);
            setCountryList(data.datas)
        })    
    }, [])
    


    

    // nadi2024 jaco2024 > kouadjav@en.ci
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
                                    className={`w-full px-4 py-4 bg-[#141314] rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.username ? "border border-red-500 focus:ring-0" : ""}`}
                                    placeholder="Entrez votre nom"
                                    />
                                    {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
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
                                    className={`w-full px-4 py-4 bg-[#141314] rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.userSurname ? "border border-red-500 focus:ring-0" : ""}`}
                                    placeholder="Entrez votre prénom"
                                    />
                                    {errors.userSurname && <p className="text-red-500 text-xs italic">{errors.userSurname}</p>}
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
                                    className={`w-full px-4 py-4 bg-[#141314] rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.email ? "border border-red-500 focus:ring-0" : ""}`}
                                    placeholder="Entrez votre email"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-white text-lg font-medium mb-2" htmlFor="password">
                                    Mot de passe
                                    </label>
                                    <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"} // Bascule entre text et password
                                    id="password"
                                    className={`w-full px-4 py-4 bg-[#141314] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.password ? "border border-red-500 focus:ring-0" : ""}`}
                                    placeholder="Entrez votre password"
                                    />
                                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                                    <div className="mt-2">
                                        <label className="text-gray-600 text-sm">
                                        <input
                                            type="checkbox"
                                            className="mr-2 leading-tight"
                                            checked={showPassword}
                                            onChange={() => setShowPassword(!showPassword)}
                                        />
                                        Afficher le mot de passe
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white text-lg font-medium mb-2" htmlFor="phone">
                                    Téléphone
                                    </label>
                                    <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={phoneNumber}
                                    onChange={(event) => setPhoneNumber(event.target.value.replace(/\s+/g, ''))} // Enlever les espaces
                                    className={`w-full px-4 py-4 bg-[#141314] rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.phoneNumber ? "border border-red-500 focus:ring-0" : ""}`}
                                    placeholder="Entrez votre numéro de téléphone"
                                    required
                                    />
                                    {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
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
                                        {countryList.map((pays, index) => (
                                            <option key={index} value={pays.id}>{pays.label}</option>
                                        ))}
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