const firstMsg = document.querySelector('#firstMsg');
const secondMsg = document.querySelector('#secondMsg');

const frases = [
    "Olita",
    "Buena Mocita",
    "Mi Musa",
    "Bonita",
    "Hermosa",
]

const complemento = [
    "te amo",
    "te quiero",
    "te extraño",
    "eres hermosa",
    "me encantas",
    "me gustas",
    "me emocionas",
    "te quiero conmigo",
    "amorcito de mi vida"
]

function showMessage(){

    const number1 = Math.floor(Math.random() * frases.length);
    const number2 = Math.floor(Math.random() * complemento.length);
    const phraseR = frases[number1];
    const complementoR = complemento[number2];

    firstMsg.innerText = phraseR;
    secondMsg.innerText = complementoR;
}

const button = document.querySelector('.button');
    button.addEventListener('click', showMessage);