$(document).ready(function() {


// Setto la barra di ricerca

  // Inizializzo la ricerca attraverso il tasto "search"

  $("#bottone-ricerca").click(
    function(){
      search();
    }
  );

  // Inizializzo la ricerca attraverso il tasto invio

  $("#search").keyup(
    function(e){
      if (e.which == 13) {
        search();
      }
    }
  );


});


// Funzione di  ricerca

function search(){
  $("#lista-film").html("");
  $("#lista-tv").html("");
  searchBarr = $("#search").val();
  callFilm();
  callTv();
}


// Funzione di chiamata Ajax films

function callFilm(){
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        "api_key": "c73ce97358abda99e92ea4ca6b449349",
        "query": searchBarr,
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
        "query": searchBarr,
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
      "lang": bandierine(movies[i].original_language),
      "vote": stelline(movies[i].vote_average)
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
      "lang": bandierine(series[i].original_language),
      "vote": stelline(series[i].vote_average)
    };

    var html = templateTv(context);
    $("#lista-tv").append(html);
  };

};


// Funzione bandierine

function bandierine(language){

  if (language == "en"){
    language = "gb";
  }
  
  var lingua = "<img src='https://www.countryflags.io/" + language + "/flat/24.png'>";
  return lingua;

}


// Funzione stelline

function stelline(vote){
  var voto = Math.ceil(vote/2);

  var stellinaPiena ="<i class='fas fa-star'></i>";
  var stellinaVuota ="<i class='far fa-star'></i>";
  var stars = "";

      for(var i = 1; i <= 5; i++){
       if(i <= voto){
        var star = stellinaPiena;
       }else{
         var star = stellinaVuota;
       }
      stars += star;
      };
      return stars;
  };
