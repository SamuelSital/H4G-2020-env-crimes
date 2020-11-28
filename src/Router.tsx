import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Discussion from "./discussion";
import App from "./App";

const Router = () => (
  <BrowserRouter>
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav> */}

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/map">
          <MapView />
        </Route>
        <Route path="/anomaly/:id">
          <Discussion />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
);

const MapView = () => <p>Placeholder</p>
const Home = () => <div>
  
  <App />
  [Placeholder] <Link to="/anomaly/test">Go to dummy anomaly</Link>
</div>

export default Router;