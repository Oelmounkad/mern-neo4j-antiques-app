import React,{useState,useContext} from 'react'
import PersonContext from '../context/person/PersonContext'

const AddProcess = props => {

    const personContext = useContext(PersonContext)
    const {createProcess} = personContext

    const [process, setProcess] = useState({
        label: '',
        timeFrom: '',
        timeTo: '',
        type:'Voluntary',
        pullreasons:'',
        pushreasons:'',
        from: '',
        to: ''
    })
    const [source, setSource] = useState({
        book:'',
        page:''
    })
    const onChange = e => {
        setProcess({
            ...process,
            [e.target.name]: e.target.value
        })
    }
    const onChangeSource = e => {
        setSource({
            ...source,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        const data = {
            process,
            source
        }
        createProcess(data)

        setTimeout(() => {
             props.history.push('/')
        }, 1000);
       
    }

    return (
        <>
        <h2>Add Process :</h2>
        <form onSubmit={onSubmit}>
  <div class="form-group">
    <label>Label</label>
    <input type="text" class="form-control" placeholder="Label" value={process.label} name="label" onChange={onChange} required/>
  </div>

  <div class="form-group">
    <label>Date</label>
    <input type="text" class="form-control" placeholder="From" name="timeFrom" value={process.timeFrom} onChange={onChange}/>
    <input type="text" class="form-control" placeholder="To" name="timeTo" value={process.timeTo} onChange={onChange}/>
  </div>

  <div class="form-group">
    <label>Location</label>
    <input type="text" class="form-control" placeholder="From" name="from" value={process.from} onChange={onChange}/>
    <input type="text" class="form-control" placeholder="To" name="to" value={process.to} onChange={onChange}/>
  </div>

  <div class="form-group">
    <label>Type</label>
    <select class="form-control" value={process.type} name="type" onChange={onChange}>
      <option value="Voluntary">Voluntary</option>
      <option value="Forced">Forced</option>
      <option value="Forced and Voluntary">Both Forced and Voluntary</option>
      <option value="...">Not defined</option>
    </select>
  </div>

  <div class="form-group">
    <label>Pull reasons</label>
    <input type="text" class="form-control" placeholder="Pull Reasons" name="pullreasons" value={process.pullreasons} onChange={onChange}/>
  </div>

  <div class="form-group">
    <label>Push Reasons</label>
    <input type="text" class="form-control" placeholder="Push Reasons" name="pushreasons" value={process.pushreasons} onChange={onChange}/>
  </div>

  <div class="form-group">
    <label>Source</label>
    <input type="text" class="form-control" placeholder="Book name" name="book" value={source.book} onChange={onChangeSource}/>
    <input type="text" class="form-control" placeholder="Book page" name="page" value={source.page} onChange={onChangeSource}/>
  </div>

  <div className="form-group" >
      <input type="submit" class="btn btn-success" value="Add Process"/>
      </div>

</form>
</>
    )
}

export default AddProcess
