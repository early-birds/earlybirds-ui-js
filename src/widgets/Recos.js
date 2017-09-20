import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Eb, Utils } from 'earlybirds-js';
import RecosWidget from '../components/RecosWidget';
import RecosItem from '../components/RecosItem';
import { mountFromLocation } from '../lib/util';
import { connect } from 'react-redux';
import { getRecommendations } from '../actions';

class RecosContainer extends Component {
  constructor(props) {
    super(props)
    const {
      getRecommendations,
      widgetId,
      getRecosState,
      recommendations,
      widget,
      children = <RecosItem />
    } = this.props;
    getRecommendations(widgetId);
  }
  componentDidUpdate() {
    const {
      getRecosState,
      recommendations,
      widget,
      children = <RecosItem />
    } = this.props;
    if (getRecosState === 'success') {
      mountFromLocation(
        <RecosWidget recommendations={recommendations}>
          {children}
        </RecosWidget>,
        widget.location
      )
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    recommendations: state.getRecosPayload.recommendations,
    widget: state.getRecosPayload && state.getRecosPayload.widget,
    getRecosState: state.getRecosState,
  }
}

const mapDispatchToProps = dispatch => ({
  getRecommendations: (widgetId) => {
    dispatch(getRecommendations(widgetId));
  }
})

const Recos = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecosContainer)

export default Recos;



