const movies = [
  {
    _id: 1,
    title: "Jungle Cuise",
    genre: "Adventure",
    director: "Rob Marshall",
    year: "2024",
    image: "/img/jungle-cruise.jpeg",
    rating: "5",
    description:
      "Dreaming about saving countless lives and having another adventure, the feisty Englishfeminist and doctor of botany, Dr Lily Houghton, embarks on a peril-laden mission to change theworld. Along with her fashionable brother, MacGregor, Dr Houghton enlists the help of the arrogant,wisecracking riverboat skipper, Captain Frank Wolff, to guide them through the serpentine AmazonRiver in La Quila, his swift wooden boat. Now, as the intrepid trio ventures deeper and deeper intothe heart of an impenetrable green maze, searching for something that cannot be found, acenturies-old curse and the ruthless aristocrat, Prince Joachim, threaten to put an end to theirambitious plans.",
  },
  {
    _id: 2,
    title: "The-Litlle-Mermaid",
    genre: "Fantasy",
    director: "Rob Marshall",
    year: "2023",
    image: "/img/the-little-mermaid.jpg",
    rating: "2",
    description:
      "The youngest of King Triton's daughters, Ariel is a beautiful and spirited young mermaidwith a thirst for adventure. Longing to find out more about the world beyond the sea, Ariel visitsthe surface and falls for the dashing Prince Eric. Following her heart, she makes a deal with theevil sea witch, Ursula, to experience life on land.",
  },
  {
    _id: 3,
    title: "Home-Alone",
    genre: "Comedy",
    director: "Rob Marshall",
    year: "2020",
    image: "/img/home-alone.jpeg",
    rating: "5",
    description:
      "It is Christmas time and the McCallister family is preparing for a vacation in Paris,France. But the youngest in the family, Kevin (Macaulay Culkin), got into a scuffle with his olderbrother Buzz (Devin Ratray) and was sent to his room, which is on the third floor of his house.Then, the next morning, while the rest of the family was in a rush to make it to the airport ontime, they completely forgot about Kevin, who now has the house all to himself. Being home alone wasfun for Kevin, having a pizza all to himself, jumping on his parents' bed, and making a mess. Then,Kevin discovers about two burglars, Harry (Joe Pesci) and Marv (Daniel Stern), about to rob hishouse on Christmas Eve. Kevin acts quickly by wiring his own house with makeshift booby traps tostop the burglars and to bring them to justice.",
  },
];

exports.getAll = () => {
  return movies.slice(); //shallow coppy of movies array
  //return [...movies];
};

exports.getOne = (movieId) => {
  const movie =  movies.find(movie => movie._id == movieId);
  return movie;
};

exports.create = (movieData) => {
  movieData._id = movies[movies.length - 1]._id + 1;
  movies.push(movieData);
};
