import React from 'react'
import {useContext} from "react"
import {DataContext} from "../../store/Globalstate"
function Services() {
    const {state,dispatch} = useContext(DataContext)
    const {allstate} = state
  return (
    <div>Services</div>
  )
}

export default Services