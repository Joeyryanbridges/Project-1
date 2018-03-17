// key
// c4YgIGcU8WmshZ3ig1VyeaajeldQp1cNxb7jsnu5l0L2zf7GbS
//way to type multiple ingredients
// apples%2Cflour%2Csugar
// Url
//spoonacular-recipe-food-nutrition-v1.p.mashape.com


$("#recipeSearch").on("click", function (e) {
  e.preventDefault();

  let search = (search1 + "%2C" + search2 + "%2C" + search3 + "%2C" + search4 + "%2C" + search5);

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
      let recipeTitle = recipes[i].title
      let recipeImage = recipes[i].image;
      let recipeLikes = recipes[i].aggregateLikes;
      let cookTime = recipes[i].readyInMinutes;
      let instructions = recipes[i].instructions;
      let url = recipes[i].sourceUrl;
      //loop for ingredients
      let ingredients = [];
      let ingredientsArr = recipes[i].extendedIngredients;
      let id = recipes[i].id;

      for (let n = 0; n < ingredientsArr.length; n++) {
        ingredients.push(ingredientsArr[n].name);
      }
      //variables for diets
      let diets = [];
      let dietsArr = recipes[i].diets;

      for (let j = 0; j < dietsArr.length; j++) {
        diets.push(dietsArr[j]);
      }

      database.ref("/recipeCards/recipe" + number).set({
        title: recipeTitle,
        picture: recipeImage,
        likes: recipeLikes,
        time: cookTime,
        instructions: instructions,
        ingredients: ingredients,
        diets: diets,
        url: url,
        id: id
      });

      number++;
    }
  });
});

database.ref("recipeCards").on('value', function (snapshot) {


  for (let i = 1; i < 10; i++) {
    $("#basicModal-" + i).html(snapshot.val()['recipe' + i].title);
    $("#recipePic" + i).attr("src", snapshot.val()['recipe' + i].picture);
  }
});

