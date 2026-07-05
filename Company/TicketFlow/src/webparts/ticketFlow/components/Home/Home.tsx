import React from 'react'
import "./Home.scss"
import NewTicket from './NewTicket/NewTicket'
import "./Home.scss"
import TicketDataList from './TicketDataList/TicketDataList'
const Home = ({ context }: any ) => {
  return (
    <div>

        <TicketDataList context={context}/>
    </div>
  )
}

export default Home