// function MovieDetails({ selectedId, onCloseMovie }) {
//   let movie = "world";
//   async function getMovieDetails() {
//     const res = await fetch(
//       `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
//     );
//     const data = await res.json();
//     return data;
//   }

//   getMovieDetails().then((data) => {
//     movie = data;
//     const {
//       Title: title,
//       Year: year,
//       Poster: poster,
//       Runtime: runtime,
//       imdbRating,
//       Plot: plot,
//       Released: released,
//       Actors: actors,
//       Director: director,
//       Genre: genre,
//     } = movie;
//     console.log(title);
//   });

//   return (
//     <div className="details">
//       <button className="btn-back" onClick={onCloseMovie}>
//         &larr;
//       </button>
//       {movie || "hello"}
//     </div>
//   );
// }

function trial() {
  fetch(`http://www.omdbapi.com/?apikey=${"2172bc9a"}&i=${"tt1285016"}`)
    .then((res) => res.json())
    .then((data) => console.log(data));

  return "hello";
}

const h = trial();
console.log(h);
