import React,{useContext,useEffect} from 'react'
import PersonContext from '../context/person/PersonContext'
import Person from './Person'

const PersonList = () => {


    const personContext = useContext(PersonContext)
    const {persons , getAllPersons} = personContext

useEffect(() => {
    getAllPersons()
}, []);

    return (
        <>
        {persons !== null ? 

        <div>
            {persons.map(person => <Person person={person}></Person>)   }
        
        </div> 
        : 
        
        <div>Loading...</div>  }
        </>
    )
}

export default PersonList
