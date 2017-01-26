'use strict';

/*
 * Filters and groups a set of pouchdb documents into days, months or years.
 * Granularity allowed values: 'D', 'M', 'YYYY'
 */

// http://stackoverflow.com/questions/32611045/creating-an-associative-array-in-javascript-using-map-function

export default (docs, granularity) {
  let acc = [];
  let filtered = docs.reduce((acc, cur) => {
    var d = moment(cur._id).format(granularity);
    acc[d] = acc[d] || [];
    acc[d].push(cur);
    return acc;
  }, {});

  for(k in filtered) {
    acc.push({
      id: k,
      docs: filtered[k]
    });
  }

  return acc;
}
