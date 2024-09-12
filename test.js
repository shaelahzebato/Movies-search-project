
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