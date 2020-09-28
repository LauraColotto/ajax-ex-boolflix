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


  // Faccio un'autoscroll orizzontale al click sulle freccette



  $(".fa-angle-right").click(
    function(){
      scrollo = $("#lista-film").scrollLeft();
      newScroll =  $("#lista-film").scrollLeft(scrollo + 500);
      scrollo += newScroll;
      return scrollo;
    }
  );

  $(".fa-angle-left").click(
    function(){
        scrollo = $("#lista-film").scrollLeft();
        newScroll =  $("#lista-film").scrollLeft(scrollo - 500);
        scrollo += newScroll;
        return scrollo;
    }
  );






});


// Funzione di  ricerca

function search(){
  $("#lista-film").html("");
  $("#lista-tv").html("");
  searchBarr = $("#search").val();
  callData("movie", searchBarr);
  callData("tv", searchBarr);
}


// Funzione di chiamata Ajax sia per i films che per le serie tv

function callData(type, searchBarr){
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/" + type,
      "data": {
        "api_key": "c73ce97358abda99e92ea4ca6b449349",
        "query": searchBarr,
        "language": "it-IT",
        },
      "method": "GET",
      "success": function(data) {
        //console.log(data.results);
        renderResult(type, data.results);

        },
      "error": function(err) {
          alert("Errore!");
        }
      }
  );
};



// Funzione di chiamata Ajax per i credits

// function callCredits(type, movie_id){
//   $.ajax(
//     {
//       "url": "https://api.themoviedb.org/3/" + type + "/" + movie_id + "/credits?",
//       "data": {
//         "api_key": "c73ce97358abda99e92ea4ca6b449349",
//         "language": "it-IT"
//         },
//       async: false,
//       "method": "GET",
//       "success": function(data) {
//         return data;
//         },
//       "error": function(err) {
//           alert("Errore!");
//         }
//     }
//   );
//   //console.log(risultato);
// };



// Funzione di stampo nell'html dei risultati

function renderResult(type, result){

  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);


  for (var i =0; i< result.length; i++) {

    // Setto tre variabili per il titolo, il titolo originale ed il container di destinazione, siccome le chiavi cambiano da film a serie tv

    var title, original_title, container, cast;

    if (type == "movie") {
      title = result[i].title;
      original_title = result[i].original_title;
      container = $("#lista-film");
    } else if (type == "tv") {
      title = result[i].name;
      original_title = result[i].original_name;
      container = $("#lista-tv");
    }

    // Se il c'è o non c'è il poster...

    if (result[i].poster_path == null) {
      var poster = "img/no_poster.png";
    } else {
      var poster ="https://image.tmdb.org/t/p/w342/" + result[i].poster_path;
    }


    // Faccio la chiamata per il cast

    // var cast = callCredits(type, result[i].id);
    // console.log(cast);
    //
    // var nomiCast;

    /*for (var i =0; i< 5; i++){
      nomiCast += cast[i].name;
      nomiCast += " ,";
    }*/



    // Setto i placeholder di handelbars

    var context = {
      "poster": poster,
      "title": title,
      "title_original": original_title,
      // "array_cast": nomiCast,
      "overview": result[i].overview,
      "lang": bandierine(result[i].original_language),
      "vote": stelline(result[i].vote_average),
      "type" : type
    };

    var html = template(context);
    container.append(html);
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
