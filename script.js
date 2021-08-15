const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "856b26ea";
const APP_KEY = "1dc3d844bd3d38ef0352616a21c3f14d";
let button = document.getElementById("addadrink");
const recipeCards = document.getElementById("recipeCards");
const drinkContainer = document.getElementById("drinkContainer");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  saveSearch (searchQuery) 
  fetchAPI();
});
async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=3`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
    <div class="card" style="width: 20rem;">
      <img src="${
        result.recipe.image
      }" class="card-img-top recipeCardsImg" alt="">
      <div class="card-body">
          <h1 class="card-title">${result.recipe.label}</h1>
          <a class= "view-button" href="${
            result.recipe.url
          }" target="_blank" >View Recipe</a>
        </div>
        <p class="card-text">Calories: ${result.recipe.calories.toFixed(2)}</p>
      </div>
    `;
  });
  console.log(recipeCards);
  console.log(generatedHTML);
  recipeCards.innerHTML = generatedHTML;
}

function addadrink() {
  // grab the element ID - remove ()
  let drinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  fetch(drinkAPI)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log(data);
      displayCocktail(data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function displayCocktail(data) {
  drinkContainer.innerHTML = "";
  let cocktail = data.drinks[0];
  // let cocktailDiv = document.getElementById("cocktail");
  let cocktailName = cocktail.strDrink;

  let newCocktailDiv = document.createElement("div");
  newCocktailDiv.classList.add(["card", "cocktailCard"]);

  let cocktailImg = document.createElement("img");
  cocktailImg.src = cocktail.strDrinkThumb;
  cocktailImg.classList.add(["card-img-top", "drinksCardsImg"]);

  let heading = document.createElement("h1");
  heading.innerText = cocktailName;
  heading.classList.add(["card-title"]);

  newCocktailDiv.appendChild(cocktailImg);
  newCocktailDiv.appendChild(heading);

  drinkContainer.appendChild(newCocktailDiv);

  // cocktailDiv.appendChild(cocktailImg);
}
button.addEventListener("click", addadrink);




// Local Storage Feature
let previousSearches = [];
if (previousSearches[previousSearches]) {
  const history = JSON.parse(localStorage.getItem("searchResults"));
}
if (previousSearches.indexOf(search) == -1) {
  previousSearches.unshift(search);
  if (previousSearches.length > 3) {
    previousSearchess.pop();
  }
  localStorage.setItem("searchResults", JSON.stringify(previousSearches));
}
function drawpreviousSearches() {
  if (previousSearches.length) {
    var html = previousSearchesTemplate({ search: previousSearches });
    $("#previousSearches").html(html);
  }
}
$(document).on("click", ".pastSearchLink", function (e) {
  e.preventDefault();
  var search = $(this).text();
  doSearch(search);
});
// fires when it loads - need to link
localStorage.setItem("searchResults", JSON.stringify(previousSearches));
// End - Local Storage Feature


// save a search
function saveSearch (searchTerm) {
  previousSearches.push(searchTerm)
if (previousSearches.length > 3) {
  previousSearches.shift()
}
localStorage.setItem("searchResults", JSON.stringify(previousSearches));

}


// restore a search
function loadSearch (){
// fetch the local storage, JSON.parse (turn inside out) localStorage.getItem("searchResults", JSON.stringify(previousSearches));
// create button
// look at value in button
// set Global variable
// call API

}