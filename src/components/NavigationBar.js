import React from "react";
import {Navbar, NavItem, Nav} from "react-bootstrap";

const NavigationBar = () => {
  return (
    <div>
      <div className="App" />
      <Navbar fluid={true}>
        <Nav>
          <NavItem href="/">Top Stories</NavItem>
          <NavItem href="/business">Business</NavItem>
          <NavItem href="/entertainment">Entertainment</NavItem>
          <NavItem href="/health">Health</NavItem>
          <NavItem href="/science">Science</NavItem>
          <NavItem href="/sport">Sport</NavItem>
          <NavItem href="/technology">Technology</NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
