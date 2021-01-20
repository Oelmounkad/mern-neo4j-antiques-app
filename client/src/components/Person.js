import React , {useEffect,useContext, Fragment} from "react";
import {Link} from 'react-router-dom'
import { ResponsiveNeoGraph } from "./NeoGraph";
import PersonContext from '../context/person/PersonContext'


const NEO4J_URI = "bolt://54.172.13.65:33511"; //20.74.17.168
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "sale-independence-spars";

const Person = props => {
    
    const personContext = useContext(PersonContext)
    const {getPersonById,getGroupsByPersonId,getNamesByPersonId,chosenPerson,chosenPersonGroups,chosenPersonNames} = personContext
    const { match: { params } } = props

    useEffect(() => {
        getPersonById(params.id)
        getGroupsByPersonId(params.id)
        getNamesByPersonId(params.id)
    }, [])

  return (/*style={{ fontFamily: "Quicksand"}}*/
    <div style={{ fontFamily: "Quicksand"}}>
        {chosenPerson !== null && 
        <>
      <h1>{chosenPerson.properties.name} ({chosenPerson.properties.birth} - {chosenPerson.properties.death})</h1>

        <ResponsiveNeoGraph
        containerId={"id0"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
        init_cypher={`match(p:Person)-[r*0..]->(g) where id(p)=${params.id} return p,r,g`}
      /> 
      <br/>
      <h4 className="underligned">Person Properties:</h4>
      {chosenPerson.properties !== null && 
  <ul>
    {Object.keys(chosenPerson.properties).map(key => (
      <li> <strong> {key.charAt(0).toUpperCase() + key.slice(1)}</strong>: {chosenPerson.properties[key]}</li>
    ))}
  </ul>
}
<hr className="hr1" />
{chosenPersonGroups.length !== 0 ?
      (<>
      <h4 className="underligned">Participated in :</h4>
        {
          chosenPersonGroups.map(group => <> <h5> <Link to={`/group/${group.identity.low}`}>{group.properties.label}</Link></h5> <br/> </>)
        }

      </>) : <h4 style={{color: 'red'}}>No groups found for {chosenPerson.properties.name} !</h4>
      }
      <hr className="hr1" />


      {chosenPersonNames && chosenPersonNames[0] && chosenPersonNames[0].names.length !== 0 && <>
    <h4 className="underligned">Names:</h4>
    {chosenPersonNames.map(f => f.names.map(name => 
      <>
    <div>
      <h4>+{name.node.properties.name}</h4>
      <h6 className="underligned">Properties:</h6>
      <ul>
        {Object.keys(name.node.properties).map(key => (
    <li> <strong> {key.charAt(0).toUpperCase() + key.slice(1)}</strong>: {name.node.properties[key]}</li>
  ))}
      </ul>
  
</div>                  

          {name.sources.length !== 0 && <>
           <h5 className="underligned">Sources:</h5>
           {name.sources.map(source => 
            
                <div className="source">
                      <h4>+{source.node.properties.book}</h4>
                      <h6 className="underligned">Properties:</h6>
                      <ul>
                        {Object.keys(source.node.properties).map(key => (
                    <li> <strong> {key.charAt(0).toUpperCase() + key.slice(1)}</strong>: {source.node.properties[key]}</li>
                  ))}
                      </ul>
                  
                </div>  
            )}
            </>
            }

<hr className="hr2" />
</>
))
  
} </> }
       </>
      }
     

    </div>
  );
};

export default Person;
