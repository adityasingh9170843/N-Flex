import {Routes, Route} from 'react-router-dom'
import { Container } from "@chakra-ui/react";
import RootLayout from "./layouts/RootLayout";

import Movies from './pages/Movies';
import Shows from './pages/Shows';
import Home from './pages/Home';
import Search from './Search/Search';

import Details from './pages/Details';
import WatchList from './pages/WatchList';
import Protected from './components/routes/Protected';
function App() {
  
  return (
  <Container>
    
      <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home/>} />
        <Route path="/Movies" element={<Movies />}  />
        <Route path="/Shows" element={<Shows />}  />
        <Route path="/Search" element={<Search />} />
        <Route path="/:type/:id" element={<Details />} />
        <Route path="/watchlist" element={
          <Protected>
            <WatchList />
          </Protected>
        } />
        
      </Route>
    </Routes>
  </Container>
  );
}

export default App;
