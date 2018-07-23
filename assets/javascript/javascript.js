// VARIABLES

var emotionArray = ["excited", "scared", "angry"]

var emotionSearch = $("#search-term").val().trim();

// FUNCTIONS

// on submit, new search term is added to array


// 

$(document).ready(function() {
  
  $("#submit").on("click", function() {
    
    // add search term to array
    emotionArray.push(emotionSearch);
    
    // generate buttons for each term in array
    for (var i = 0; i < emotionArray.length; i++) {

      // create new buttons
      $("<button>");


    }
  
  
  
  
  
  });


  // Adding click event listen listener to all buttons
    $("button").on("click", function() {
      // Grabbing and storing the data-emotion property value from the button
      var emotion = $(this).attr("data-emotion");

      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=xP2ihe67qs532QSmgRRS7hSLReTI4GIu";

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i <= 9; i++) {

            // Creating and storing a div tag
            var emotionDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var emotionImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            emotionImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the emotionDiv
            emotionDiv.append(emotionImage);
            emotionDiv.append(p);
            
              
            // Prependng the emotionDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(emotionDiv);
          }
        });
    });
  });