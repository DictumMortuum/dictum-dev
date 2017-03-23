'use strict';

import { blueGrey50, blueGrey300, blueGrey500, blue300, grey500,
  grey50 } from 'material-ui/styles/colors';

export const palette = {
  primary1Color: blueGrey300,
  primary2Color: blueGrey500,
  primary3Color: blueGrey50,
  accent1Color: blue300,
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

export const chipStyle = {
  ...flexParent,
  backgroundColor: palette.primary3Color
};

export const avatarStyle = {
  color: palette.accent2Color,
  backgroundColor: palette.primary2Color
};

// VIEWER
export const viewerStyle = {
  padding: 10,
  marginTop: 64,
  backgroundColor: palette.accent2Color
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
