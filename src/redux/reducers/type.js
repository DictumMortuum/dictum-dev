'use strict';

const defaultState = {
  types: [],
  selected: []
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return {
      ...state,
      types: [...new Set([].concat(...action.docs.map(d => d.type)))].sort()
    };
  case 'DOC_INSERT':
    return {
      ...state,
      types: [...new Set([].concat(...state.types, action.doc.type))].sort()
    };
  case 'TYPE_ADD':
    return {
      ...state,
      selected: [...state.selected, action.t]
    };
  case 'TYPE_REMOVE':
    return {
      ...state,
      selected: [...state.selected].filter(d => d !== action.t)
    };
  case 'TYPE_SET':
    return {
      ...state,
      selected: action.types
    };
  default:
    return state;
  }
};
