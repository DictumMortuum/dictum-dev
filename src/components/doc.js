'use strict';

import React from 'react';
import { Card, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import store from '../redux/store';
import { Doc, Filter } from '../redux/actions';
import ReactMarkdown from 'react-markdown';
import Chip from 'material-ui/Chip';
import { flexParent, docInfoStyle, font } from '../styles';
import { teal500, teal50, grey50 } from 'material-ui/styles/colors';
import Jira from './jira';
import Avatar from 'material-ui/Avatar';
import WorkIcon from 'material-ui/svg-icons/action/work';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ProductIcon from 'material-ui/svg-icons/action/settings';

const HeaderChip = (d, img) => d && (
  <Chip key={d} style={{...docInfoStyle, backgroundColor: grey50}}>
    <Avatar color={grey50} backgroundColor={teal500} size={24} icon={img} />{d}
  </Chip>
);

// const LangChip = d => (<Chip key={d} style={{backgroundColor: teal50}}>{d}</Chip>);

export default React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
    config: React.PropTypes.object
  },

  render() {
    let { config, doc } = this.props;

    return (
      <Card style={{marginBottom: 10}} zDepth={1}>
        <div style={{...flexParent, backgroundColor: teal50}}
          onTouchTap={() => store.dispatch(Doc.edit(doc))}>
          {HeaderChip(new Date(doc.updated || doc._id).toLocaleDateString(config.locale, {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          }), <DateIcon />)}
          {HeaderChip(doc.type, <AssignmentIcon />)}
          {HeaderChip(doc.company, <WorkIcon />)}
          {HeaderChip(doc.product, <ProductIcon />)}
        </div>
        <CardText>
          <ReactMarkdown source={doc.desc || ''} />
        </CardText>
        <CardActions>
          {doc.ticket && <Jira ticket={doc.ticket} />}
          {doc.lang && doc.lang.map(l => (<RaisedButton
            key={l}
            label={l}
            style={font}
            onTouchTap={() => store.dispatch(Filter.toggle(l))}
          />))}
        </CardActions>
      </Card>
    );
  }
});
