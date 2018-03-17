$(".recipe-btn").on("click", function () {
    var idArr = $(this).attr('id').split('');
    var j = idArr[idArr.length - 1];
    //console.log(idArr);
    database.ref('recipeCards/recipe' + j).once('value', function (data) {
        $("#list").empty();
        $("#title").html(data.val().title);
        $("#likes").text(data.val().likes);
        $("#time").text(data.val().time);
        $("#diets").text(data.val().diets);
        $("#image").attr("src", data.val().picture);
        $("#instructions").text(data.val().instructions);

        let modalUrl = $("<a>Official Recipe</a>");
        modalUrl.attr("href", data.val().url);
        $("#url").html(modalUrl);


        for (let i = 0; i < data.val().ingredients.length; i++) {
            let ul = $("<ul>");
            let li = $("<li>");
            li.text(data.val().ingredients[i]);
            ul.append(li);
            $("#list").append(ul);
        };

        let ol = $("<ol>");
        for (let x = 0; x < data.val().instructionList.length; x++) {
            let li = $("<li>");
            li.append(data.val().instructionList[x]);
            ol.append(li);
        };

        $("#instructionList").append(ol);
    });
});