import Home from "./Components/Home";
import Navbar from "./Components/Navbar";

import { Routes, Route } from "react-router-dom";
import CountryPage from "./Components/CountryPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<Home />} />
        <Route path="countries/:countryCca2" element={<CountryPage />} />
      </Routes>
    </div>
  );
}

export default App;
