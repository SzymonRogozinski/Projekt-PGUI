import { createStore } from "redux";
import pReducer from "./PReducer";
import AppData from "../Data-Containers/AppData/AppData";
import AppState from "../Data-Containers/AppState/AppState";

const initialState = {
  appData: new AppData(),
  appStore: new AppState(),
};

const pStore = createStore(pReducer, initialState);

export default pStore;
