import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Recommended from '../Recommended/Recommended'

const App = () => {
  const [trendingData, setTrendingData] = useState()

  useEffect(() => {
    // if user has a collection, fetch data based on genres/bands found in collection
    fetch('https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&year=2023&country=US&page=1&per_page=5&sort=hot')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Something went wrong')
      })
      .then(data => setTrendingData(data))
      .catch(err => console.error(err))
  }, [])
  
  return (
    <main>
      <Routes>
        <Route path='/' element={<Recommended trendingData={trendingData}/>}/>
      </Routes>
    </main>
  )
}

export default App;
