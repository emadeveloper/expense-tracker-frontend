import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserProvider";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="login" exact element={<Login />} />
            <Route path="signUp" exact element={<Signup />} />
            <Route path="dashboard" exact element={<Home />} />
            <Route path="incomes" exact element={<Income />} />
            <Route path="expenses" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "14px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  //Check if token exists in LocalStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Navigate to={"/login"} />
  );
};
