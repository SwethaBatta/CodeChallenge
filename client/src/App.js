import React from "react";
import "./App.scss";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
