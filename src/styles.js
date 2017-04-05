'use strict';

import { grey500 } from 'material-ui/styles/colors';

export const palette = {
  primary1Color: '#44424C',
  primary2Color: '#44424C',
  primary3Color: '#D7DAD3',
  accent1Color: '#7F7798',
  accent2Color: '#F0F0F0',
  accent3Color: grey500
};

export const flexParent = {
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap'
};

export const flexChild = {
  flex: '1 0 20%'
};

export const font = {
  fontFamily: 'monospace',
  fontSize: 14
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
  backgroundColor: palette.accent2Color,
  overflow: 'hidden',
  whiteSpace: 'nowrap'
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
