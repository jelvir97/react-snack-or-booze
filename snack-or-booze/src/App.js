import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function getSnacks() {
      let {snacks , drinks} = await SnackOrBoozeApi.getSnacks();
      setSnacks(snacks);
      setDrinks(drinks);
      setIsLoading(false);
    }
    getSnacks();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={snacks} />
            </Route>

            <Route exact path="/snacks">
              <Menu items={snacks} resource="snacks" title="Food" />
            </Route>
            <Route path="/snacks/:id">
              <MenuItem items={snacks} cantFind="/snacks" />
            </Route>

            <Route exact path="/drinks">
              <Menu items={drinks} resource="drinks" title="Drinks" />
            </Route>
            <Route path="/drinks/:id">
              <MenuItem items={drinks} cantFind="/drinks" />
            </Route>

            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
