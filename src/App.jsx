import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useIsAuthorized } from './Hooks/useIsAuthorized';
import { HomeRoute, TasksRoute } from './Routes';
import { Home } from './Pages/Home/Home';
import { Tasks } from './Pages/Tasks/Tasks';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import './App.css';

export const App = () => {
  const isAuthorized = useIsAuthorized();

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path={HomeRoute} exact component={Home} />
          {isAuthorized &&
            <Route path={TasksRoute} component={Tasks} />
          }
          {!isAuthorized &&
            <Route path="/" component={Home} />}
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}