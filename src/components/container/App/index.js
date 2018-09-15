import React from 'react';
import Header from '../Header';
import Home from '../Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Movie from '../Movie';
import NotFound from '../NotFound';
const App = () => {
    return (
      <BrowserRouter>
        <React.Fragment>
            <Header />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/:movieId" component={Movie} exact/>
              <Route component={NotFound} />
            </Switch>
        </React.Fragment>
      </BrowserRouter> 
    )
}

export default App;
