'use strict';

import React from 'react';

export default React.createClass({

  propTypes: {
    date: React.PropTypes.string,
    ticket: React.PropTypes.string,
    company: React.PropTypes.string,
    product: React.PropTypes.string,
    type: React.PropTypes.string,
    lang: React.PropTypes.array,
    desc: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      ticket: null,
      company: null,
      product: null,
      type: null,
      lang: [],
      desc: ''
    };
  },

  render() {
    // let { ticket, company, product, type, lang, desc, date } = this.props;
    let { type, lang, desc, date } = this.props;

    return (
      <div>
        <div>
          {new Date(date).toLocaleTimeString('el-GR', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
          {type}
        </div>
        <div>{desc}</div>
        <div>{lang.map(l => {
          return (
            <div key={l} label={l} />
          );
        })}</div>
      </div>
    );
  }
});
