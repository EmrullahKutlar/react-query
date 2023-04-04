import { useQueries} from "react-query";
import axios from "axios"; 

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}


const DynamicParallelPage = ({heroIds}) => {

const queryResults = useQueries(
    heroIds.map((id) => {
        return {
            queryKey: ["superhero", id],
            queryFn: () => fetchSuperHero(id),
        };
    })
);

console.log({queryResults});
    return ( 
        <div>
            <h1>Dynamic Parallel Queries </h1>
        </div>
     );
}
 
export default DynamicParallelPage;