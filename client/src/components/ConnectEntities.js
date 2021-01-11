import React,{useContext,useState,useEffect} from 'react'
import PersonContext from '../context/person/PersonContext'


const ConnectEntities = props => {

    const personContext = useContext(PersonContext)
    const {entities1,entities2,entities1labels,entities2labels,
        getEntities1,getEntities2,getEntityLabels,
        relationships,getRelationships,
        connectTwoEntities} = personContext


    const [entities1label, setEntities1label] = useState('Person')
    const [entities2label, setEntities2label] = useState('Person')

    const [entity1, setEntity1] = useState('')
    const [entity2, setEntity2] = useState('')

    const [relationship, setRelationship] = useState('')

    const [newrel, setNewrel] = useState('')

    const [relDisable, setRelDisable] = useState(false)
    const onChangeEntities1Label = e => {
        setEntities1label(e.target.value)
    }
    const onChangeEntities2Label = e => {
        setEntities2label(e.target.value)
    }

    const onChangeEntity1 = e => {
        setEntity1(e.target.value)
    }
    const onChangeEntity2 = e => {
        setEntity2(e.target.value)
    }

    const onChangeRelationship = e => {
        setRelationship(e.target.value)
    }
    const onChangeNewRel = e => {
        setNewrel(e.target.value)
        if(e.target.value == ""){
            setRelDisable(false)
        }else{
            setRelDisable(true)
            setRelationship('')
        }
    }

    useEffect(() => {
      getEntityLabels()
      getRelationships()
    }, [])

    useEffect(() => {
        getEntities1(entities1label)
        getEntities2(entities2label)
    }, [entities1label,entities2label])

    const onSubmit = e => {
        e.preventDefault()
        const data = {
            lab1:entities1label,
            ent1:entity1,
            lab2:entities2label,
            ent2:entity2,
            rel:relationship
        }
        if(newrel !== ""){
            data.rel = newrel
        }
        if(entity1 == "" || entity2 == ""){
            alert("All entities should be filled!")
        }else if(relDisable == true && newrel == ""){
            alert("Add the new relationship")
        }else if(relDisable == false && relationship == ""){
            alert("Select the relationship")
        }
        
        else{
            connectTwoEntities(data)
            setTimeout(() => {
                props.history.push('/')
           }, 1500);
        }
        
    }
    return (
        <form onSubmit={onSubmit} >

       <div class="form-group">
          <label>Category 1</label>
          <select class="form-control" value={entities1label} onChange={onChangeEntities1Label} multiple={false}>
        {entities1labels.length !== 0 && entities1labels.map(enl => 
            <option value={enl}>{enl}</option>
            )}
    </select>
        </div>
        <div class="form-group">
        <label>Value</label>
          <select class="form-control" id="members" value={entity1} onChange={onChangeEntity1} multiple={false}>
        {entities1.length !== 0 && entities1.map(f => 
            <option value={f.identity.low}>{f.properties.label}</option>
            )}
            <option value=""></option>
    </select>
        </div>
{/*--------------------------*/}
<hr/>
<div class="form-group">
          <label>Category 2</label>
          <select class="form-control" value={entities2label} onChange={onChangeEntities2Label} multiple={false}>
        {entities2labels.length !== 0 && entities2labels.map(enl => 
            <option value={enl}>{enl}</option>
            )}
    </select>
        </div>
        <div class="form-group">
        <label>Value</label>
          <select class="form-control" id="members" value={entity2} onChange={onChangeEntity2} multiple={false}>
        {entities2.length !== 0 && entities2.map(en => 
            <option value={en.identity.low}>{en.properties.label}</option>
            )}
            <option value=""></option>
    </select>
        </div>
        <hr/>
{/*--------------------------*/}

        <div class="form-group">
                <label>Relationship</label>
                <select class="form-control" value={relationship} onChange={onChangeRelationship} multiple={false} disabled={relDisable}>
                {relationships.length !== 0 && relationships.map(rel => 
                    <option value={rel}>{rel}</option>
                    )}
                    <option value=""></option>
            </select>
            <label>You don't see your relationship ?</label>
            <input type="text" class="form-control" placeholder="New relationship" value={newrel} name="newrel" onChange={onChangeNewRel} />
                </div>
      
    <div className="form-group" >
      <input type="submit" class="btn btn-success" value="Create Relationship"/>
      </div>

      </form>
    )
}

export default ConnectEntities
