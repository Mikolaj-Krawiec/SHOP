import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useAuth0 } from '@auth0/auth0-react';

// import clsx from 'clsx';

import { connect } from 'react-redux';
import { fetchUser } from '../../../redux/userRedux';

// import styles from './Auth.module.scss';

const Component = ({ className, children, fetchUser }) => {
  const { getAccessTokenSilently } = useAuth0();

  const authUser = async () => {
    try {
      const token = await getAccessTokenSilently();
      fetchUser(token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    authUser();
  });

  return (
    <div>Auth</div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fetchUser: PropTypes.func,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (token) => dispatch(fetchUser(token)),
});

const Container = connect(null, mapDispatchToProps)(Component);

export {
  // Component as Auth,
  Container as Auth,
  Component as AuthComponent,
};
