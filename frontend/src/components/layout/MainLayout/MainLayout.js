import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchItems } from '../../../redux/itemsRedux';

import styles from './MainLayout.module.scss';

import { AppBar, Container, Toolbar } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { Header } from '../Header/Header';

const Component = ({ className, children, fetchItems }) => {
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const location = useLocation().pathname;

  return (
    <div className={clsx(className, styles.root)}>
      <AppBar className={clsx(trigger ? styles.toolbarSolid : styles.toolbar)}>
        <Container maxWidth="lg">
          <Toolbar disableGutters variant="dense">
            <Header />
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg">
        {location !== '/' && <Toolbar variant="dense"></Toolbar>}
        {children}
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fetchItems: PropTypes.func,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

const mapDispatchToProps = (dispatch) => ({
  fetchItems: () => dispatch(fetchItems()),
});

const ContainerRedux = connect(null, mapDispatchToProps)(Component);

export {
  // Component as MainLayout,
  ContainerRedux as MainLayout,
  Component as MainLayoutComponent,
};
