import rootReducers from "./Reducers/rootReducers";
import {createStore } from "redux";

const store = createStore(rootReducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__());

export type RootState = ReturnType<typeof store.getState>
export default store;
