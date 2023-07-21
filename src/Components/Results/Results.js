import React, {useState, useEffect} from 'react'
import './Results.css'

function Results({results}) {
  return (
    <section className='results'>
      {results.map(result => {
        return (<div key={result.masterId} id={result.masterId}>
          <img className='results--image' src={result.coverImage || result.thumb}/>
          <p classname='results--title'>{result.title.length > 20 ? result.title.slice(0, 20) + '...' : result.title}</p>
          <p classname='results--artist'>{result.artist.length > 20 ? result.artist.slice(0, 20) + '...' : result.artist}</p>
        </div>)
      })}
    </section>
  )
}

export default Results