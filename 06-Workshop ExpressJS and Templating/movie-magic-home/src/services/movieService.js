const movies = [
  {
    title: "Jungle Cuise",
    genre: "Adventure",
    director: "Rob Marshall",
    year: "2024",
    image: "/img/jungle-cruise.jpeg",
    rating: "5",
    description: "Dreaming about saving countless lives and having another adventure, the feisty Englishfeminist and doctor of botany, Dr Lily Houghton, embarks on a peril-laden mission to change theworld. Along with her fashionable brother, MacGregor, Dr Houghton enlists the help of the arrogant,wisecracking riverboat skipper, Captain Frank Wolff, to guide them through the serpentine AmazonRiver in La Quila, his swift wooden boat. Now, as the intrepid trio ventures deeper and deeper intothe heart of an impenetrable green maze, searching for something that cannot be found, acenturies-old curse and the ruthless aristocrat, Prince Joachim, threaten to put an end to theirambitious plans.",
  },
];

exports.getAll = () => {
  return movies.slice(); //shallow coppy of movies array
  //return [...movies];
}

exports.create = (movieData) => {
    movies.push(movieData);
    
};
