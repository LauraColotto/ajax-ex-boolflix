$(document).ready(function() {


// Setto la barra di ricerca

  // Funzione di ricerca attraverso il tasto "search"

  $("#bottone-ricerca").click(
    function(){
      searchMovie = $("#search").val();
      callFilm();
    }
  );

  // Funzione di ricerca attraverso il tasto invio

  $("#search").keyup(
    function(e){
      if (e.which == 13) {
        searchMovie = $("#search").val();
        callFilm();
      }
    }
  );


});


// Funzione di chiamata Ajax

function callFilm(){
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        "api_key": "c73ce97358abda99e92ea4ca6b449349",
        "query": searchMovie,
        "language": "it-IT",
        },
      "method": "GET",
      "success": function(data) {
        console.log(data.results);
        renderMovie(data.results);

        },
      "error": function(err) {
          alert("Errore!");
        }
      }
  );
};



// Funzione di stampo nell'html dei risultati di ricerca dei Films

var source = $("#movie-template").html();
var template = Handlebars.compile(source);

function renderMovie(movies){

  for (var i =0; i< movies.length; i++) {
    var context = {
      "title": movies[i].title,
      "title_original": movies[i].original_title,
      "lang": movies[i].original_language,
      "vote": movies[i].vote_average
    };

    var html = template(context);
    $("#lista-film").append(html);
  };

};
