//IIFE Function
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=30';

  //add pokemon function
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
    }
  }

  function getAll() {
    return pokemonList;
  }

  //Add new list item and button for each pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');

    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item', 'list-group-item-action');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-dark');
    button.setAttribute(
      'data-target',
      '#modal-container',
      'data-toggle',
      'modal'
    );

    pokemonList.appendChild(listItem);
    listItem.appendChild(button);

    //When user clicks on pokemon, show details
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  //pull list of pokemon from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  //load details of pokemon from API
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
        pokemon.weight = details.weight;
        pokemon.typename = pokemon.types;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  //When showing details, load details and show modal
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      let modalBody = document.querySelector('.modal-body');
      let modalTitle = document.querySelector('.modal-title');

      //Clear contents of modal title and body
      modalBody.innerHTML = '';
      modalTitle.innerHTML = '';

      //When modal is created, create h1 and p elements
      let nameElement = document.createElement('h1');
      nameElement.innerText = pokemon.name;

      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;
      imageElement.classList.add('modal-img');

      let heightElement = document.createElement('p');
      heightElement.innerText = 'Height: ' + pokemon.height + 'm';

      let weightElement = document.createElement('p');
      weightElement.innerText = 'Weight: ' + pokemon.weight;

      let typeElement = document.createElement('p');
      typeElement.innerText =
        'Type: ' +
        pokemon.typename
          .map(function(item) {
            return item.type.name;
          })
          .join(', ');

      //Append elements to modal
      modalTitle.append(nameElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typeElement);

      $('#modal-container').modal('toggle');
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

//
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
