import { Eb } from 'earlybirds-js'

export const identifySuccessAction = () => ({
  type: 'IDENTIFY_SUCCESS'
})

export const getRecommendationsStartAction = namespace => ({
  type: `${namespace}/GET_RECOS_START`
})
export const getRecommendationsSuccess = (namespace, payload) => ({
  type: `${namespace}/GET_RECOS_SUCCESS`,
  payload: payload
})
export const getRecommendationsError = (namespace, err) => ({
  type: `${namespace}/GET_RECOS_ERROR`,
  err: err
})
export const getRecommendations = (namespace, widgetId) =>
  dispatch => {
    console.log('dispatch ' + namespace + ' /'  + widgetId);
    dispatch(getRecommendationsStartAction(namespace))
    const eb =
      new Eb()
      .getRecommendations(widgetId)
      .then(x => x.json())
      .then((response) => {
        console.log('dispatch response ' + namespace + ' /'  + widgetId);
        dispatch(getRecommendationsSuccess(namespace, response))
      })
      .catch((err) => {
        dispatch(getRecommendationsError(namespace, err))
        return err;
      })
  }
