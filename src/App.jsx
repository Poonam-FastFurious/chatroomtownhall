/* eslint-disable react/no-unescaped-entities */
import "../src/assets/css/tailwind2.css";
import Home from "./Components/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
