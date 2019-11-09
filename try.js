const tryElement = document.getElementById('try');
const tryText = tryElement.innerText;
tryElement.innerText = 'bye Idiot!';
console.log({'before':tryText, 'after':tryElement.innerText});