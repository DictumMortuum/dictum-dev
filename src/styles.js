'use strict';

import { grey100 } from 'material-ui/styles/colors';

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

// DOC
export const docInfoStyle = {
  ...font,
  margin: 5
};

// VIEWER
export const viewerStyle = {
  padding: 10,
  marginTop: 64,
  backgroundColor: grey100
};

// EDITOR
export const editorStyle = {
  position: 'fixed',
  paddingRight: 10,
  top: 74,
  left: '50%',
  width: '50%',
  backgroundColor: grey100
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
