'use strict';

export function toViewer(docs) {
  return {
    type: 'TO_VIEWER',
    docs: docs
  };
}

export function toEditor(doc) {
  return {
    type: 'TO_EDITOR',
    doc: doc
  };
}
