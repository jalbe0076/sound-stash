import React from "react"
import { useParams } from "react-router-dom"
import './Album.css'
import Form from '../Form/Form'

function Album() {
  const {id} = useParams()
  return (
    <>
    <p>{id} hello</p>
    <Form />
    </>
  )
}
export default Album
