import React from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';

import clsx from 'clsx';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { addToShoppingCart } from '../../../redux/userRedux';

import styles from './Card.module.scss';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const Component = ({ className, children, item, addToShoppingCart }) => {
  const { getAccessTokenSilently } = useAuth0();
  const handleAddToCart = async () => {
    try {
      const token = await getAccessTokenSilently();
      addToShoppingCart(token, item._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Paper elevation={10} className={clsx(styles.card)}>
        <div className={clsx(styles.text)}>
          <Typography variant="h5">{item.title}</Typography>
          <Typography>{item.text}</Typography>
          <div className={styles.btns}>
            <Button
              className={styles.btn}
              component={NavLink}
              to={'/items/' + item._id}
              variant="outlined"
              color="primary"
            >
              More info
            </Button>
            <Button
              onClick={handleAddToCart}
              className={styles.btn}
              variant="outlined"
              color="primary"
            >
              Add to cart
            </Button>
          </div>
        </div>
        <img alt={''} src={item.image} />
      </Paper>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  item: PropTypes.object,
  addToShoppingCart: PropTypes.func,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

const mapDispatchToProps = (dispatch) => ({
  addToShoppingCart: (token, _id) => dispatch(addToShoppingCart(token, _id)),
});

const Container = connect(null, mapDispatchToProps)(Component);

export {
  // Component as Card,
  Container as Card,
  Component as CardComponent,
};
