import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
//import { UserContext } from './context/UserContext';
import UserProvider from './context/UserProvider';

const App = () => {
  return (

    <UserProvider>
      <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='login' exact element={<Login />}/>
          <Route path='signUp' exact element={<Signup />}/>
          <Route path='dashboard' exact element={<Home />}/>
          <Route path='income' exact element={<Income />}/>
          <Route path='expense' exact element={<Expense />}/>
        </Routes>
      </Router>
    </div>
    </UserProvider>
    
  );
};

export default App;

const Root = () => {
  //Check if token exists in LocalStorage
  const isAuthenticated = !! localStorage.getItem('token');

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? <Navigate to={'/dashboard'} /> : <Navigate to={'/login'} />;
}