/* eslint-disable react/no-unescaped-entities */
import "../src/assets/css/tailwind2.css";
import Home from "./Components/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Chat" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
