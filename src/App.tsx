import { useState } from 'react';
import './App.css';
import Login from './pages/login/Login'; 
import SignUp from './pages/auth/signup/SignUp';

function App() {
  return (
    <>
      <Login />
      <SignUp />
    </>
  );
}

export default App;