import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import fetchData from './store/store';
import Picture from './components/Picture'
import {fetcRandomPics} from "./actions/actions";


const store = createStore(fetchData, applyMiddleware(thunk))
store.dispatch(fetcRandomPics())

function App() {
    return (
      <Provider store={store}>
        <Picture />
      </Provider>
    );
}

export default App