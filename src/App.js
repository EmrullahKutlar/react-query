import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./components/Home.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import SuperHeroesPage from "./components/SuperHeroes.page";
import RQSuperHero from "./components/RQSuperHero";
import ParallelQueries from "./components/ParallelQueries.page";
import DynamicParallelPage from "./components/DynamicParallel.page";
import DependentQueriesPage from "./components/DependentQueries.page";
import PaginatedQueriesPage from "./components/PaginatedQueries.page";
import InfiniteQueriesPage from "./components/InfiniteQueries.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <div style={{ padding: "5rem" }}>
            <Routes>
              <Route path="/super-heroes" element={<SuperHeroesPage />} />
              <Route
                path="/rq-dynamic-parallel"
                element={<DynamicParallelPage heroIds={[1, 3]} />}
              />
              <Route path="/rq-parallel" element={<ParallelQueries />} />
              <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
              <Route path="/rq-infinite" element={<InfiniteQueriesPage />} />
              <Route
                path="/rq-dependent"
                element={<DependentQueriesPage email="vishwas@example.com" />}
              />
              <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/rq-super-heroes/:heroId"
                element={<RQSuperHero />}
              />
            </Routes>
          </div>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
