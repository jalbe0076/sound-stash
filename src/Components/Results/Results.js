import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../Card/Card'
import './Results.css'
import { searchAlbums } from '../../api'

function Results() {
  const navigate = useNavigate()
  const {query, page} =useParams()
  const [results, setResults] = useState([])
  const [pagination, setPagination] = useState({page: 1, pages: 1})
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    searchAlbums(query, page)
      .then(data => {
        setResults(data.results)
        setPagination(data.pagination)
        setLoading(false)
      })
      .catch(error => alert(error.message))
      window.scrollTo(0, 0);
  }, [query, page])

  const handleClick = (direction) => {
    setLoading(true)
    if (direction === 'last') {
      navigate(`/search/${query}/${parseInt(page)-1}`)
    }
    if (direction === 'next') {
      navigate(`/search/${query}/${parseInt(page)+1}`)
    }
  }

  return (
    !isLoading ? (<section className='results'>      
      {results.length ? (
        <>
          <div className='results--grid'>
            {results.map(result => (
              <Card key={result.masterId} result={result}/>
            ))}
          </div>
          <div className='results--pages'>
            {pagination.page > 1 && <button className='results--last'onClick={() => handleClick('last')}>previous</button>}
              <p>{pagination.page}</p>
              <p> of </p>
              <p>{pagination.pages}</p>
            {pagination.page < pagination.pages && <button className='results--next' onClick={() => handleClick('next')}>next</button>}
          </div>
        </>
        ) : <div className='results--none'><p>No results for {query}</p></div>}
    </section>) : (<div className ='results--loading'><h2 > loading... </h2></div>)
  )
}

export default Results