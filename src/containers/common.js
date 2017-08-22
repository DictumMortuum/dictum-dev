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

export const propertyStatus = (props, name) =>
  props.filter(p => p.name === name).map(p => p.status)[0];
