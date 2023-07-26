import React, { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import './Album.css'
import Form from '../Form/Form'
import { getAlbumById } from "../../api"

function Album({setUser}) {
  const [album, setAlbum] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    getAlbumById(id)
      .then(res => {
        setAlbum(res)
        setIsLoading(false)
      })
  }, [])

  const {id} = useParams()
  
  if(!isLoading) {
    return (
      <>
      <p>{id} hello</p>
      <Form {...album} setUser={setUser}/>
      </>
    )
  } 
}
export default Album
