import React,{useEffect,useRef,useState,useContext} from 'react'
import PersonContext from '../context/person/PersonContext'


const ConnectGroupProcess = props => {

    const personContext = useContext(PersonContext)
    const {connectGroups,connectGroups2,connectProcesses,connectProcesses2,
            getGroups,getProcesses,filterGroups,
            filterProcesses,connectGroupProcess} = personContext

    const text1 = useRef('')
    const text2 = useRef('')

    const [group, setGroup] = useState('')
    const [processes, setProcesses] = useState([])

    const onGroupChange = e => {
            setGroup(e.target.value)

    }
    const onProcessChange = e => {
        if(!processes.includes(e.target.value)){
            setProcesses([...processes,e.target.value])
        }else{
            setProcesses(processes.filter(item => item !== e.target.value))
        }
    }

    const onGroupSearchChange = e => {
        if(text1.current.value !== ''){
            filterGroups(e.target.value)
        }else{
            getGroups()
        }
    }

    const onProcessSearchChange = e => {
        if(text2.current.value !== ''){
            filterProcesses(e.target.value)
        }else{
            getProcesses()
        }
    }
    useEffect(() => {
        getGroups()
        getProcesses()
    }, [])

    const resetProcesses = () => {
        setProcesses([])
    }
    const resetGroup = () => {
        setGroup('')
    }

    const onSubmit = e => {
        e.preventDefault()
        const groupInt = parseInt(group)
        const processesInt = processes.map(e => parseInt(e))
        const data = {
            group:groupInt,
            processes:processesInt
        }
        if(group !== '' && processes.length !== 0){
            connectGroupProcess(data)
            setTimeout(() => {
                props.history.push('/')
           }, 1000);
        }else{
            alert("fill the group and the processes!!")
        }
    }

    return (
        <>
        <h2>Connect a Group to a process:</h2>

        <form onSubmit={onSubmit}>


  <div class="form-group">
    <label for="members">Groups</label>
    <input ref={text1} type="text" class="form-control" placeholder="Search Groups" name="searchgroup" onChange={onGroupSearchChange}/>
    <select class="form-control" id="members" value={group} onChange={onGroupChange} multiple={false}>
        {connectGroups2 && connectGroups2.length !== 0 && connectGroups2.map(grp => 
            <option value={grp.identity.low}>{grp.properties.label}</option>
            )}
    </select>
    <button onClick={resetGroup} type="button" class="btn btn-warning">reset Groups</button>
  </div>
  {group !== "" && <div>
      <p>selected Group :</p>
      {connectGroups.map(m => group == m.identity.low.toString() && <li>{ m.properties.label }</li>)}
  </div>}
  <div class="form-group">
    <label for="members">Processes</label>
    <input ref={text2} type="text" class="form-control" placeholder="Search Processes" name="searchprocess" onChange={onProcessSearchChange}/>
    <select class="form-control" id="members" value={processes} onChange={onProcessChange} multiple={true}>
        {connectProcesses2.length !== 0 && connectProcesses2.map(pr => 
            <option value={pr.identity.low}>{pr.properties.label}</option>
            )}
    </select>
    <button onClick={resetProcesses} type="button" class="btn btn-warning">reset Processes</button>
  </div>
  {processes.length !== 0 && <div>
      <p>selected processes :</p>
      <ul>
          {connectProcesses.map(m => processes.includes(m.identity.low.toString()) && <li>{ m.properties.label }</li>)}
      </ul>
  </div>}
  
  <div className="form-group" >
      <input type="submit" class="btn btn-success" value="submit"/>
      </div>
</form>
</>
    )
}

export default ConnectGroupProcess
