import './App.css';
import Layout from './hoc/Layout/Layout';
import React, {Component} from 'react';
import Quiz from './containers/Quiz/Quiz';
import Register from './containers/Auth/Register';
import Login from './containers/Auth/Login';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Landing from './components/Landing/Landing';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Logout from './components/Logout/Logout';
import setAuthToken from './utils/setAuthToken';

class App extends Component {


  render() {

    let routes = (
      <Switch>
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/quiz" component={QuizList} />
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Landing} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.ifAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/quiz" component={QuizList} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    )
  }
}
 
function mapStateToProps(state) {
  return {
    ifAuthenticated: !!state.auth.token
  }
}


export default withRouter(connect(mapStateToProps)(App));