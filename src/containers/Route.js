import React from 'react';
import { connect } from 'react-redux';

const RouteComponent = (props) => {
  const { path, children, routes } = props;

  if (routes[path]) {
    return children ? (
      <div>
        {props.children}
      </div> 
    ) : null
  }
  return null;
}

const mapStateToProps = state => ({
  routes: state.routes
})

const Route = connect(
  mapStateToProps,
  null
)(RouteComponent);

export default Route;
