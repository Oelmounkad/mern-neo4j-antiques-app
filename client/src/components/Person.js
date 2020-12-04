import React from 'react'
import Group from './Group'
import Func from './Func'
const Person = ({person}) => {
    return (
        <>
        <div id="name">
    <h1>{person.names[0].name}</h1>
        </div>
        <div id="names">
           <strong>1) Names of this person :</strong><br/> <br/> 
            {person.names.map(name => <ul>
           <li> {name.name} <strong>According to : ({name.source.livre} , p: {name.source.page})</strong> </li>
            </ul>
            )}
        </div>
        <div id="groups">
        <strong>2) Groups of people in which this person participated:</strong><br/> <br/>
        {person.groups.map(group => <Group group={group}></Group>)} 
        </div>

        <div id="functions">
        <strong>3) Functions:</strong><br/> <br/>
                {person.functions.map(func => <Func func={func}></Func>)}
        </div>

        <hr></hr>
        </>
    )
}

export default Person
