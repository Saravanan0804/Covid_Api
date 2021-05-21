import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/title";
import Home from "../src/Components/sara";
import CoronaList  from './Components/CoronaList';
import Footer from "../src/Components/Footer";
import Edit from './Components/Edit';


const App = () => {
  return (
      <Router>
        <Header />
        <Switch>
            <div className="content">
              <Route exact path="/" component={Home} />
              <Route path='/corona' exact={true} component={CoronaList } />
              <Route path='/corona/:key' component={Edit} />
            </div>
        </Switch>
        <Footer />
      </Router>
  );
}

export default App;
