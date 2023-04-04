import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import './App.css';
import Layout from './components/layout/Layout';
import TakeACar from './pages/TakeACar';
import Directory from './pages/Directory';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Layout>
      <h1>Rapid Servise</h1>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/homepage"></Redirect>
        </Route>
        <Route path="/takeAcar">
          <TakeACar />
        </Route>
        <Route path="/directory">
          <Directory />
        </Route>
        <Route path="/reports">
          <Reports />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </Layout>
  );
}
//напиши мне функцию фильтрации списка в select
export default App;
