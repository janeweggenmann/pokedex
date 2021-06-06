let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=300";function n(t){"object"==typeof t&&"name"in t&&e.push(t)}return{add:n,getAll:function(){return e},addListItem:function(e){let t=document.querySelector(".list-group"),n=document.createElement("li");n.classList.add("group-list-item","list-group-item-action");let o=document.createElement("button");o.innerText=e.name,o.classList.add("btn","btn-dark"),o.setAttribute("data-target","#modal-container","data-toggle","modal"),t.appendChild(n),n.appendChild(o),o.addEventListener("click",function(){!function(e){pokemonRepository.loadDetails(e).then(function(){let t=document.querySelector(".modal-body"),n=document.querySelector(".modal-title");t.innerHTML="",n.innerHTML="";let o=document.createElement("h1");o.innerText=e.name;let i=document.createElement("img");i.src=e.imageUrl,i.classList.add("modal-img");let a=document.createElement("p");a.innerText="Height: "+e.height+"m";let l=document.createElement("p");l.innerText="Weight: "+e.weight;let r=document.createElement("p");r.innerText="Type: "+e.typename.map(function(e){return e.type.name}).join(", "),n.append(o),t.append(i),t.append(a),t.append(l),t.append(r),$("#modal-container").modal("toggle")})}(e)})},loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:function(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types,e.weight=t.weight,e.typename=e.types}).catch(function(e){console.error(e)})}}}();function searchPokemon(){var e,t,n;for(e=document.getElementById("search-form-input").value.toUpperCase(),t=document.getElementById("pokemon-list-group").getElementsByTagName("li"),n=0;n<t.length;n++)t[n].getElementsByTagName("button")[0].innerText.toUpperCase().indexOf(e)>-1?t[n].style.display="":t[n].style.display="none"}pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});
