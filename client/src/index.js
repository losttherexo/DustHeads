import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { legacy_createStore as createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';

const theStore = createStore(rootReducer, applyMiddleware(thunkMiddleware))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <Provider store={theStore}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
     </Provider>
);


