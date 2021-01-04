import React,{useContext,useState,useEffect} from 'react'
import PersonContext from '../context/person/PersonContext'

const EditPerson = props => {

    const personContext = useContext(PersonContext)
    const {getPersonById,chosenPerson,editPerson} = personContext

    const { match: { params } } = props

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
    useEffect(() => {
        getPersonById(params.id)
    }, [])

    useEffect(() => {
        if(chosenPerson !== null){
            setPerson({
                    name: chosenPerson.properties.name,
                    gender: chosenPerson.properties.gender,
                    birth: chosenPerson.properties.birth,
                    death: chosenPerson.properties.death
                })
        }
        
    }, [chosenPerson])

    const onSubmit = e => {
        e.preventDefault()
       // console.log(person)
        editPerson(params.id,person)
        setTimeout(() => {
             props.history.push('/')
        }, 1000);
       
    }

    return (
       <>
  <h2>Edit Person :</h2>

  {chosenPerson !== null && 
  <form onSubmit={onSubmit} >
  <div class="form-group">
    <label>Name</label>
    <input type="text" class="form-control" placeholder="Name" value={person.name} name="name" onChange={onChange} required/>
  </div>
  <div class="form-group">
    <label>Gender</label>
    <select class="form-control" value={person.gender} name="gender" onChange={onChange}>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="...">Not defined</option>
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

  <div className="form-group">
      <input type="submit" class="btn btn-warning" value="Edit Person"/>
      </div>

</form>
  }
  
       </>
    )
}

export default EditPerson
