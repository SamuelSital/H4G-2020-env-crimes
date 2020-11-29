import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Discussion from "./discussion";
import MapView from "./MapView";
import LandingPage from "./landing-page/LandingPage";
import DataView from "./DataView";
import GraphView from './graph';

const Router = () => (
  <BrowserRouter>
    <div>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/graph">
          <GraphView />
        </Route>
        <Route path="/map">
          <MapView />
        </Route>
        <Route path="/posts/:id/data">
          <DataView />
        </Route>
        <Route path="/posts/:id/discuss">
          <Discussion />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;
