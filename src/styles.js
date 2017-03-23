'use strict';

import { teal500, teal800, pinkA200, grey100, grey500, grey50 } from 'material-ui/styles/colors';
let background = grey50;

export const palette = {
  primary1Color: teal500,
  primary2Color: teal800,
  primary3Color: pinkA200,
  accent1Color: pinkA200,
  accent2Color: grey100,
  accent3Color: grey500
};

export const flexParent = {
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap'
};

export const flexChild = {
  flex: '1 0 50%'
};

export const font = {
  fontFamily: 'monospace',
  fontSize: 14
};

// APP
export const appStyle = {
  backgroundColor: background
};

// DOC
export const docInfoStyle = {
  ...font,
  margin: 5
};

// VIEWER
export const viewerStyle = {
  padding: 10,
  marginTop: 64,
  backgroundColor: background
};

// EDITOR
export const editorStyle = {
  position: 'fixed',
  paddingRight: 10,
  top: 74,
  left: '50%',
  width: '50%',
  backgroundColor: background
};

export const inputStyle = {
  ...flexParent,
  padding: '0 10px 0 10px',
  marginBottom: 10
};

export const textStyle= {
  ...flexChild,
  ...font
};
