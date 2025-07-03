import React, { useState } from 'react'
// import Navbar from './components/Navbar';
// import MovieItem from './components/MovieItem';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import CreatorDashboard from './components/CreatorDashboard';
import ModalForm from './components/ModalForm';

function App() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {/* <Navbar />
      <MovieItem /> */}
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          {/* <Route exact path='/dashBoard' element={<><Navbar /><MovieItem /></>} /> */}
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/creatordashboard' element={<CreatorDashboard onOpen={() => setShowModal(true)} />} />
        </Routes>
      </BrowserRouter>
      <ModalForm show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default App;
