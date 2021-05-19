let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 0.7,
      type: ["grass", "poison"]
    },
    {
      name: "Butterfree",
      height: 1.1,
      type: ["bug", "flying"]
    },
    {
      name: "Jigglypuff",
      height: 0.5,
      type: ["fairy", "normal"]
    },
    {
      name: "Dewgong",
      height: 1.7,
      type: ["ice", "water"]
    },
    {
      name: "Ledyba",
      height: 1,
      type: ["bug", "flying"]
    },
  ];

  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

	listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

pokemonRepository.add({
  name: "Pikachu",
  height: 0.4,
  type: ["electric"]
  });

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
