let topics = ["acura", "bmw", "mercedes", "lexus", "audi", "land rover", "ferrari", "lamborghini", "infiniti"];
let giphys;

function displayTopicButtons(carMakesArray) {
    carMakesArray.forEach(function(carMake) {
        var newButton = $('<button>');

        newButton.addClass('car-make btn btn-info');
        newButton.attr('data-make', carMake);
        newButton.text(carMake);
        $('.topics').append(newButton);
    });
}

function displayGiphys(giphys) {
    $('.pictures').empty();

    giphys.forEach(function(giph) {
        var stillPic = giph.images.downsized_still.url;
        var animatePic = giph.images.downsized_medium.url;
        var image = $('<img>');
        var rating = $('<p class="giph-box">');

        rating.html("Rating: " + giph.rating + "<br>");
        image.addClass('giph-image');
        image.attr('src', stillPic);
        image.attr('data-still', stillPic);
        image.attr('data-animate', animatePic);
        image.attr('data-state', 'still')

        rating.append(image);
        $('.pictures').append(rating);
    });
}

function getGiphys(carMake) {
    var queryURL ="https://api.giphy.com/v1/gifs/search";
    var apiKey = "?api_key=J3B9alhEbC9g98uoTwVdJrUCUmho7xUJ";
    var searchString = "&q=" + carMake;
    var rating = "&rating=pg";
    var language = "&lang=en";
    var limit = "&limit=10"

    $.ajax({
        url: queryURL + apiKey + searchString + rating + language + limit,
        method: "GET"
    }).then(function(response) {
        displayGiphys(response.data);
    })
}


displayTopicButtons(topics);

$(document).on("click", '.car-make', function() {
    var clickedCarMake = $(this).attr('data-make');
    getGiphys(clickedCarMake);
});

$(document).on("click", '.giph-image', function() {
    var state = $(this).attr('data-state');
    
    if (state === "still") {
        $(this).attr("src", $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }

    if (state === 'animate') {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
});

$('.add-button').on("click", function(e) {
    e.preventDefault();
    var userCarBrand = $('.add-carmake').val();

    if (userCarBrand != "") {
        topics.push(userCarBrand);
        $('.topics').empty();        
        displayTopicButtons(topics);
    }
});