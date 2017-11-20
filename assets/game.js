// javascript program for hangman
// Zack Hagan
// 11/5/17

var allPhrases, abc, guessedLet, unguessedLet, attempts, phrase, phraseHidden, textInput, letter;

function setup() {
    // starting phrase options and alphabet
    allPhrases = ['MINI MOOG', 'BUCHLA', 'ARP TWENTY SIX HUNDRED', 'GRANULAR SYNTHESIS', 'AKAI MPC', 'MUTABLE INSTRUMENTS', 'SAMPLERS', 'DRUM MACHINES'];
    abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    guessedLet = [];
    unguessedLet = abc;
    //start with 6 'lives' or attempts
    attempts = 6;
    //hide win and lose statements, show input
    document.getElementById('lose').style.display = 'none';
    document.getElementById('win').style.display = 'none';
    document.getElementById('input').style.display = 'block';
    // console.log('setupExecuted');
}

setup();
//select a random phrase from allPhrases
phrase = allPhrases[Math.floor(Math.random()*(allPhrases.length))];
// console.log(phrase);

//hide unguessed letters in phraseHidden
phraseHidden = hide(phrase);

function hide(x) {
    for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < unguessedLet.length; j++) {
            if (x.charAt(i) == unguessedLet[j]) {
                x = x.replace(x.charAt(i),'_');
            }
        }
    }
    // console.log('hideExecuted');
    return x;
}
// console.log(phraseHidden);



//refresh HTML
function refreshDisp() {
    document.getElementById('phraseDisp').innerHTML = phraseHidden;
    document.getElementById('attemptsRem').innerHTML = attempts;
    document.getElementById('guessed').innerHTML = guessedLet.join(', ');
    document.getElementById('unguessed').innerHTML = unguessedLet.join(', ');
    // console.log('refreshDispExecuted');
}

//execute validation upon keyup within HTML input form
function validateLetter() {
    textInput = document.getElementById('newLetter').value;
    textInput = textInput.replace(/\W|\d/g, '').substr(0, 1).toUpperCase();
    document.getElementById('newLetter').value = textInput;
    // console.log('validateLetter')
}

//execute guess entry script upon click of HTML form submit button
function newGuess() {
    letter = document.getElementById('newLetter').value;
    const index1 = unguessedLet.indexOf(letter);
    const index2 = guessedLet.indexOf(letter);
    const index3 = phrase.indexOf(letter);
    //if the letter is a new guess
    if (index1 !== -1 && index2 == -1) {
        // console.log('new guess');
        //then remove letter from unguessed, and add to guessed
        unguessedLet.splice(index1,1);
        guessedLet.push(letter);
        //then, if the new letter is not in phrase, take away an attempt and go to next image frame
        if (index3 == -1) {
            // console.log('notInPhrase');
            attempts--;
            document.getElementById('hangman-img').style.marginLeft = '-' + ((6 - attempts)*100) + '%';
        } else {
        //if the new letter is in the phrase, reveal it using hide() again

           phraseHidden = hide(phrase);
           // console.log('inPhrase');
           // console.log(phraseHidden);
        }
        // console.log(attempts);
    } else {
        // console.log('notNewGuess');
        // console.log(attempts);
    }
    //clear letter from HTML form
    document.getElementById('newLetter').value = '';
    //refresh HTML displayed variables
    refreshDisp();
    // console.log('newGuessExecuted')
    checkWin();
}

function checkWin() {
    const index = phraseHidden.indexOf('_');
    if ((index !== -1) && (attempts == 0)) { //lose
        document.getElementById('phraseDisp').innerHTML = phrase;
        document.getElementById('input').style.display = 'none';
        document.getElementById('lose').style.display = 'block';
    }
    else if ((index == -1) && (attempts >= 0)) {  //win
        document.getElementById('input').style.display = 'none';
        document.getElementById('win').style.display = 'block';
        var audio = new Audio('./assets/sounds/flux.mp3');
        audio.play();
    }
}
