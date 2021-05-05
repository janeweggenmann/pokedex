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

//list Pokemon name and height on page
for (let i = 0; i < 5; i++) {
  if (pokemonList[i].height > 1.5) {
    //if height over 1.5 then call out special large size
    document.write (pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!" + "<br>");
  } else {
    document.write (pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>");
}
}
