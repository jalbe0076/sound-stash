import React, {useState, useEffect} from 'react'
import Card from '../Card/Card'
import './Results.css'

function Results({results}) {
  return (
    <section className='results'>
      {results.map(result => {
        return <Card key={result.masterId}result={result}/>
      })}
    </section>
  )
}

export default Results