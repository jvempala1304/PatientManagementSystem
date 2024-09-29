import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PatientList from './pages/PatientList';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={PatientList} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
