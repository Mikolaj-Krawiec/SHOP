import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, fetchUser } from '../../../redux/userRedux';

import styles from './Cart.module.scss';

import { Typography, Paper, Button, Select, MenuItem } from '@material-ui/core';

const Component = ({ className, children, user, fetchUser }) => {
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
  }, []);

  const handleChange = (event) => {

  };

  return (
    <div className={clsx(className, styles.root)}>
      {/* <p>{user && JSON.stringify(user)}</p> */}
      {user.shoppingCart.items &&
        user.shoppingCart.items.map((item) => (
          <Paper key={item._id} elevation={10} className={clsx(styles.card)}>
            <div className={clsx(styles.text)}>
              <Typography variant="h5">{item.item.title}</Typography>
              <Typography>{item.item.text}</Typography>
              <div className={styles.btns}>
                <Select
                  className={styles.selectQuantity}
                  id="quantity"
                  value={item.quantity}
                  onChange={handleChange}
                  label="Quantity"
                >
                  <MenuItem value="" disabled>
                    <em>Quantity</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
                <Button
                  onClick={() => {}}
                  className={styles.btn}
                  variant="outlined"
                  color="primary"
                >
                  Add to cart
                </Button>
              </div>
            </div>
            <img alt={''} src={item.item.image} />
          </Paper>
        ))}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
  fetchUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (token) => dispatch(fetchUser(token)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Cart,
  Container as Cart,
  Component as CartComponent,
};
