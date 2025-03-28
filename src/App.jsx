import {Routes, Route} from 'react-router-dom'
import { Container } from "@chakra-ui/react";
import RootLayout from "./layouts/RootLayout";
import { ColorModeButton } from "./components/ui/color-mode";
function App() {
  
  return (
  <Container>
      <ColorModeButton/>
      <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/TVShows" element={<TVShows />}  />
        <Route path="/Search" element={<Search />} />
      </Route>
    </Routes>
  </Container>
  );
}

export default App;
