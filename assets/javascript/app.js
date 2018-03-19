// Initialize Firebase
var config = {
    apiKey: "AIzaSyBduDTXB2PTUnzWhxbVATEwjbyLYMjgPf0",
    authDomain: "cdc-project-1.firebaseapp.com",
    databaseURL: "https://cdc-project-1.firebaseio.com",
    projectId: "cdc-project-1",
    storageBucket: "cdc-project-1.appspot.com",
    messagingSenderId: "701148576356"
};
firebase.initializeApp(config);
var database = firebase.database();

let search1 = "";
let search2 = "";
let search3 = "";
let search4 = "";
let search5 = "";

// main carousel speed // 
$('#carousel').carousel({
    interval: 5000
})
// start for the search function of the main page //
var newId = 2;
// on click for searching // 
$("#recipeSearch").on("click", function () {
    search1 = $("#ingredient1").val().trim();
    if (newID = 3) {
        search2 = $("#ingredient2").val();
    }
    if (newID = 4) {
        search3 = $("#ingredient3").val();
    }
    if (newID = 5) {
        search4 = $("#ingredient4").val();
    }
    if (newID = 6) {
        var search5 = $("#ingredient5");
    }
});
function homeLoad() {
    window.location.href = 'index.html'
}
function secondPageLoad() {

    setTimeout(function () {
        window.location.href = 'index2.html'
    }, 5000)
};
$(".recipe-btn").on("click", function () {
    setTimeout(function () {
        $('div.modal, div.fade, div.bd-example-modal-lg').modal('show');
    }, 500);

})
function loading() {
    $("#spin").show();
    $("#spin").addClass("fa-spin");
}
// on click for adding more search fields // 
$("#addMore").on("click", function () {
    var newForm = $(".input-group");
    if (newId != 6) {
        newForm.prepend('<input type="text"class="form-control" id=ingredient' + newId + ' placeholder="Additional Ingredient"/>');
        newId++;
    }
})
// Initialize Map //
var map;
var infoWindow;
function generateMap(kw, rad) {
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pyrmont = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            var marker = new google.maps.Marker({
                map: map,
                position: pos,
                icon: {
                    url: "assets/images/your-loc.png",
                    scaledSize: new google.maps.Size(48, 48)
                }
            });

            infoWindow.setPosition(pos);
            map.setCenter(pos);

            var request = {
                location: pyrmont,
                radius: rad,
                keyword: kw
            };
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 32.2217, lng: -110.9265 },
        zoom: 9,
    });
}
function initMap1() {
    map = new google.maps.Map(document.getElementById('map1'), {
        center: { lat: 32.2217, lng: -110.9265 },
        zoom: 9,
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
    }
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {


        var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location,
            icon: {
                url: "assets/images/Basket_5.png",
                scaledSize: new google.maps.Size(48, 48)
            }
        });

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}



//Get user location and radius of stores    
$(document).ready(function () {

    $('#mapBtn').on('click', function () {
        $("#map").slideDown(2000);
        var rad = 4828.03;
        if ($('#miles').val() != 0) {
            rad = $('#miles').val() * 1609.34;
        }
        generateMap(['grocery', 'store'], rad);
    })
})
$(document).ready(function () {

    $('#mapBtn1').on('click', function () {
        $("#map1").slideDown(2000);
        var rad = 4828.03;
        if ($('#miles1').val() != 0) {
            rad = $('#miles1').val() * 1609.34;
        }
        generateMap(['grocery', 'store'], rad);
    })
})
