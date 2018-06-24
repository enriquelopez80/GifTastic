$(document).ready(function () {

    //sports array

    let sports = ['basketball', 'baseball', 'football', 'soccer', 'hockey', 'boxing', 'golf', 'bowling', 'surfing', 'tennis']


    //create buttons in HTML

    function newButtons() {
        $('.sportsButtons').empty();

        for (let i = 0; i < sports.length; i++) {
            let button = $('<button>');
            button.addClass('sport');
            button.attr('data-sport', sports[i]);
            button.text(sports[i]);
            $('.sportsButtons').append(button);
        }
    }

    //user input that adds new buttons to the page

    $("#addSport").click(function (event) {
        event.preventDefault();
        let sport = $('#sports-input').val().trim();
        sports.push(sport);
        newButtons();
    });

    $(document).on('click', '.sport', sportsGifDisplay);


    newButtons();

    //When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

    function sportsGifDisplay() {

        let sport = $(this).attr('data-sport');
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=YPSKUc9ZtUnlU0q8yzFZduYuXzTfgb4u&limit=10";

        $.ajax({
                url: queryURL,
                method: 'get'
            })

            .then(function (response) {
                let results = response.data;
                for (let i = 0; i < results.length; i++) {

                    let sportDiv = $("<div class='sportClass'>");
                    let rating = results[i].rating;
                    let p = $('<p>').text('Rating: ' + rating);
                    let sportImage = $("<img class='gif'>");
                    sportImage.attr('src', results[i].images.fixed_height_still.url);
                    sportImage.attr('data-index', i);
                    sportDiv.append(p);
                    sportDiv.append(sportImage);

                    $('.sports', i).empty();
                    $('.sports').prepend(sportDiv);

                    window.results = results;

                }
            });
    };

    //Animate GIF on click

    $(document).on('click', '.gif', function () {
        let i = $(this).attr('data-index');
        if ($(this).attr('src') === results[i].images.fixed_height_still.url) {
            $(this).attr('src', results[i].images.fixed_height.url);
        } else {
            $(this).attr('src', results[i].images.fixed_height_still.url);
        }
    })
})