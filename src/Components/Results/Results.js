import React, {useState, useEffect} from 'react'
import Card from '../Card/Card'
import './Results.css'
import { searchAlbums } from '../../api'

function Results({query}) {
  const [results, setResults] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1 })
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    searchAlbums(query, 1)
      .then(data => {
        setResults(data.results)
        setPagination(data.pagination)
        setLoading(false)
      })
      .catch(error => alert(error.message))
  }, [ query ])

  const handleClick = (direction) => {
    setLoading(true)
    if (direction === 'last') {
      searchAlbums(query, pagination.page - 1)
      .then(data => {
        setResults(data.results)
        setPagination(data.pagination)
        setLoading(false)
        })
      .catch(error => alert(error.message))
    }
    if (direction === 'next') {
      searchAlbums(query, pagination.page + 1)
      .then(data => {
        setResults(data.results)
        setPagination(data.pagination)
        setLoading(false)
      })
      .catch(error => alert(error.message))
    }
    window.scrollTo(0, 0)
  }

  return (
    !isLoading ? (<section className='results'>
      <div className='results--grid'>
        {results.map(result => {
          return <Card key={result.masterId}result={result}/>
        })}
      </div>
      <div className='results--pages'>
        {pagination.page > 1 && <button className='results--last'onClick={() => handleClick('last')}>last</button>}
          <p>{pagination.page}</p>
          <p> of </p>
          <p>{pagination.pages}</p>
        {pagination.page < pagination.pages && <button className='results--next' onClick={() => handleClick('next')}>next</button>}
      </div>
    </section>) : (<div className ='results--loading'><h2 > loading... </h2></div>)
  )
}

export default Results