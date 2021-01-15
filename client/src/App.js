import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import PersonList from './components/PersonList';
import PersonState from './context/person/PersonState';
import Group from './components/Group';
import Person from './components/Person';
import AddPerson from './components/AddPerson';
import AddResource from './components/AddResource';
import AddGroup from './components/AddGroup';
import AddProcess from './components/AddProcess';
import ConnectGroupProcess from './components/ConnectGroupProcess';
import EditPerson from './components/EditPerson';
import ConnectEntities from './components/ConnectEntities';
import AddCategory from './components/AddCategory';
import AddObject from './components/AddObject';


function App() {
  return (
   <PersonState>
    <Router>

      <Switch>

          <Route exact path="/" component={PersonList} />
          <Route exact path="/persons" component={PersonList} />
          <Route exact path="/person/:id" component={Person} />
          <Route exact path="/group/:id" component={Group} />
          
          <Route exact path="/persons/add" component={AddPerson} />
          <Route exact path="/persons/:id/edit" component={EditPerson} />
          <Route exact path="/groups/add" component={AddGroup} />
          <Route exact path="/processes/add" component={AddProcess} />

          <Route exact path="/resource/add" component={AddResource} />
          <Route exact path="/connect/group-process" component={ConnectGroupProcess} />
          <Route exact path="/connect/entities" component={ConnectEntities} />

          <Route exact path="/category/add" component={AddCategory} />
          <Route exact path="/object/add" component={AddObject} />

      </Switch>

    </Router>
    </PersonState>
  );
}

export default App;
