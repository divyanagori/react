import React from 'react'
import "./TicketFlow.scss"
import Home from './Home/Home'

function TicketFlow({ context }: any) {
  return (
    <div>
      <Home context={context}/>
    </div>
  )
}

export default TicketFlow