import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import PersonList from './components/PersonList';
import PersonState from './context/person/PersonState';
import GroupList from './components/GroupList';


function App() {
  return (
   <PersonState>
    <Router>

      <Switch>

          <Route exact path="/" component={PersonList} />
          <Route exact path="/groups/:id" component={GroupList} />

      </Switch>

    </Router>
    </PersonState>
  );
}

export default App;
