import React , {useEffect,useContext, Fragment} from "react";
import {Link} from 'react-router-dom'
import { ResponsiveNeoGraph } from "./NeoGraph";
import PersonContext from '../context/person/PersonContext'

const NEO4J_URI = "bolt://20.74.17.168:7687"; //20.74.17.168
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "37B9BECE2B";

const Group = props => {
    
    const personContext = useContext(PersonContext)
    const {getGroupById,getGroupMembersByGroupId,chosenGroup,chosenGroupMembers} = personContext
    const { match: { params } } = props

    useEffect(() => {
      getGroupById(params.id)
      getGroupMembersByGroupId(params.id)
    }, [])

  return (/*style={{ fontFamily: "Quicksand"}}*/
    <>
        {chosenGroup !== null && 
        <>
      <h1 style={{ fontFamily: "Quicksand"}}>{chosenGroup.properties.label} </h1>

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
    </>
      }
     

    </>
  );
};

export default Group;
