$(document).ready(function()
{	
	// Variable topic holds the initial set of soon to be buttons
	var topics = ["Jazz", "Rock", "Hip Hop", "Metal", "EDM"];

	//Function that displays a the still images and gifs to HTML
	function displayTopicInfo ()
	{
		//Vaiables are set in order to make the ajax call
		$("#topicDisplay").empty();
		var limit = 10;
		var rating = "&rating=pg-13";
		var ratingDisplay = "";
		var name = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&limit=" + limit + rating + "&api_key=dc6zaTOxFJmzC";

		//ajax is used to make a call to retrieve API info using the vaialbes above
		$.ajax 
		({
			url: queryURL,
			method: "GET"
		}).done(function(response) //Once the call is complete the response is triggered
			{
				// This loop creates div tags with the data from the ajax called and displayed
				for (var i = 0; i < response.data.length; i++) 
				{
					var imgDiv = $("<div>");
					var textDiv = $("<div>");
					textDiv.addClass("textContainer");
					imgDiv.addClass("imgContainter");
					$(textDiv).text("Rating: " + response.data[i].rating);
					$(imgDiv).append(textDiv);
					$(imgDiv).append("<img src ='" + response.data[i].images.fixed_height_still.url + "'>");
					$("#topicDisplay").append(imgDiv);
				} // ends for loop

				//When the img tag is clicked, it will either display a still image or a gif of that image
				$("img").click(function () 
				{ 	
					//This src value is extracted from the clicked image and variables are set
					console.log($(this).find('img'));
					var queryThisVal = $(this).attr("src")
					var queryURLstatic = "";
					var queryURLmoving = "";
					console.log(queryURLstatic);
							
							//The if statements make a check between the string _s, _s contains the still image
							// the src without it is the gif then the src gets swapped depending which one is 
							// currently 'on'
							if (queryThisVal.includes("_s")) 
							{
								console.log("yes");
								queryURLmoving = queryThisVal.replace("_s", "");
								console.log(queryURLmoving);
								$(this).attr("src", queryURLmoving);
							}
							else if (!queryThisVal.includes("_s")) 
							{
								console.log("nope");
								queryURLstatic = queryThisVal.slice(0, -4);
								queryURLstatic = queryURLstatic + "_s.gif";
								console.log(queryURLstatic);
								$(this).attr("src", queryURLstatic);
							}
				}); //ends img function click

			});	//ends the response from ajax
	} //ends the function

	//This function places the the buttons to HTML
	function renderButtons ()
	{	
		$("#topicButtons").empty(); //Empties the div to prevent reoccurance when new buttons are added

		//Loops throught the initial array of topics
		for (var i = 0; i < topics.length; i++) {
			//Creates a button, adds a class, an attribute, and text inside the button tag
			var a = $("<button>");
			a.addClass("topic");
			a.attr("data-name", topics[i]);
			a.text(topics[i]);
			//Finially appends the button to the div id in HTML
			$("#topicButtons").append(a);
		}
	} //ends renderButtons function

	//When the addTopic id element is clicked, it performs a function that adds a new array element to topics
	$("#addTopic").on("click", function(event)
	{
		event.preventDefault();
		var animal = $("#topicInput").val().trim();
		topics.push(animal);

		//Calls the function to display added button
		renderButtons();
	}); //ends the click event

	//The first function that gets called, 
	renderButtons();

	//Whenever a button is clicked, a function is called to display
	$(document).on("click", ".topic", displayTopicInfo);

});