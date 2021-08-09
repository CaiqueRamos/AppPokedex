const app = document.getElementById("appList");

const fetchPokemon = () => {

    const getPromisePokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemons = []

    for (let i = 1; i < 150; i++) {
        pokemons.push(fetch(getPromisePokemon(i)).then(response => response.json()))
    }

    const listPokemons = document.getElementById("appList");

    Promise.all(pokemons)
        .then(unicPokemon => {

            document.getElementById("listPoke").addEventListener('click', function () {

                const results = unicPokemon.reduce((accumulator, pokemons) => {
                    accumulator += `
                        <li class="pokemon--card">
                            <img src= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemons.id}.png" alt="">
                            <h2 class="pokemon--title">
                                ${pokemons.name}
                            </h2>
                        </li>`
                    return accumulator;
                }, '')
                listPokemons.innerHTML = results
            })

            const valueInput = document.getElementById("unicPoke");
            document.getElementById("searchPoke").addEventListener('click', function () {

                const results = unicPokemon.reduce((accumulator, unicPokemon) => {

                    if (valueInput.value === unicPokemon.name) {
                        accumulator += `
                        <li class="pokemon--card">
                            <img src= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${unicPokemon.id}.png" alt="">
                            <h2 class="pokemon--title">
                                ${unicPokemon.name}
                            </h2>
                        </li>`
                    } 
                    return accumulator;
                }, '')

            if(results === ""){
                window.alert("Digite um pokemon valido, ou selecione a opção GO! para listar todos opções possiveis")
            } else {
                listPokemons.innerHTML = results
            }
                
            });
        })
}


fetchPokemon();