import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Trending from '../Trending/Trending'

const App = () => {
  const [trendingData, setTrendingData] = useState()

  useEffect(() => {
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
        <Route path='/' element={<Trending trendingData={trendingData}/>}/>
      </Routes>
    </main>
  )
}

export default App;
