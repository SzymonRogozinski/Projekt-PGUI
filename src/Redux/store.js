import { createStore } from "redux";
import {appReducer, initialState} from "./reducer";


const appStore = createStore(appReducer, initialState);

export default appStore;
