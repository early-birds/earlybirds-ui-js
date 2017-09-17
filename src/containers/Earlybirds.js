import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Identify from './Identify';
import Reducer from '../reducers';

const Earlybirds = (props) => {

  const store = createStore(Reducer, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <Identify
        trackerKey={props.trackerKey}
        profile={props.profile}>
        {props.children}
      </Identify>
    </Provider>
  )
}

export default Earlybirds;
