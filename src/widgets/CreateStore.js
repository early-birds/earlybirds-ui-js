import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const CreateStore = reducers =>
  createStore(combineReducers(reducers), applyMiddleware(thunk))
