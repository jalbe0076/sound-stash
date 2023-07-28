import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import './Album.css'
import Form from '../Form/Form'
import { getAlbumsByMasterId } from "../../api"

function Album({setCurrentUser}) {
  const [album, setAlbum] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [modal, setModal] = useState(false)
  
  const {id} = useParams()
  
  const showModal = () => {
    modal ? setModal(false) : setModal(true)
  }

  useEffect(() => {
    getAlbumsByMasterId(id)
      .then(res => {
        setAlbum(res)
        setIsLoading(false)
      })
  }, [])

  
  if(!isLoading) {
    return (
      <>
       <p>{id} hello</p>
       {!modal && <button onClick={showModal}>Add a journal entry</button>}
       {modal && <Form {...album} setCurrentUser={setCurrentUser} showModal={showModal}/>}
      </>
    )
  } 
}
export default Album
