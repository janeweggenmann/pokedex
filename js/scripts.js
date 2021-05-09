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
]

pokemonList.forEach(function(pokemon) {
  if (pokemon.height > 1.5) {
     document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ") - Wow, that's big!" + "</p>");
  } else {
      document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")" + "</p>");
  }
});
