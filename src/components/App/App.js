import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Recommended from '../Recommended/Recommended'
import { userData } from './userData'

const App = () => {
  const [recommendedData, setRecommendedData] = useState()
  const [user, setUser] = useState(userData[0])

  useEffect(() => {
    // if user has a collection, fetch data based on genres/bands found in collection
    if (!user.collection.length) {
      fetch('https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&year=2023&country=US&page=1&per_page=5&sort=hot')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          throw new Error('Something went wrong')
        })
        .then(data => setRecommendedData(data))
        .catch(err => console.error(err))
    } else {
      const albumID = user.collection[Math.floor(Math.random() * user.collection.length)]
      fetch(`https://api.discogs.com/masters/${albumID}?key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ`)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          throw new Error('Something went wrong')
        })
        .then(data => fetch(`https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&year=2023&country=US&page=1&per_page=5&genre=${data.genres[0]}`))
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          throw new Error('Something went wrong')
        })
        .then(data => setRecommendedData(data))
        .catch(err => console.error(err))
    }
  }, [])
    
  
  return (
    <main>
      <Routes>
        <Route path='/' element={<Recommended recommendedData={recommendedData} collection={user.collection} />}/>
      </Routes>
    </main>
  )
}

export default App;
