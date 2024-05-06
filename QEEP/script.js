document.addEventListener('DOMContentLoaded', function() {
    let gameData;
    const main = document.querySelector('main');
    const playBtn = document.querySelector('#play');
    const pokemonImage = document.querySelector('#pokemon-image');
    const choices = document.querySelector('#choices'); 
    const textOverlay = document.querySelector('#text-overlay');

    addAnswerHandler();
    playBtn.addEventListener('click', fetchData);

    async function fetchData() {
        resetImage();
        gameData = await window.getPokeData();
        console.log(gameData);
        showSilhouette();
        displayChoices();
    }

    function resetImage(){
        pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
        main.classList.add('fetching');
        main.classList.remove('revealed');
    }

    function showSilhouette(){
        main.classList.remove('fetching');
        pokemonImage.src = gameData.correct.image;
    }


    function displayChoices(){
        const {pokemonChoices} = gameData;
        const choicesHTML = pokemonChoices.map(({name}) => {
            return `<button data-name="${name}">${name}</button>`
        }).join('');

        choices.innerHTML = choicesHTML;
    }

    function addAnswerHandler(){
        choices.addEventListener('click', e => {
            const { name } = e.target.dataset;
            const resultsClass = (name === gameData.correct.name) ? 
                'correct' : 'incorrect';
            
            
            e.target.classList.add(resultsClass);
            revealPokemon();
            
        });
    } 

    function revealPokemon(){
        main.classList.add('revealed'); 
        textOverlay.textContent = `${gameData.correct.name}`;
    }

});


