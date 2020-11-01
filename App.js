import React from "react";
//import logo from "./logo.svg";
import "./App.css";

import * as firebase from "firebase/app";
import "firebase/firestore";

import { credentials } from "./config/credentials";

import Navbar from "./Components/Navbar";
import Homepage from "./Components/screens/Home";

function App() {
  firebase.initializeApp(credentials);
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Homepage />
      </main>
    </React.Fragment>
  );
}

export default App;
