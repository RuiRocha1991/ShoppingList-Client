import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import {ConnectedRouter} from "connected-react-router";
import {Provider} from "react-redux";
import store, { history } from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
