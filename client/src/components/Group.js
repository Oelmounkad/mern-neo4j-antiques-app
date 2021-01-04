import React , {useEffect,useContext, Fragment} from "react";
import {Link} from 'react-router-dom'
import { ResponsiveNeoGraph } from "./NeoGraph";
import PersonContext from '../context/person/PersonContext'

const NEO4J_URI = "bolt://54.172.13.65:33092"; //20.74.17.168
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "nickel-resident-confusions";

const Group = props => {
    
    const personContext = useContext(PersonContext)
    const {getGroupById,getGroupMembersByGroupId,getGroupProcessesByGroupId,chosenGroup,chosenGroupMembers,chosenGroupProcesses} = personContext
    const { match: { params } } = props

    useEffect(() => {
      getGroupById(params.id)
      getGroupMembersByGroupId(params.id)
      getGroupProcessesByGroupId(params.id)
    }, [])

  return (/*style={{ fontFamily: "Quicksand"}}*/
    <div style={{ fontFamily: "Quicksand"}}>
        {chosenGroup !== null && 
        <>
      <h1>{chosenGroup.properties.label} </h1>

        <ResponsiveNeoGraph
        containerId={"id0"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
        init_cypher={`match(g:Group)-[r*0..]->(n) match(p:Person)-[w:WAS_MEMBER_IN*0..1]->(g) where id(g)=${params.id} return g,r,n,p,w`}
      /> 
      <br/>
      <h4 className="underligned">Group Properties:</h4>
      {chosenGroup.properties !== null && 
  <div>
    {Object.keys(chosenGroup.properties).map(key => (
      <div> <strong> {key.charAt(0).toUpperCase() + key.slice(1)}</strong>: {chosenGroup.properties[key]}</div>
    ))}
  </div>
}
<br/>
      <h4 className="underligned">Group Members:</h4>
      {chosenGroupMembers !== null &&

      chosenGroupMembers.map(cgm => 
        <>
      <div>
        <h4><Link to={`/person/${cgm.identity.low}`}>{cgm.properties.name}</Link></h4>
        <ul>
          {Object.keys(cgm.properties).map(key => (
      <li> <strong> {key.charAt(0).toUpperCase() + key.slice(1)}</strong>: {cgm.properties[key]}</li>
    ))}
        </ul>
    
  </div>
  <br/>
  </>
  )
  
}
<br/>
     
      {chosenGroupProcesses && chosenGroupProcesses[0] && chosenGroupProcesses[0].processes.length !== 0 && <>
      <h4 className="underligned">Group Participated in:</h4>
    {chosenGroupProcesses.map(f => f.processes.map(process => 
      <>
    <div>
      <h4>+{process.node.properties.label}</h4>
      <h6 className="underligned">Properties:</h6>
      <ul>
        {Object.keys(process.node.properties).map(key => (
    <li> <strong> {key.charAt(0).toUpperCase() + key.slice(1)}</strong>: {process.node.properties[key]}</li>
  ))}
      </ul>
  
</div>
                        {/* Process->Subprocess */}
                        {process.subprocesses.length !== 0 && 
                        <div>
                              <h5 className="underligned">Subprocesses:</h5>
                            { process.subprocesses.map(sub => <>
                            <div className="subprocess">
                              <h4>-{sub.node.properties.label}</h4>
                              <h6 className="underligned">Properties:</h6>
                            <ul>
                                {Object.keys(sub.node.properties).map(key => (
                            <li> <strong> {key.charAt(0).toUpperCase() + key.slice(1)}</strong>: {sub.node.properties[key]}</li>
                          ))}
                              </ul>
                            </div>

                                                        {/* SubProcess->Event */}
                                                        {sub.events.length !== 0 && 
                                                      <div>
                                                            
                                                          { sub.events.map(ev => 
                                                          <div className="event">
                                                            <h5 className="underligned">Events:</h5>
                                                            <h4>-{ev.properties.label}</h4>
                                                            <h6 className="underligned">Properties:</h6>
                                                          <ul>
                                                              {Object.keys(ev.properties).map(key => (
                                                          <li> <strong> {key.charAt(0).toUpperCase() + key.slice(1)}</strong>: {ev.properties[key]}</li>
                                                        ))}
                                                            </ul>
                                                          </div>
                                                            
                                                            )}
                                                            </div>}
  
                              
                                    </> )}
                              
                          
                            </div>}

<hr/>
</>
))
                                                              }
  </>
}
    </>
      }
     

    </div>
  );
};

export default Group;
