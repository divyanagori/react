import React from 'react'
import './HomeScreen.css'
import HomeBanner from './homeBanner/HomeBanner'
import HomeDetails from './homeDetails/HomeDetails'

const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <HomeBanner />
      <HomeDetails />
    </div>
  )
}

export default HomeScreen