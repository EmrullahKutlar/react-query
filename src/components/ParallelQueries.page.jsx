import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const ParallelQueries = () => {
//   const { data: superheroes } = useQuery("superheroes", fetchSuperHeroes);
  useQuery("superheroes", fetchSuperHeroes);
//   const { data: friends } = useQuery("friends", fetchFriends);
  useQuery("friends", fetchFriends);

  return (
    <div>
      <h1>Parallel Queries </h1>
    </div>
  );
};
export default ParallelQueries;
