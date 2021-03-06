'use strict';

const defaultState = {
  drawer: false,
  editor: true,
  properties: true,
  temp: ''
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'TOGGLE_DRAWER':
    return {...state, drawer: !state.drawer };
  case 'TOGGLE_EDITOR':
    return {...state, editor: !state.editor };
  case 'TOGGLE_PROPERTIES':
    return {...state, properties: !state.properties };
  case 'CONFIG_TEMP':
    return {...state, temp: action.temp};
  default:
    return state;
  }
};
