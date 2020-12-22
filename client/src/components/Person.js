import React , {useEffect,useContext, Fragment} from "react";
import {Link} from 'react-router-dom'
import { ResponsiveNeoGraph } from "./NeoGraph";
import PersonContext from '../context/person/PersonContext'

const NEO4J_URI = "bolt://20.74.17.168:7687"; //20.74.17.168
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "37B9BECE2B";

const Person = props => {
    
    const personContext = useContext(PersonContext)
    const {getPersonById,getGroupsByPersonId,chosenPerson,chosenPersonGroups} = personContext
    const { match: { params } } = props

    useEffect(() => {
        getPersonById(params.id)
        getGroupsByPersonId(params.id)
    }, [])

  return (/*style={{ fontFamily: "Quicksand"}}*/
    <>
        {chosenPerson !== null && 
        <>
      <h1 style={{ fontFamily: "Quicksand"}}>{chosenPerson.properties.name} ({chosenPerson.properties.birth} - {chosenPerson.properties.death})</h1>

        <ResponsiveNeoGraph
        containerId={"id0"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
        init_cypher={`match(p:Person)-[r*0..]->(g) where id(p)=${params.id} return p,r,g`}
      /> 
      <br/>
      <h5>Person Properties:---------------------------------------</h5>
      {chosenPerson.properties !== null && 
  <div>
    {Object.keys(chosenPerson.properties).map(key => (
      <div> <strong> {key.charAt(0).toUpperCase() + key.slice(1)}</strong>: {chosenPerson.properties[key]}</div>
    ))}
  </div>
}
{chosenPersonGroups !== null && 
      <>
      <h5>Groups he participated in :</h5>
        {
          chosenPersonGroups.map(group => <> <Link to={`/group/${group.identity.low}`}>{group.properties.label}</Link> <br/> </>)
        }

      </>
      }
       
       </>
      }
     

    </>
  );
};

export default Person;
