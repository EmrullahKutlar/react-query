import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({url:'/superheroes'})
};
const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({url:'/superheroes',method:'POST',data:hero})
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("superHeroes", fetchSuperHeroes, {
    // { cacheTime: 300000 }  default is 5 minutes command + k + c to comment  or command + k + u to uncomment or
    // command shift 7  to commnet
    // refetchOnWindowFocus: false,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true, arka planda refetch yapar her 1 saniyede bir
    // enabled: false, // false yaparsak fetch yapmaz
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroesName = data.data.map((superHero) => superHero.name);
    //   return superHeroesName;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess:(data)=>{
    //   // queryClient.invalidateQueries("superHeroes") //success olduğunda superHeroes query yenile alttaki ilede yapabilriz

    //   queryClient.setQueryData("superHeroes",(oldData)=>{
    //     return {
    //       ...oldData,
    //       data:[...oldData.data,data.data]
    //     }
    //   }
    //   )
    // }
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("superHeroes");
      const previousData = queryClient.getQueryData("superHeroes");
      queryClient.setQueryData("superHeroes", (oldData) => {
        return {
          ...oldData,
          data: [
            ...oldData.data,
            { id: oldData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return previousData;
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("superHeroes", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("superHeroes");
    },
  });
};
