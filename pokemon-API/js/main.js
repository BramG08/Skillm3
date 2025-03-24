const pokemonImage = document.getElementById("js--pokemon-image");
const pokemonText = document.getElementById("js--pokemon-text");
const catchButton = document.getElementById("js--catch-button");

let randomNumber = Math.floor(Math.random() * 250 + 1);

fetch("https://pokeapi.co/api/v2/pokemon/" + randomNumber)
    .then(response => response.json())
    .then(realData => {
        pokemonImage.src = realData.sprites.front_default;
    });

    
let gamePlayed = false;

catchButton.onclick = function() {
    if (gamePlayed) return;

    let catchNumber = Math.floor(Math.random() * 2);
    
    if (catchNumber === 0) {
        pokemonText.innerText = "The Pokémon is not caught! Try again.";
        pokemonText.style.color = "red";
    } else {
        pokemonText.innerText = "The Pokémon is caught! Great job!";
        pokemonText.style.color = "green";
    }

    catchButton.disabled = true;
    catchButton.style.backgroundColor = "gray";
    gamePlayed = true;
};
