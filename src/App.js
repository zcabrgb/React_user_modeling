/* App ROOT Component */
import {BrowserRouter, Route} from "react-router-dom";
import React, {Component} from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Feed from "./components/Feed";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Feed />
        </div>
      </BrowserRouter>
    );
  }
  getCurrentDate() {
    var newDate = new Date();
    var month = (newDate.getMonth() + 1).toString();
    var date = newDate.getDay().toString();
    var hour = newDate.getHours().toString();
    var minutes = newDate.getMinutes().toString();
    var seconds = newDate.getSeconds().toString();
    var milis = newDate.getMilliseconds().toString();
    var result =
      date +
      "/" +
      month +
      "/" +
      hour +
      ":" +
      minutes +
      ":" +
      seconds +
      ":" +
      milis;
    return result;
  }
  updateInput(value) {
    var key = this.getCurrentDate();
    localStorage.setItem(key, value);
  }
}

export default App;
