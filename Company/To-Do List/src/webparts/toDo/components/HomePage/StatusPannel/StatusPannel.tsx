import React from 'react'
import "./StatusPannel.scss"
import { IconButton } from '@fluentui/react'
import { IToDoProps } from '../../IToDoProps'

const StatusPannel = ({context,todoData}:any) => {
const PendingTasks = todoData?.filter(
  (item: any) =>
    item.ProjectStatus === "Pending" ||
    item.ProjectStatus === "OverDue" ||
    item.ProjectStatus === "Hold"
).length;
    const UpcomingTasks=todoData?.filter((item:any) => new Date(item.StartDate)>new Date()).length;
    const CompletedTasks=todoData?.filter((item:any) => item.ProjectStatus == "Completed").length;
     const TotalHours = todoData.reduce((time:any,item:any) =>time + Number(item.Hours || 0),0)
  return (
  <div className='ParentStatusPannel'>
      <div className='StatusPannel'>
        <div className='boxes '>
            <div className='boxesIcon'>
                <IconButton style={{color:"black"}} iconProps={{ iconName: 'Clock' }} title="Clock" ariaLabel="Clock    " />
            </div>
            <div className='boxesText'>Pending Tasks</div>
            <div className='boxesNumber'>{PendingTasks || 0}</div>
        </div>
        <div className='boxes '>
             <div className='boxesIcon'>  <IconButton style={{color:"black", fontWeight:900}} iconProps={{ iconName: 'Calendar' }} title="Calendar" ariaLabel="Calendar" /></div>
            <div className='boxesText'>Upcoming Tasks</div>
            <div className='boxesNumber'>{UpcomingTasks || 0 }</div>
        </div>
        <div className='boxes '>
             <div className='boxesIcon'>  <IconButton style={{color:"black"}} iconProps={{ iconName: 'Completed' }} title="Completed" ariaLabel="Completed" /></div>
            <div className='boxesText'>Completed Tasks</div>
            <div className='boxesNumber'>{CompletedTasks || 0}</div>
        </div>
        <div className='boxes '>
             <div className='boxesIcon'>
  <IconButton style={{color:"black"}} iconProps={{ iconName: 'Work' }} title="Work" ariaLabel="Work" />
             </div>
            <div className='boxesText'>Total Hours</div>
            <div className='boxesNumber'>{TotalHours}</div>
        </div>
    </div>
  </div>
  )
}

export default StatusPannel