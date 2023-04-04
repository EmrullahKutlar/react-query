import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "../hookes/useSuperHeroesData";
import { Link } from "react-router-dom";

import { useState } from "react";

const RQSuperHeroes = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log("onSuccess : " + JSON.stringify(data));
  };
  const onError = (error) => {
    console.log("onError : " + error);
  };

  const { isLoading, data, isError, error, /*isFetching,*/ refetch } =
    useSuperHeroesData(onSuccess, onError);

  const { mutate:addHero, /*isLoading:addHeroLoading,rerror:addHeroError,*/   isError:addHeroIsError} = useAddSuperHeroData();


  const handleAddHereClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
    if (!addHeroIsError) {
      setAlterEgo("");
      setName("");
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHereClick}>Add Hero</button>
      </div>

      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}

      {/* {data.map((heroNames) => {
        return <div key={heroNames}>{heroNames}</div>;
      })} */}
    </>
  );
};

export default RQSuperHeroes;
