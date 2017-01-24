'use strict';

import css from '../styles/app';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from '../redux/store';
import MUI from 'material-ui';
import NavBar from './nav-bar';
import React from 'react';
import ShowPeople from './show-people';
import Doc from './doc.js';
import { connect } from 'react-redux';
import { fetchDocs } from '../redux/actions';

const {
  Card,
  Styles
} = MUI;

const { ThemeManager } = Styles;

injectTapEventPlugin();

let App = React.createClass({
  propTypes: {
    children: React.PropTypes.object,
    docs: React.PropTypes.array,
    history: React.PropTypes.object,
    location: React.PropTypes.object
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Styles.LightRawTheme)
    };
  },

  componentDidMount() {
    store.dispatch(fetchDocs());
  },

  render() {
    let { docs, history, location } = this.props;

    console.log(docs);
    return (
      <div>
        <NavBar history={history} pathname={location.pathname} />
        <Card style={css.appCard}>
          <ShowPeople docs={docs} />
          <div>
            {docs.map(doc => {
              return (
                <Doc key={doc._id} doc={doc} />
              );
            })
          }
          </div>
        </Card>
      </div>
    );
  }
});

export default connect(mapStateToProps)(App);

function mapStateToProps(state) {
  return {
    docs: state.docs
  };
}
