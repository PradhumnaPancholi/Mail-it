import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

//temp components to verify routes//
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>Add a new survey</h2>

class App extends Component{

  componentDidMount(){
    this.props.fetchUser();
    }

  render() {
    return(
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route exact path="/" component={Landing} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);
