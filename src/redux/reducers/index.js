import { combineReducers } from 'redux';

export const reducerIdentify = (state={
  identifySuccess: false,
}, action) => {
  switch(action.type) {
    case 'IDENTIFY_SUCCESS':
      console.log('identify success');
      return {
        ...state,
        identifySuccess: true
      };
    default:
      return state;
  }
}
/*
const reducer_identify = namespace => (state={
  identifySuccess: false,
}, action) => {
  switch(action.type) {
    case `${namespace}/IDENTIFY_SUCCESS`:
      return {
        ...state,
        identifySuccess: true
      };
    default:
      return state;
  }
}
*/

export const reducerGetRecos = namespace => (state={
  getRecosStart: false,
  getRecosSuccess: false,
  getRecosPayload: null,
}, action) => {
  switch(action.type) {
    case `${namespace}/GET_RECOS_START`:
      console.log('reduce: ' + namespace + '/GET_RECOS_START');
      return {
        ...state,
        getRecosSuccess: false,
        getRecosStart: true,
        getRecosPayload: null
      };
    case `${namespace}/GET_RECOS_SUCCESS`:
      console.log('reduce: ' + namespace + '/GET_RECOS_SUCCESS');
      return {
        ...state,
        getRecosSuccess: true,
        getRecosStart: false,
        getRecosPayload: action.payload
      };
    default:
      return state;
  }
}

/*
export const reducers = combineReducers({
  reducer_identify,
  reco_instance_1: reducerIdentify('reco_instance_1'),
  reco_instance_2: reducerGetRecos('reco_instance_2')
})
*/
/*
export const reducers = (state={
  identifySuccess: false,
  getRecosStart: false,
  getRecosSuccess: false,
  getRecosPayload: null,
}, action) => {
  switch(action.type) {
    case 'IDENTIFY_SUCCESS':
      return {
        ...state,
        identifySuccess: true
      };
    case 'GET_RECOS_START':
      return {
        ...state,
        getRecosSuccess: false,
        getRecosStart: true,
      };
    case 'GET_RECOS_SUCCESS':
      return {
        ...state,
        getRecosSuccess: true,
        getRecosStart: false,
        getRecosPayload: action.payload
      };
    default:
      return state;
  }
}
*/
