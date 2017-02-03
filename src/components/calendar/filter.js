'use strict';

// http://stackoverflow.com/questions/32611045/
// creating-an-associative-array-in-javascript-using-map-function

export default (docs, granularity) => {
  let temp = [];

  let filtered = docs.reduce((acc, cur) => {
    let d = granularity(cur.date);
    acc[d] = acc[d] || [];
    acc[d].push(cur);
    return acc;
  }, {});

  for (let k in filtered) {
    if (Object.prototype.hasOwnProperty.call(filtered, k)) {
      temp.unshift({
        id: k,
        docs: filtered[k]
      });
    }
  }

  // console.log(granularity, temp);

  return temp;
};
