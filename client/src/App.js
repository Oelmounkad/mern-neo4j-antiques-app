import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import PersonList from './components/PersonList';
import PersonState from './context/person/PersonState';
import Group from './components/Group';
import Person from './components/Person';
import AddPerson from './components/AddPerson';


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

      </Switch>

    </Router>
    </PersonState>
  );
}

export default App;
