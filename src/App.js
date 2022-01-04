import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import login from './pages/login';
import Game from './pages/game';
import Settings from './pages/settings';
import Feedback from './pages/feedback';
import Ranking from './pages/ranking';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ login } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}

export default App;
