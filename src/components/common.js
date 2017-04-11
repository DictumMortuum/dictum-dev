'use strict';

export const toArray = value => {
  if (typeof value === 'string') {
    return value;
  } else if (value !== undefined) {
    return value.toString();
  } else {
    return [];
  }
};
