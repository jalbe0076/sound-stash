import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Recommended from '../Recommended/Recommended'
import { userData } from './userData'
import { getTrendingAlbums, getRecommendedAlbums } from '../../api'

const App = () => {
  const [recommendedData, setRecommendedData] = useState()
  const [user, setUser] = useState(userData[0])

  useEffect(() => {
    if (!user.collection.length) {
      getTrendingAlbums(setRecommendedData)
    } else {
      const albumID = user.collection[Math.floor(Math.random() * user.collection.length)]
      getRecommendedAlbums(albumID, setRecommendedData)
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
