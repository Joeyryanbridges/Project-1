
//var favoriteRecipe = firebase.database();

//var key = "";

var favorites = [];

$(".addFav").on("click", function () {
    event.preventDefault();
    var recipeNumber = parseInt($(this).attr('id').replace('fav', ''));

    var clickedRecipe;
    database.ref("recipeCards/recipe" + recipeNumber).once("value", function (snapshot) {
        console.log(snapshot.val());
        clickedRecipe = snapshot.val();
        favorites.push(clickedRecipe);
        database.ref("favorites").set({
            recipes: favorites
        });
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    console.log("Favorite Clicked");
    $(this).hide();
});

database.ref("favorites").on("value", function (snapshot) {
    favorites = snapshot.val().recipes;
    populateFavoritesView()
    console.log(favorites);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

function populateFavoritesView() {
    var row = $('<div classs="row text-center inner2">');
    for (var i = 0; i < favorites.length; i++) {
        var card = $('<div class="card col-12 col-lg-3 m-4 card-pad favoritesCard">');
        var cardImage = $('<img class="card-img-top" src="' + favorites[i].picture + '" alt="Food Image">')
        var cardBody = $('<div class="card-body">');
        var cardButton = $('<a href="#!" class="btn btn-primary fav-recipe-btn truncate" id="favRecipe' + i + '">' + favorites[i].title + '</a>');
        console.log(cardImage);
        cardBody.append(cardButton);
        card.append(cardImage);
        card.append(cardBody);
        row.append(card);
    }
    $('#favoritesCardDisplay').html(row);
}

$(document).on('click', '.fav-recipe-btn', function () {
    $('#favsInfo').slideDown('slow');
    $('#favoritesRecipeDisplay').html();
    var favIndex = $(this).attr('id').replace('favRecipe', '');
    console.log(favorites[favIndex]);
    $("#list1").empty();
    $("#title1").html(favorites[favIndex].title);
    $("#likes1").text(favorites[favIndex].likes);
    $("#time1").text(favorites[favIndex].time);
    $("#diets1").text(favorites[favIndex].diets);
    $("#image1").attr("src", favorites[favIndex].picture);
    $("#instructions1").text(favorites[favIndex].instructions);

    let modalUrl = $("<a>Official Recipe</a>");
    modalUrl.attr("href", favorites[favIndex].url);
    $("#url1").html(modalUrl);


    for (let i = 0; i < favorites[favIndex].ingredients.length; i++) {
        let ul = $("<ul>");
        let li = $("<li>");
        li.text(favorites[favIndex].ingredients[i]);
        ul.html(li);
        $("#list1").append(ul);
    };

    let ol = $("<ol>");
    for (let x = 0; x < favorites[favIndex].instructionList.length; x++) {
        let li = $("<li>");
        li.append(favorites[favIndex].instructionList[x]);
        ol.append(li);
    };

    $("#instructionList1").html(ol);
})










