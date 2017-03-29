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
      types: [...new Set(action.docs.map(d => d.type))]
    };
  case 'DOC_INSERT':
    return {
      ...state,
      types: [...new Set([...state.types, action.doc.type])]
    };
  case 'TYPE_ADD':
    return {
      ...state,
      selected: [...state.selected, action.type]
    };
  case 'TYPE_REMOVE':
    return {
      ...state,
      selected: [...state.selected].filter(d => d !== action.type)
    };
  default:
    return state;
  }
};
