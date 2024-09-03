/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element }) => {
  const accessToken = localStorage.getItem("accessToken");

  return accessToken ? <Element /> : <Navigate to="/Login" />;
};

export default PrivateRoute;
