import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BoardWrite from './components/BoardWrite';
import BoardView from './components/BoardView';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={BoardWrite} />
        <Route path="/view" component={BoardView} />
      </Switch>
    </Router>
  );
};

export default App;