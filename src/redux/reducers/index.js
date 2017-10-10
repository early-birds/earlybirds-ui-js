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
