import React,{useState,useEffect, useContext,useRef} from 'react'
import PersonContext from '../context/person/PersonContext'

const AddGroup = () => {

    const personContext = useContext(PersonContext)
    const {members,members2,getMembers,filterMembers} = personContext

    const [group, setGroup] = useState('')
    const [test, setTest] = useState([])

    const text = useRef('')

    const onChange = e => {
        if(text.current.value !== ''){
            filterMembers(e.target.value)
        }else{
            getMembers()
        }
    }

    const onLabelChange = e => {
        setGroup(e.target.value)
    }
    const onMemberChange = e => {
        if(!test.includes(e.target.value)){
            setTest([...test,e.target.value])
        }else{
            setTest(test.filter(item => item !== e.target.value))
        }
        
    }
const resetSelect = () => {
    setTest([])
}

    const onSubmit = e => {
        e.preventDefault()
        console.log("test : "+test)
        
    }

    useEffect(() => {
        getMembers()
        console.log(members)
    }, [])

    return (
        <>
        <h2>Create Group :</h2>

        <form onSubmit={onSubmit}>

  <div class="form-group">
    <label>Label</label>
    <input type="text" class="form-control" placeholder="Label" value={group} name="group" onChange={onLabelChange} required/>
  </div>

  <div class="form-group">
    <label for="members">Members</label>
    <input ref={text} type="text" class="form-control" placeholder="Search" name="search" onChange={onChange}/>
    <select class="form-control" id="members" value={test} onChange={onMemberChange} multiple={true}>
        {members2.length !== 0 && members2.map(member => 
            <option value={member.identity.low}>{member.properties.name}</option>
            )}
    </select>
    <button onClick={resetSelect} type="button" class="btn btn-warning">reset members</button>
  </div>
  {test.length !== 0 && <div>
      <p>selected members :</p>
      <ul>
          {members.map(m => test.includes(m.identity.low.toString()) && <li>{ m.properties.name }</li>)}
      </ul>
  </div>}
  
  <div className="form-group" >
      <input type="submit" class="btn btn-success" value="submit"/>
      </div>
</form>
</>
    )
}

export default AddGroup
