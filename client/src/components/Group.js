import React from 'react'
import {Link} from 'react-router-dom'
const Group = ({group}) => {
    return (
        <div className="group">
            {group !== null ? 
            <div>
              <Link to={`/groups/${group._id}`}>Group {group._id} :</Link>  
                <h4>Group members :</h4>
                {group.members.map(mem =><> 
                
                <ul>
                    <li> {mem.names[0].name} </li>
                </ul></>)}
                
            </div> 
            : 
            <div>Loading groups...</div>}
        </div>
    )
}

export default Group
