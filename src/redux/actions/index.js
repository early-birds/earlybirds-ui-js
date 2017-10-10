export const identifySuccessAction = () => ({
  type: 'IDENTIFY_SUCCESS'
})

export const getRecommendationsStartAction = () => ({
  type: 'GET_RECOS_START'
})
export const getRecommendationsSuccess = (recommendations) => ({
  type: 'GET_RECOS_SUCCESS',
  payload: recommendations
})
