import React from 'react';
import logo from './logo.svg';
import './App.css';
import GetIngredient from './GetIngredient';
import PostIngredient from './PostIngredient';
function App() {
  return (
    <div className="App">
      <GetIngredient />
      <PostIngredient />
    </div>
  );
}

export default App;
