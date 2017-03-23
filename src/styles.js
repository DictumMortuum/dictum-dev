'use strict';

import { teal50, teal500, teal800, pinkA200, grey500, grey50 } from 'material-ui/styles/colors';

export const palette = {
  primary1Color: teal500,
  primary2Color: teal800,
  primary3Color: teal50,
  accent1Color: pinkA200,
  accent2Color: grey50,
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
  backgroundColor: palette.accent2Color
};

// DOC
export const docInfoStyle = {
  ...font,
  margin: 8,
  backgroundColor: palette.accent2Color
};

// VIEWER
export const viewerStyle = {
  padding: 10,
  marginTop: 64,
  backgroundColor: palette.accent2Color
};

export const chipStyle = {
  ...flexParent,
  backgroundColor: palette.primary3Color
};

// EDITOR
export const editorStyle = {
  position: 'fixed',
  paddingRight: 10,
  top: 74,
  left: '50%',
  width: '50%',
  backgroundColor: palette.accent2Color
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
