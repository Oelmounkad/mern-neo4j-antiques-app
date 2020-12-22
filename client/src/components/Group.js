import React , {useEffect,useContext, Fragment} from "react";
import {Link} from 'react-router-dom'
import { ResponsiveNeoGraph } from "./NeoGraph";
import PersonContext from '../context/person/PersonContext'

const NEO4J_URI = "bolt://20.74.17.168:7687"; //localhost
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "37B9BECE2B";

const Group = props => {
    
    const personContext = useContext(PersonContext)
    const {getGroupById,chosenGroup} = personContext
    const { match: { params } } = props

    useEffect(() => {
      getGroupById(params.id)
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
    </>
      }
     

    </>
  );
};

export default Group;
