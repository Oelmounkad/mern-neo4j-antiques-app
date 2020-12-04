import React,{useEffect,useContext} from 'react'
import PersonContext from '../context/person/PersonContext'
const GroupList = props => {

    const personContext = useContext(PersonContext)
    const { match: { params } } = props

    useEffect(() => {
        personContext.getGroup(params.id)
    }, [])

    return (
        <div>
           {personContext.group !== null ? 
           <>
            <div id="members">
           <strong>1) Members:</strong>
            {personContext.group.members.map(mem =><> 
                
                <ul>
                    <li> {mem.names[0].name} </li>
                </ul></>)}
            </div>

           <div id="processes"> 

           <strong>2) Processes:</strong>

           {personContext.group.processes.map(pro => 
                
           <ul>
               <li> <strong> {pro.label}</strong> <p>subprocesses:</p> {pro.subprocesses.map(subpro => <div>
               
               <ul>

               <li>{subpro.label} {subpro.events.map(ev => <ul>
               <li>{ev.label} 
               
               </li>
               </ul>)} </li>

               </ul></div>)}</li>

           </ul>
           
           
           )} 
           
           </div> 
           </>
           
           : 
           
           <div className="">Loading...</div> }
        </div>
    )
}

export default GroupList
