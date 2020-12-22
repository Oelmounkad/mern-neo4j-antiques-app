import React,{useContext,useEffect,useState} from 'react'
import PersonContext from '../context/person/PersonContext'
import {Link} from 'react-router-dom'

const PersonList = () => {


    const personContext = useContext(PersonContext)
    const {persons , getAllPersons,searchPersons,deleteChosenPerson} = personContext
    const [searchString, setSearchString] = useState('')

useEffect(() => {
    getAllPersons()
    deleteChosenPerson()
}, []);

const onChange = e => {
    setSearchString(e.target.value)
}
const onSubmit = e => {
    e.preventDefault()
    searchPersons(searchString)
}
    return (
        <>
        {persons !== null ? 
        <>
    <h2>Persons List :</h2>

    <form onSubmit={onSubmit}>
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control" placeholder="Name" value={searchString} onChange={onChange} required/>
  </div>
  <input type="submit" class="btn btn-primary" value="Search"/>
</form>
<br/>
        <div class="list-group">
            {persons.map(person => 
            <><Link class="list-group-item list-group-item-action list-group-item-dark" to={`/person/${person.identity.low}`}> 
            {person.properties.name} ({person.properties.birth} - {person.properties.death})</Link> <br/></>)   }
        </div> 

        </>
        : 
        
        <div>No results</div>  }
        </>
    )
}

export default PersonList
