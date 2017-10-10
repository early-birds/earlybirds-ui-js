import { h, Component } from 'preact';
import { Eb } from 'earlybirds-js';
import { identifySuccessAction } from '../../redux/actions';
import { connect } from 'preact-redux';

const IdentifyComponent = props => {
  const {
    profile,
    trackerKey,
    identifyDone,
    identifySuccess } = props;

  console.log('toto', profile);
  const eb =
    new Eb({trackerKey})
    .identify(profile)
    .then((response) => {
      identifyDone();
      return response;
    })

  return (
    <div>
      {identifySuccess && props.children}
    </div>
  )
}

const mapStateToProps = state => ({
  identifySuccess: state.identifySuccess
})

const mapDispatchToProps = dispatch => ({
  identifyDone: () => {
    dispatch(identifySuccessAction());
  }
})

export const Identify = connect(
  mapStateToProps,
  mapDispatchToProps
)(IdentifyComponent)

