//ANCHOR declare variables
let links = document.querySelectorAll("nav .nav-link"),
  dataRow = document.getElementById("dataRow"),
  recipesDataContent = [];

//ANCHOR get recipes data
async function getRecipes(theWord) {
  let recipes = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${theWord}`),
    recipesData = await recipes.json();
  recipesDataContent = recipesData.recipes;
  displayRecipes();
}
getRecipes("onion");
//ANCHOR change recipes function
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (eventInfo) {
    let theInnerWord = eventInfo.target.innerHTML;
    getRecipes(theInnerWord);
  });
}
//ANCHOR display recipes function
function displayRecipes() {
  let content = "";
  for (let i = 0; i < recipesDataContent.length; i++) {
    content += `        <div class="col-md-4">
    <div class="recipe p-3">
      <div class="card">
        <div class="card-header">${recipesDataContent[i].recipe_id}</div>
        <img src="${recipesDataContent[i].image_url}" class="card-img-top" alt="recipe" />
        <div class="card-body text-center">
          <h5 class="card-title">${recipesDataContent[i].title}</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <div class="card-footer text-muted">
          <footer class="blockquote-footer">
            ${recipesDataContent[i].publisher}<cite title="Source Title"><a href="${recipesDataContent[i].publisher_url}" class="btn btn-primary ml-2">Source Link</a></cite>
          </footer>
        </div>
      </div>
    </div>
  </div>`;
    dataRow.innerHTML = content;
  }
}
