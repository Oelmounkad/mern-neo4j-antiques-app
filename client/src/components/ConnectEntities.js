import React,{useContext,useState,useEffect} from 'react'
import PersonContext from '../context/person/PersonContext'


const ConnectEntities = () => {

    const personContext = useContext(PersonContext)
    const {entities1,entities2,entities1labels,entities2labels,
        getEntities1,getEntities2,getEntityLabels,
        relationships,getRelationships,
        connectTwoEntities} = personContext


    const [entities1label, setEntities1label] = useState('')
    const [entities2label, setEntities2label] = useState('')

    const [entity1, setEntity1] = useState()
    const [entity2, setEntity2] = useState()

    const [relationship, setRelationship] = useState('')

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
        connectTwoEntities(data)
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
        {entities1.length !== 0 && entities1.map(en => 
            <option value={en.identity.low}>{en.properties.label}</option>
            )}
            <option value=""></option>
    </select>
        </div>
{/*--------------------------*/}
<hr/>
<div class="form-group">
          <label>Category 1</label>
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
                <select class="form-control" value={relationship} onChange={onChangeRelationship} multiple={false}>
                {relationships.length !== 0 && relationships.map(rel => 
                    <option value={rel}>{rel}</option>
                    )}
            </select>
                </div>
      
    <div className="form-group" >
      <input type="submit" class="btn btn-success" value="Create Relationship"/>
      </div>

      </form>
    )
}

export default ConnectEntities
