'use strict';

import React from 'react';
import { Card, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import store from '../redux/store';
import { Doc } from '../redux/actions';
import ReactMarkdown from 'react-markdown';
import Chip from 'material-ui/Chip';
import { flexParent, docStyle, docInfoStyle, font } from '../styles';
import Jira from './jira';
import Avatar from 'material-ui/Avatar';
import WorkIcon from 'material-ui/svg-icons/action/work';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ProductIcon from 'material-ui/svg-icons/action/settings';

const Header = (d, img) => d && (
  <Chip key={d} style={docInfoStyle}><Avatar color="#fff" size={24} icon={img} />{d}</Chip>
);

export default React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
    config: React.PropTypes.object
  },

  render() {
    let { config, doc } = this.props;

    return (
      <Card style={{marginBottom: 10}} zDepth={1}>
        <div
          children={<div style={flexParent}>
            {Header(new Date(doc.updated || doc._id).toLocaleDateString(config.locale, {
              year: 'numeric', month: 'numeric', day: 'numeric',
              hour: '2-digit', minute: '2-digit', second: '2-digit'
            }), <DateIcon />)}
            {Header(doc.type, <AssignmentIcon />)}
            {Header(doc.company, <WorkIcon />)}
            {Header(doc.product, <ProductIcon />)}
          </div>}
          style={docStyle}
          onTouchTap={() => store.dispatch(Doc.edit(doc))}
        />
        <CardText>
          <ReactMarkdown source={doc.desc || ''} />
        </CardText>
        <CardActions>
          {doc.ticket && <Jira ticket={doc.ticket} />}
          {doc.lang && doc.lang.map(l => (<FlatButton key={l} label={l} style={font} />))}
        </CardActions>
      </Card>
    );
  }
});
