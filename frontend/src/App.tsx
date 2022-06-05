import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './layouts/Header';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Finder from './pages/Finder';
import SignUp from './pages/SignUp';
import Guest from './pages/Guest';
import Viewer from './pages/Viewer';

function App() {
  return (<BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/guest" element={<Guest />} />
      <Route path="/finder/:nodeId" element={<Finder />} />
      <Route path='/viewer/:nodeId' element={<Viewer />}></Route>
    </Routes>
  </BrowserRouter>)
}

export default App;
