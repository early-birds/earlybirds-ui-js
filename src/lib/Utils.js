// Transform an array of element
// into an array of array of x element
// ex: [1, 2, 3, 4, 5, 6]
// with x = 2
// [ [1, 2, 3], [4, 5, 6] ]
export const toArrayOfXElement = (datas, x)  =>
  datas.map(
    (item, index) => index % x === 0 ?
    datas.slice(index, index + x) : null
  ).filter(x => x)


