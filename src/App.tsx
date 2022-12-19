import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {HomePage} from './pages/HomePage/HomePage';
import {FavoritesPage} from './pages/FavotitesPage/FavoritesPage';
import { Navigation } from './components/Navigation/Navigation';

function App() {
  return (
    <>
    <Navigation/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/favorites" element={<FavoritesPage/>}/>
    </Routes></>
  );
}

export default App;
