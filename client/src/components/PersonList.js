import React,{useContext,useEffect,useState} from 'react'
import PersonContext from '../context/person/PersonContext'
import {Link} from 'react-router-dom'

const PersonList = () => {


    const personContext = useContext(PersonContext)
    const {persons , getAllPersons,searchPersons,deleteChosenPerson,deletePerson} = personContext
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

    <form className="form-inline" onSubmit={onSubmit}>

  <div className="form-group">
    <input type="text" class="form-control" placeholder="Name" value={searchString} onChange={onChange} required/>
  </div>

  <div className="form-group" >
      <input type="submit" class="btn btn-primary" value="Search"/>
      </div>
      <div className="form-group" >
      <Link class="btn btn-outline-success" to="/persons/add">Add Person</Link>
      </div>
      <div className="form-group" >
      <Link class="btn btn-outline-success" to="/groups/add">Add Group</Link>
      </div>
      <div className="form-group" >
      <Link class="btn btn-outline-success" to="/processes/add">Add Process</Link>
      </div>

      <div className="form-group" >
      <Link class="btn btn-outline-success" to="/connect/group-process">Connect Grp-Process</Link>
      </div>

      <div className="form-group" >
      <Link class="btn btn-outline-success" to="/connect/entities">Connect Everything</Link>
      </div>

      <div className="form-group" >
      <Link class="btn btn-outline-success" to="/resource/add">Add New Resource</Link>
      </div>
</form>

<br/>
        <div class="list-group">
            {persons.map(person => <>
            <div><Link class="list-group-item list-group-item-action list-group-item-dark" to={`/person/${person.identity.low}`}> 
            {person.properties.name} ({person.properties.birth} - {person.properties.death})</Link> <button type="button" onClick={() => deletePerson(person.identity.low)} class="btn btn-danger">Delete</button> <Link to={`/persons/${person.identity.low}/edit`} class="btn btn-warning">Edit</Link></div><br/></>)   }
        </div> 

        </>
        : 
        
        <div>No results</div>  }
        </>
    )
}

export default PersonList
