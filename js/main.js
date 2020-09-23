$(document).ready(function() {


// Setto la barra di ricerca

  // Funzione di ricerca attraverso il tasto "search"

  $("#bottone-ricerca").click(
    function(){
      search = $("#search").val();
      callFilm();
      callTv();
    }
  );

  // Funzione di ricerca attraverso il tasto invio

  $("#search").keyup(
    function(e){
      if (e.which == 13) {
        search = $("#search").val();
        callFilm();
        callTv();
      }
    }
  );


});


// Funzione di chiamata Ajax films

function callFilm(){
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        "api_key": "c73ce97358abda99e92ea4ca6b449349",
        "query": search,
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

// Funzione  di chiamata Ajax serie Tv

function callTv(){
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/tv",
      "data": {
        "api_key": "c73ce97358abda99e92ea4ca6b449349",
        "query": search,
        "language": "it-IT",
        },
      "method": "GET",
      "success": function(data) {
        console.log(data.results);
        renderTv(data.results);

        },
      "error": function(err) {
          alert("Errore!");
        }
      }
  );
};



// Funzione di stampo nell'html dei risultati di ricerca dei Films

var sourceFilm = $("#movie-template").html();
var templateFilms = Handlebars.compile(sourceFilm);

function renderMovie(movies){

  for (var i =0; i< movies.length; i++) {
    var context = {
      "title": movies[i].title,
      "title_original": movies[i].original_title,
      "lang": movies[i].original_language,
      "vote": Math.ceil(parseInt(movies[i].vote_average)/2)
    };

    var html = templateFilms(context);
    $("#lista-film").append(html);
  };

};
// Funzione di stampo nell'html dei risultati di ricerca delle serie TV

var sourceTv = $("#tv-template").html();
var templateTv = Handlebars.compile(sourceTv);

function renderTv(series){

  for (var i =0; i< series.length; i++) {
    var context = {
      "name": series[i].name,
      "original_name": series[i].original_name,
      "lang": series[i].original_language,
      "vote": Math.ceil(parseInt(series[i].vote_count)/2)
    };

    var html = templateTv(context);
    $("#lista-tv").append(html);
  };

};



// function star(){
//    vote = Math.ceil(parseInt(movies[i].vote_average)/2);
//
//    for (i = 0; i< vote ; i++) {
//      $(".voto").append(stellina);
//      $("stellina").show();
//    }







// switch (stelline){
//   case 1 {
//     ($(".far fa-star").show())*5;
//   }
// }

// Math.ceil(parseInt(movies[i].vote_average)/2)
