import "./src/styles/global.css";
import React from "react";
import { AppProvider } from "./src/context/AppContext";

export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};
