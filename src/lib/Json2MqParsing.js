import json2mq from 'json2mq'

export const generateSortedMediaQueriesFromList = list => {
  let lastBp = 0
  return list
    .sort((a, b) => a.bp - b.bp)
    .map(x => {
      const mq = json2mq({ minWidth: lastBp, maxWidth: x.bp})
      lastBp = x.bp
      return {
        ...x,
        computed: mq
      }
    })
}

