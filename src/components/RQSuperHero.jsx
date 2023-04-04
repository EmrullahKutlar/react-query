import { useSuperHeroData } from "../hookes/useSuperHeroData";
import { useParams } from "react-router-dom";

const RQSuperHero = () => {
  const { heroId } = useParams();
  console.log("heroId : " + heroId);
  const { isLoading, data, isError, error } = useSuperHeroData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      {data && (
        <div>
            <p>{data.data.id}</p>
          <h2>{data.data.name}</h2>
          <p>{data.data.alterEgo}</p>
        </div>
      )}
    </>
  );
};

export default RQSuperHero;
