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
  callData("movie", searchBarr);
  callData("tv", searchBarr);
}


// Funzione di chiamata Ajax films

function callData(type, searchString){
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/" + type,
      "data": {
        "api_key": "c73ce97358abda99e92ea4ca6b449349",
        "query": searchString,
        "language": "it-IT",
        },
      "method": "GET",
      "success": function(data) {
        console.log(data.results);
        renderResult(data.results);

        },
      "error": function(err) {
          alert("Errore!");
        }
      }
  );
};

// Funzione  di chiamata Ajax serie Tv
//
// function callTv(type, searchString){
//   $.ajax(
//     {
//       "url": "https://api.themoviedb.org/3/search/" + type,
//       "data": {
//         "api_key": "c73ce97358abda99e92ea4ca6b449349",
//         "query": searchString,
//         "language": "it-IT",
//         },
//       "method": "GET",
//       "success": function(data) {
//         console.log(data.results);
//         renderResult(data.results);
//
//         },
//       "error": function(err) {
//           alert("Errore!");
//         }
//       }
//   );
// };



// Funzione di stampo nell'html dei risultati di ricerca dei Films
function renderResult(type, result){

  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);


  for (var i =0; i< result.length; i++) {

    var title, original_title, container;

    if (type == "movie") {
      title = result[i].title;
      original_title = result[i].original_title;
      container = $("#lista-film");
    } else if (type == "tv") {
      title = result[i].name;
      original_title = result[i].original_name;
      container = $("#lista-tv");
    }

    if (result[i].poster_path == null) {
      var poster = "img/903637.jpg";
    } else {
      var poster ="https://image.tmdb.org/t/p/185" + result[i].poster_path;
    }



    var context = {
      "poster": poster,
      "title": title,
      "title_original": original_title,
      "lang": bandierine(result[i].original_language),
      "vote": stelline(result[i].vote_average),
      "type" : type
    };

    var html = template(context);
    container.append(html);
  };

};



// Funzione di stampo nell'html dei risultati di ricerca delle serie TV

// var sourceTv = $("#tv-template").html();
// var templateTv = Handlebars.compile(sourceTv);
//
// function renderTv(series){
//
//   for (var i =0; i< series.length; i++) {
//     var context = {
//       "name": series[i].name,
//       "original_name": series[i].original_name,
//       "lang": bandierine(series[i].original_language),
//       "vote": stelline(series[i].vote_average)
//     };
//
//     var html = templateTv(context);
//     $("#lista-tv").append(html);
//   };
//
// };
//

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
