import React from "react"
import { useParams } from "react-router-dom"
import './Album.css'
function Album() {
  const {id} = useParams()
  return (
    <p>{id} hello</p>
  )
}
export default Album
