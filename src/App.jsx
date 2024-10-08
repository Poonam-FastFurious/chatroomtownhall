import "./App.css";
import "../assets/css/tailwind2.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
// import Login from "./Components/Authentication/Login";
import PrivateRoute from "./Components/ProtectedRoutes/PrivateRoute";
import { MessageProvider } from "./Components/Context/MessageContext";
import NewLogin from "./Components/Authentication/NewLogin";

function App() {
  return (
    <MessageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route path="/Login" element={<NewLogin />} />
        </Routes>
      </BrowserRouter>
    </MessageProvider>
  );
}

export default App;
