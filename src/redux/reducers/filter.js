'use strict';

const defaultState = [];

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'FILTER_ADD':
    return [...state, action.filter];
  case 'FILTER_REMOVE':
    return state.filter(d => d !== action.filter);
  default:
    return state;
  }
};
