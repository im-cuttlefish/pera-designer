import React from "react";
import ReactDOM from "react-dom";
import "ress/dist/ress.min.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { DefaultTypelessProvider } from "typeless";
import { App } from "./components/App/App";

ReactDOM.render(
  <DefaultTypelessProvider>
    <App />
  </DefaultTypelessProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

