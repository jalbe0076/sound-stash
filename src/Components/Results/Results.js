import React, {useState, useEffect} from 'react'
import Card from '../Card/Card'
import './Results.css'

function Results({results}) {
  return (
    <section className='results'>
      <div className='results--grid'>
        {results.map(result => {
          return <Card key={result.masterId}result={result}/>
        })}
      </div>
    </section>
  )
}

export default Results