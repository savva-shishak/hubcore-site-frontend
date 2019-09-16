import React from 'react';
import { Route, BrowserRouter as Routes, Switch } from "react-router-dom";

import Main from "./Main/Main.jsx";
import Articles from "./Articles/Articles.jsx";
import Projects from "./Projects/Projects.jsx";
import TechSup from "./TechSup/TechSup.jsx";
import Rating from "./Rating/Rating.jsx";
import Voting from "./Voting/Voting.jsx";
import Financing from "./Financing/Financing.jsx";
import Marketplace from "./Marketplace/Marketplace.jsx";
import Burse from "./Burse/Burse.jsx";
import PersHub from "./PersHub/PersHub.jsx";

import Profile from "./Profile/Profile.jsx";

import Menu from "./Menu/Menu.jsx"

import "./App.scss"

export default class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Routes>
          <Menu open={true}/>
          <div className="app-content">
            <div className="container">
              <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/rating" component={Rating}/>
                <Route path="/personalHub" component={PersHub}/>
                <Route path="/projects" component={Projects}/>
                <Route path="/techSupport" component={TechSup}/>
                <Route path="/articles" component={Articles}/>
                <Route path="/voting" component={Voting}/>
                <Route path="/financing" component={Financing}/>
                <Route path="/marketplace" component={Marketplace}/>
                <Route path="/burse" component={Burse}/>
                <Route path="/profile" component={Profile}/>
              </Switch>
            </div>
          </div>
        </Routes>
      </div>
    )
  }
}