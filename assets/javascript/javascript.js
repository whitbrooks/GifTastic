// VARIABLES

var emotionsArray = []

// FUNCTIONS

  function renderButtons() {
    $("#buttonsDiv").empty();
    for (var i = 0; i < emotionsArray.length; i++) {
      var button = $("<button>");
      button.addClass("emotionButton");
      button.addClass("btn btn-outline-secondary");
      button.attr("data-name", emotionsArray[i]);
      button.text(emotionsArray[i]);
      $("#buttonsDiv").append(button);
      }
  }

// RUN PROGRAM

$(document).ready(function() {
  
  // input new emotions and create buttons
  $("#add-emotion").on("click", function(event) {
    event.preventDefault();
    var input = $("#emotion-input").val().trim();
    emotionsArray.push(input);
    renderButtons();
  });


  // when emotion buttons are clicked, return gifs
  $(document).on("click", ".emotionButton", function() {
    var emotion = $(this).attr("data-name");

    // Constructing a queryURL using emotion
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      emotion + "&api_key=xP2ihe67qs532QSmgRRS7hSLReTI4GIu";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(response);
        
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i <= 9; i++) {

          // Creating and storing a div tag
          var emotionDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing a still image tag
          var image = $("<img>");
          // Setting attributes
          image.addClass("gif");
          image.attr("src", results[i].images.fixed_height_still.url);
          image.attr("data-still", results[i].images.fixed_height_still.url);
          image.attr("data-animate", results[i].images.fixed_height.url);
          image.attr("data-state", "still");
          console.log(image)
          
          // Appending the paragraph and image tag to the emotionDiv
          emotionDiv.append(image);
          emotionDiv.append(p);
            
          // Prependng the emotionDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(emotionDiv);
        }

        $(".gif").on("click", function() {
          // Getting the value of data-state attribute
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });

      });

        
    });

});