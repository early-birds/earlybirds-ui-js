import React from 'react';
import { connect } from 'react-redux';
import { setRoutes } from '../actions';

const RouterComponent = ({ routes, children, dispatchSetRoutes }) => {
  dispatchSetRoutes(routes);
  return (
    <div>
      {children}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatchSetRoutes: (routes) => {
    dispatch(setRoutes(routes));
  }
})

const Router = connect(
  null,
  mapDispatchToProps
)(RouterComponent)

export default Router;
