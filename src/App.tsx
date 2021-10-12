import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Home/>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
