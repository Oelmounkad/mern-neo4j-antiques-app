import React,{useState,useContext} from 'react'
import PersonContext from '../context/person/PersonContext'

const AddPerson = props => {

    const personContext = useContext(PersonContext)
    const {addPerson} = personContext

    const [person, setPerson] = useState({
        name: '',
        gender: 'Male',
        birth: '',
        death: ''
    })
    const onChange = e => {
        setPerson({
            ...person,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        console.log(person)
        addPerson(person)
        setTimeout(() => {
             props.history.push('/')
        }, 2000);
       
    }

    return (
        <>
        <h2>Add Person :</h2>
        <form onSubmit={onSubmit}>
  <div class="form-group">
    <label>Name</label>
    <input type="text" class="form-control" placeholder="Name" value={person.name} name="name" onChange={onChange} required/>
  </div>
  <div class="form-group">
    <label>Gender</label>
    <select class="form-control" value={person.gender} name="gender" onChange={onChange}>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  </div>

  <div class="form-group">
    <label>Birth Year</label>
    <input type="text" class="form-control" placeholder="Birth Year" name="birth" value={person.birth} onChange={onChange}/>
  </div>

  <div class="form-group">
    <label>Death Year</label>
    <input type="text" class="form-control" placeholder="Death Year" name="death" value={person.death} onChange={onChange}/>
  </div>

  <div className="form-group" >
      <input type="submit" class="btn btn-success" value="Add Person"/>
      </div>

</form>
</>
    )
}

export default AddPerson
