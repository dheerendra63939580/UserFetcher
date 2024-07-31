import React from 'react'
import Home from './components/Home'
import Filter from './components/filter'
import './App.css'

const App = () => {
 
  return (
    <>
      <div className="header">
        <div style={{fontSize: "30px"}}>Pixel<span className="red">6</span></div>
        <div>
        <span className="material-symbols-outlined red">menu</span>
        </div>
      </div>
      <Filter/>
      <Home/>
    </>
  )
}

export default App
