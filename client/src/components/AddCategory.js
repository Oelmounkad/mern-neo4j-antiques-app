import React,{useContext,useState} from 'react'
import PersonContext from '../context/person/PersonContext'

const AddCategory = props => {


    const personContext = useContext(PersonContext)
    const {addCategory} = personContext
  
    const [categLabel, setCategLabel] = useState('')
    const [categProperties, setCategProperties] = useState('')
  
    const onChangeCategLabel = e => {
          setCategLabel(e.target.value)
    }
    const onChangeCategProperties = e => {
      setCategProperties(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        if(categLabel !== '' && categProperties !== ''){
            let data = {
                categLabel,
                categProperties
            }
            addCategory(data)
            setCategLabel('')
            setCategProperties('')
            setTimeout(() => {
                props.history.push('/')
           }, 1000);
        }else{
            alert('Fill the two fields!!')
        }
    }
    return (
        <div>
        <h1>Add new Category:</h1>
        <form onSubmit={onSubmit}>
        <div class="form-group">
          <label>Category Name</label>
          <input type="text" class="form-control" placeholder="Category Name" value={categLabel} name="categLabel" onChange={onChangeCategLabel} required/>
        </div>
        <div class="form-group">
          <label>Category Properties</label>
          <input type="text" class="form-control" placeholder="Properties - format : property1,property2 etc.." value={categProperties} name="categProperties" onChange={onChangeCategProperties} required/>
        </div>

        <div className="form-group" >
          <input type="submit" class="btn btn-success" value="Add Category"/>
        </div>
        </form>
    </div>
    )
}

export default AddCategory
