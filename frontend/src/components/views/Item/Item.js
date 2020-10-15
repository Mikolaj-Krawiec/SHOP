import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getItemById } from '../../../redux/itemsRedux';

import styles from './Item.module.scss';

import { Swiper } from '../../features/Swiper/Swiper';

import { Typography, Paper, Button, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const Component = ({ className, children, item }) => {
  const [state, setState] = useState({
    quantity: 1,
    imageInFocus: '',
    images: '',
  });
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    setState((state) => ({
      ...state,
      imageInFocus: item && item.image,
      images: item && item.images,
    }));
  }, [item]);

  const handleSlideChange = (index) => {
    setActivePage(index);
  };

  const handleChange = (event) => {
    setState({ ...state, quantity: event.target.value });
  };

  const handleChangeFocus = (event) => {
    setState({ ...state, imageInFocus: event.target.src });
  };

  return (
    <div className={clsx(className, styles.root)}>
      {item && (
        <Paper elevation={10} className={styles.card}>
          <div className={styles.text}>
            <Typography variant="h4">{item.title}</Typography>
            <Typography>{item.text}</Typography>
            <Typography>
              {item.price.value} {item.price.currency}
            </Typography>

            <FormControl variant="outlined" color="primary">
              <Select
                className={styles.selectQuantity}
                id="quantity"
                value={state.quantity}
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
            </FormControl>
            <Button
              className={styles.addToCartBtn}
              variant="outlined"
              color="secondary"
            >
              Add to Cart
            </Button>
          </div>
          <div className={styles.images}>
            <img alt={''} className={styles.inFocus} src={state.imageInFocus} />
            <Swiper
              slidesPerView={3}
              activePage={activePage}
              slideAction={handleSlideChange}
            >
              {item &&
                item.images.map((image) => (
                  <img alt={''} key={image} src={image} onClick={handleChangeFocus} />
                ))}
            </Swiper>
          </div>
        </Paper>
      )}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  item: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  item: getItemById(state, props.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Item,
  Container as Item,
  Component as ItemComponent,
};
