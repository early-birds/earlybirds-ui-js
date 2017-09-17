const Reducer = (state={
  profile: {},
  routes: {},
  identifyState: null,
  identifyPayload: {},
  getRecosState: null,
  getRecosPayload: {},
}, action) => {
  switch(action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload 
      }
    case 'SET_ROUTE':
      return {
        ...state,
        routes: action.payload 
      }
    case 'IDENTIFY_START':
      return {
        ...state,
       identifyState: 'start',
      }
    case 'IDENTIFY_SUCCESS':
      console.log('success');
      return {
        ...state,
       identifyState: 'success',
       identifyPayload: action.payload
      }
    case 'IDENTIFY_ERROR':
      return {
        ...state,
       identifyState: 'error',
       identifyPayload: action.payload
      }
    case 'GET_RECOS_START':
      return {
        ...state,
        getRecosState: 'start',
      }
    case 'GET_RECOS_SUCCESS':
      return {
        ...state,
        getRecosState: 'success',
        getRecosPayload: action.payload
      }
    case 'GET_RECOS_ERROR':
      return {
        ...state,
        getRecosState: '1',
        getRecosPayload: action.payload
      }
    default:
      return state;
  }
}

export default Reducer;
