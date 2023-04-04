import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(["superHero", heroId], () => fetchSuperHero(heroId), {
    initialData: () => {
      const hero = queryClient
        .getQueryData("superHeroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return { data: hero };
      }
      else {
        return undefined;
      }
    },
  });
};
