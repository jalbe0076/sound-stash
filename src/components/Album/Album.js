import React, { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import './Album.css'
import Form from '../Form/Form'
import { getAlbumById } from "../../api"

function Album({setUser}) {
  const [album, setAlbum] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [modal, setModal] = useState(false)
  
  const showModal = () => {
    modal ? setModal(false) : setModal(true)
  }

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
      <button onClick={showModal}>Add a journal entry</button>
      {modal && <Form {...album} setUser={setUser} showModal={showModal}/>}
      </>
    )
  } 
}
export default Album
