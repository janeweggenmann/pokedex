//IIFE Function
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=30';
  //Selecting modal container id from HTML file
  let modalContainer = document.querySelector("#modal-container");

  //add pokemon function
  function add(pokemon) {
    if (typeof pokemon === "object" &&
      "name" in pokemon)
      {
      pokemonList.push(pokemon);
      } else {
        console.log ("this pokemon is invalid");
    }
  }

  function getAll() {
    return pokemonList;
  }

  //Add new list item and button for each pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

	  listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");

    //When user clicks on pokemon, show details
    button.addEventListener('click', function() {
      showDetails(pokemon)
    });
  }

  //pull list of pokemon from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //load details of pokemon from API
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Create a modal when "showModal" function is called
  function showModal (pokemon) {
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");

    //When modal is created, also create a close button
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("close-modal");
    closeButtonElement.innerText = "Close";
    //Hide the modal when the close button is clicked
    closeButtonElement.addEventListener("click", hideModal);

    //When modal is created, create h1 and p elements
    let modalImage = document.createElement('img');
    modalImage.src = pokemon.imageUrl;
    let modalTitle = document.createElement("h1");
    modalTitle.innerText = pokemon.name;
    let modalHeight = document.createElement("p");
    modalHeight.innerText = "Height: " + pokemon.height + "m";
    let modalWeight = document.createElement("p");
    modalWeight.innerText = "Weight: " + pokemon.weight;
    let modalType = document.createElement("p");
    modalType.innerText = "Type: " + pokemon.typename;

    //Append close button, h1, and p to modal
    modal.appendChild(closeButtonElement);
    modal.appendChild(modalImage);
    modal.appendChild(modalTitle);
    modal.appendChild(modalHeight);
    modal.appendChild(modalWeight);
    modal.appendChild(modalType);
    //Append modal to modal container
    modalContainer.appendChild(modal);

    //When showModal function is called, make modal visible
    modalContainer.classList.add("is-visible");
  }

  //To hide the modal, take away the "is visible" class
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  //Hide the modal when the Escape key is pressed
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains ("is-visible")) {
      hideModal ();
    }
  });
  //Hide the modal when you click outside of the modal
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal ();
    }
  });

  //When showing details, load details and show modal
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

//
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
