//ANCHOR declare variables
let links = document.querySelectorAll("nav .nav-link"),
  dataRow = document.getElementById("dataRow"),
  singleRecipeRow = document.getElementById("singleRecipeRow"),
  recipesDataContent = [],
  singleRecipeDataContent = [];
//ANCHOR get recipes data
async function getRecipes(theWord = "melon") {
  let recipes = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${theWord}`),
    recipesData = await recipes.json();
  recipesDataContent = recipesData.recipes;
  displayRecipes();
}
getRecipes();
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
    content += `        <div class="col-md-6 col-lg-4">
    <div class="recipeItem p-3">
      <div class="card">
        <div class="card-header">${recipesDataContent[i].recipe_id}</div>
        <img src="${recipesDataContent[i].image_url}" onclick="getSingleRecipe('${recipesDataContent[i].recipe_id}')" class="card-img-top" alt="recipe" data-toggle="modal" data-target="#exampleModal" />
        <div class="card-body">
          <h5 class="card-title">${recipesDataContent[i].title}</h5>
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
//ANCHOR get single recipe data
async function getSingleRecipe(recipeId) {
  let singleRecipe = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`),
    singleRecipeData = await singleRecipe.json();
  singleRecipeDataContent = singleRecipeData.recipe;
  displaySingleRecipe();
}
//ANCHOR display single recipe function
function displaySingleRecipe() {
  let content = "";
  content += `            <div class="singleRecipe p-3">
  <div class="card">
    <div class="card-header">${singleRecipeDataContent.recipe_id}</div>
    <img src="${singleRecipeDataContent.image_url}" class="card-img-top" alt="recipe" />
    <div class="card-body">
      <h5 class="card-title">${singleRecipeDataContent.title}</h5>
      <p class="card-text">${singleRecipeDataContent.ingredients}</p>
    </div>
    <div class="card-footer text-muted">
      <footer class="blockquote-footer">
        ${singleRecipeDataContent.publisher} <cite title="Source Title"><a href="${singleRecipeDataContent.publisher_url}" class="btn btn-primary">Source Title</a></cite>
      </footer>
    </div>
  </div>
</div>`;
  singleRecipeRow.innerHTML = content;
}