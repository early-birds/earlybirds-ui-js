import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const CreateStore = reducers => {
  return createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
  )
}
export default CreateStore;
