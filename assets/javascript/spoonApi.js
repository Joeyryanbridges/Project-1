// key
// c4YgIGcU8WmshZ3ig1VyeaajeldQp1cNxb7jsnu5l0L2zf7GbS
//way to type multiple ingredients
// apples%2Cflour%2Csugar
// Url
//spoonacular-recipe-food-nutrition-v1.p.mashape.com


$("#recipeSearch, #moreResults").on("click", function (e) {
  e.preventDefault();

  let search = (search1 + "%2C" + search2 + "%2C" + search3 + "%2C" + search4 + "%2C" + search5);
  console.log(search);

  let queryUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=' + search;

  // let queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/838902/nutritionWidget?defaultCss=true"
  // let queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/guessNutrition?title=Spaghetti+Aglio+et+Olio"

  $.ajax({
    url: queryUrl,
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader('X-Mashape-Key', 'c4YgIGcU8WmshZ3ig1VyeaajeldQp1cNxb7jsnu5l0L2zf7GbS');
    }
  }).then(function (response) {
    console.log(response);

    let recipes = response.recipes;
    let number = 1;

    for (let i = 0; i < response.recipes.length; i++) {


      // variables for cards
      let id = recipes[i].id;
      let recipeTitle = recipes[i].title
      let recipeImage = recipes[i].image;
      let recipeLikes = recipes[i].aggregateLikes;
      let cookTime = recipes[i].readyInMinutes;
      let instructions = recipes[i].instructions;
      let url = recipes[i].sourceUrl;
      //loop for ingredients
      let ingredients = [];
      let ingredientsArr = recipes[i].extendedIngredients;
      for (let n = 0; n < ingredientsArr.length; n++) {
        let name = ingredientsArr[n].name;
        let amount = ingredientsArr[n].amount;
        let unit = ingredientsArr[n].unit;
        ingredients.push(name + ": " + amount + " " + unit);
      }
      //loop for instructions
      let instructionList = [];
      let instructionsArr = recipes[i].analyzedInstructions[0].steps;
      for (let z = 0; z < instructionsArr.length; z++) {
        let instructNum = instructionsArr[z].step;
        instructionList.push(instructNum);
      };

      //variables for diets
      let diets = [];
      let dietsArr = recipes[i].diets;

      for (let j = 0; j < dietsArr.length; j++) {
        diets.push("  " + dietsArr[j]);
      }

      database.ref(key + "/recipeCards/recipe" + number).set({
        title: recipeTitle,
        picture: recipeImage,
        likes: recipeLikes,
        time: cookTime,
        instructions: instructions,
        ingredients: ingredients,
        instructionList: instructionList,
        diets: diets,
        url: url,
        id: id
      });

      number++;
    }
  });
});
function updateRecipes() {
  database.ref(key + "/recipeCards").on('value', function (snapshot) {
    console.log(key);
    for (let i = 1; i < 10; i++) {
      $("#basicModal-" + i).html(snapshot.val()['recipe' + i].title);

      $("#recipePic" + i).attr("src", snapshot.val()['recipe' + i].picture);
    }
  });
}
