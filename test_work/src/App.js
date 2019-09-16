import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import store from '../src/store/store';
import { Provider } from 'react-redux';
import Questionnaire from './components/Questionnaire/Questionnaire';
import Result from './components/Result/Result';
import MainPage from './components/MainPage/MainPage';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={() => <MainPage />} />
          <Route path='/Questionnaire/:number' render={() => <Questionnaire />} />
          <Route path='/Result' render={() => <Result />} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
