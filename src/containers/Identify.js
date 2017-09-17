import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Eb, Utils } from 'earlybirds-js';
import React, { Component } from 'react';
import { mountFromLocation } from '../lib/util';
import { setProfile, identifyStart, identifySuccess, identifyError } from '../actions';

class Identify extends Component {

  componentWillMount() {
    const { identify, trackerKey, profile } = this.props;
    identify(trackerKey, profile);
  }

  render() {
    const shouldRender =
      this.props.identifyState === 'success' ?
      this.props.children : null;

    return (
      <div>
        {shouldRender}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  identifyState: state.identifyState
})

const mapDispatchToProps = dispatch => ({
  identify: (trackerKey, profile) => {
    dispatch(identifyStart())
    const eb = new Eb({trackerKey})
      eb.identify(profile)
      .then(x => x.data.profile)
      .then(profile => {
        dispatch(identifySuccess(profile))
        return profile; 
      })
      .catch((err) => {
        console.log('error occured');
        console.log(err);
        dispatch(identifyError(err))
        return err;
      })
  }
})

const IdentifyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Identify);

export default IdentifyContainer;
