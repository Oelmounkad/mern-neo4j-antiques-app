import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import PersonList from './components/PersonList';
import PersonState from './context/person/PersonState';
import Group from './components/Group';
import Person from './components/Person';
import AddPerson from './components/AddPerson';
import AddResource from './components/AddResource';
import AddGroup from './components/AddGroup';


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
          <Route exact path="/groups/add" component={AddGroup} />

          <Route exact path="/add" component={AddResource} />

      </Switch>

    </Router>
    </PersonState>
  );
}

export default App;
