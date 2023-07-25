import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../Card/Card'
import './Results.css'
import { searchAlbums } from '../../api'

function Results() {
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
            {pagination.page > 1 && <Link className='results--last' to={`/search/${query}/${parseInt(page)-1}`}>previous</Link>}
              <p>{pagination.page}</p>
              <p> of </p>
              <p>{pagination.pages}</p>
            {pagination.page < pagination.pages && <Link className='results--next' to={`/search/${query}/${parseInt(page)+1}`}>next</Link>}
          </div>
        </>
        ) : <div className='results--none'><p>No results for {query}</p></div>}
    </section>) : (<div className ='results--loading'><p> loading... </p></div>)
  )
}

export default Results