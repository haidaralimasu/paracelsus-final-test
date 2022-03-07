import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Undp from "../components/undp/Minter";
import Drup from "../components/drup/Drup";
import Salp from "../components/salp/Salp";
import Sylp from "../components/sylp/Minter";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Salp} />
        <Route path="/salp" exact component={Salp} />
        <Route path="/sylp" exact component={Sylp} />
        <Route path="/drup" exact component={Drup} />
        <Route path="/undp" exact component={Undp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
