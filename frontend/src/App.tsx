import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import Finder from './components/Finder';
import SignUp from './components/SignUp';
import Guest from './components/Guest';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/guest" element={<Guest />} />
      <Route path="/finder" element={<Finder />} />
    </Routes>
  </BrowserRouter>)
}

export default App;
