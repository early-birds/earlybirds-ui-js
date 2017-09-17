import { Eb } from 'earlybirds-js';

export const setProfile = (data) => ({
  type: 'SET_PROFILE',
  payload: data 
})

export const setRoutes = (data) => ({
  type: 'SET_ROUTE',
  payload: data
})

export const identifyStart = () => ({
  type: 'IDENTIFY_START',
  payload: null
})

export const identifySuccess = (data) => ({
  type: 'IDENTIFY_SUCCESS',
  payload: data
})

export const identifyError = (data) => ({
  type: 'IDENTIFY_ERROR',
  payload: data
})

export const getRecosStart = () => ({
  type: 'GET_RECOS_START',
  payload: null
})

export const getRecosSuccess = (data) => ({
  type: 'GET_RECOS_SUCCESS',
  payload: data
})

export const getRecosError = (data) => ({
  type: 'GET_RECOS_ERROR',
  payload: data
})

export const getRecommendations = widgetId => dispatch => {
  const eb = new Eb();
  dispatch(getRecosStart());
  eb.getRecommendations(widgetId)
  .then(response => {
    dispatch(getRecosSuccess(response.data));
    return response;
  })
  .catch(err => {
    dispatch(getRecosError(err));
  })
}
