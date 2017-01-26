'use strict';

import moment from 'moment';

/*
 * Filters and groups a set of pouchdb documents into days, months or years.
 * Granularity allowed values: 'D', 'M', 'YYYY'
 */

// http://stackoverflow.com/questions/32611045/
// creating-an-associative-array-in-javascript-using-map-function

export default (docs, granularity) => {
  let temp = [];

  let filtered = docs.reduce((acc, cur) => {
    let d = moment(cur._id).format(granularity);
    acc[d] = acc[d] || [];
    acc[d].push(cur);
    return acc;
  }, {});

  for (let k in filtered) {
    if (Object.prototype.hasOwnProperty.call(filtered, k)) {
      temp.push({
        id: k,
        docs: filtered[k]
      });
    }
  }

  console.log(granularity, temp);

  return temp;
};
