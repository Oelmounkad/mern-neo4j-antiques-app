import React,{useContext,useState} from 'react'
import PersonContext from '../context/person/PersonContext'


const AddResource = () => {

  const personContext = useContext(PersonContext)
  const {addPerson} = personContext

  const [categLabel, setCategLabel] = useState('')
  const [categProperties, setCategProperties] = useState('')

  const onChangeCategLabel = e => {
        setCategLabel(e.target.value)
  }
  const onChangeCategProperties = e => {
    setCategProperties(e.target.value)
  }

  return (
      <div>
          <h1>Add new Resource:</h1>
          <form >
          <div class="form-group">
            <label>Category Label</label>
            <input type="text" class="form-control" placeholder="Category Label" value={categLabel} name="categLabel" onChange={onChangeCategLabel} required/>
          </div>
          <div class="form-group">
            <label>Object Properties</label>
            <input type="text" class="form-control" placeholder="Properties - format : property_name:value,property_name:value etc.." value={categProperties} name="categProperties" onChange={onChangeCategProperties} required/>
          </div>

          <div className="form-group" >
            <input type="submit" class="btn btn-success" value="Add Resource"/>
          </div>
          </form>
      </div>
    )
}

export default AddResource
