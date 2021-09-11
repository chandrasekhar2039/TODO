import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./Redux/store"
import App from './App';
import * as ServiceWorkerRegistration from "./swRegistration"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

ServiceWorkerRegistration.register();
