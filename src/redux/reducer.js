'use strict';

export default (state={docs: []}, action) => {
  switch (action.type) {
  case 'FETCH':
    return {
      ...state,
      docs: action.docs
    };
  case 'TOGGLE_PEOPLE_MODAL':
    return {
      ...state,
      peopleModalOpen: !state.peopleModalOpen
    };
  case 'DELETE':
    return state;
  case 'INSERT':
    return state;
  case 'UPDATE':
    return state;
  default:
    return state;
  }
};
