import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import studentReducer from "./reducers/studentReducer";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

if (localStorage.getItem('students') == null)
    localStorage.setItem('students', JSON.stringify([]))
let initialState = {
    currentIndex: -1,
    list: JSON.parse(localStorage.getItem('students'))
}
const store = createStore(studentReducer, initialState)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.unregister();
