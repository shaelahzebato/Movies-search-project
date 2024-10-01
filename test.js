
// const franceRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
// const ivoryCoastRegex = /^(\+225|0)([0-9]{8})$/;

// const ciPhoneRegex = /^(0[1579]\d{8})$/; // Numérotation à 10 chiffres pour Côte d'Ivoire
// const ciIntlPhoneRegex = /^\+225(0[1579]\d{8})$/; // Format international Côte d'Ivoire
// const frPhoneRegex = /^(0[1-9]\d{8}|(\+33)[1-9]\d{8})$/; // Numéro français, local et international


// const validate = (phoneNumber) => {
    
//     if (!frPhoneRegex.test(phoneNumber)) {
//         console.log("Le numéro n'est pas valide pour la france.");
//     }
//     else if(!ivoryCoastRegex.test(phoneNumber)) {
//         console.log("Le numéro n'est pas valide pour la ci.");
//     }
//     else if(frPhoneRegex.test(phoneNumber)) {
//         console.log("Le numéro est bien valide pour la france.");
//     }
//     else if(ivoryCoastRegex.test(phoneNumber)) {
//         console.log("Le numéro est bien valide pour la ci.");
//     }
//     else {
//         console.log("Boff");
        
//     }
// }

// const number = +33123456789 ;

// validate(number)

// const ciPhoneRegex = /^(0[1579]\d{8})$/;
// const ciIntlPhoneRegex = /^\+225(0[1579]\d{8})$/;

const ciPhoneRegex = /^(0[1579]\d{8})$/; // Numérotation à 10 chiffres pour Côte d'Ivoire (local)
    const ciIntlPhoneRegex = /^\+225(0[1579]\d{8})$/; // Format international pour la Côte d'Ivoire
    const frPhoneRegex = /^0[1-9]\d{8}$/; // Numéro local pour la France
    const frIntlPhoneRegex = /^\+33[1-9]\d{8}$/; // Format international pour la France

    
const handlePhoneNumberValidation = (phone) => {
  if (ciPhoneRegex.test(phone)) {
    console.log("Numéro valide pour la Côte d'Ivoire (format local)");
  } else if (ciIntlPhoneRegex.test(phone)) {
    console.log("Numéro valide pour la Côte d'Ivoire (format international)");
  } else {
    console.log("Numéro invalide.");
  }
};

let phone = "0789807498"
handlePhoneNumberValidation(phone)

{/* <div className="">
                                                    <p>Retirer des favoris</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                    </svg>
                                                </div>
                                                :
                                                <div className="">
                                                    <p>Ajouter en favoris</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                    </svg>
                                                </div> */}