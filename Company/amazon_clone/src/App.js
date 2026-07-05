import React from 'react'
import "./App.css"
import Navbar from './components/Navbar/Navbar'
import HomeScreen from './screen/homeScreen/HomeScreen'
const App = () => {
  return (
    <div className='App'>
          <Navbar/>
          <HomeScreen/>
    </div>
  )
}

export default App