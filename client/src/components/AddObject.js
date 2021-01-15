import React,{useContext,useState,useEffect} from 'react'
import PersonContext from '../context/person/PersonContext'

const AddObject = props => {

    const personContext = useContext(PersonContext)
    const {getNewlyAddedCategories,getPropertiesForCategory,
        newlyAddedCategories,chosenCategoryProperties,addObject} = personContext

    const [categ, setCateg] = useState('')
    const [object, setObject] = useState({})


    const onChange = e => {
        setObject({...object,[e.target.name]:e.target.value})
    }


    const onChangeCateg = e => {
        setCateg(e.target.value)
    }
    useEffect(() => {
        getNewlyAddedCategories()
    },[])

    useEffect(() => {
        if(categ !== ''){
            getPropertiesForCategory(categ)
        }
    },[categ])

    const onSubmit = e => {
        e.preventDefault()
        if(Object.keys(object).length === 0){
            alert("Fill the form")
        }else{
            let data = {
                categ,
                object
            }
            addObject(data)
            setTimeout(() => {
                props.history.push('/')
           }, 1000)
        }
    }
    return (
        <div>
        <h1>Add new Object:</h1>
        <form onSubmit={onSubmit}>
        <div class="form-group">
        <label>Category Name</label>
          <select class="form-control" value={categ} onChange={onChangeCateg} multiple={false}>
        {newlyAddedCategories.length !== 0 && newlyAddedCategories.map(categ => 
            <option value={categ}>{categ}</option>
            )}
            <option value=""></option>
    </select>
    </div>

    {
        chosenCategoryProperties.length !== 0 ? 
        
        <form onSubmit={onSubmit}>

            {chosenCategoryProperties.map(property => 
                <>
                <div class="form-group">
                    <label>{property}</label>
                    <input type="text" class="form-control" placeholder={property} name={property} value={object[property]} onChange={onChange}/>
                </div>
                </>
                )}

        </form> 
        
        
        
        
        
        
        : <p style={{color: 'red'}}>Select a Category!</p>
    }

        <div className="form-group" >
          <input type="submit" class="btn btn-success" value="Add Object"/>
        </div>
        </form>
    </div>
    )
}

export default AddObject
