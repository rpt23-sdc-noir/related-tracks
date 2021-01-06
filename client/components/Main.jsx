import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RelatedTracks from './relatedData.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <Switch>
          <Redirect exact from='/' to='/1' />
          <Route path='/:id' component={RelatedTracks} />
        </Switch>
      </main>
    );
  }
}

export default Main;