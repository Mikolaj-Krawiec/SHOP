import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// import { Swiper } from '../../features/Swiper/Swiper';
import { Splash } from '../../features/Splash/Splash';
import { Card } from '../../features/Card/Card';

import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getItems } from '../../../redux/itemsRedux';

import styles from './Homepage.module.scss';

import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const Component = ({ className, children, items }) => {

  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current.swiper.slideNext();
  }, []);

  const handleBackAction = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleForwardAction = () => {
    swiperRef.current.swiper.slideNext();
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Splash />
      <div className={clsx(styles.swiper)}>
        <Fab
          className={styles.sliderBtnBack}
          color="secondary"
          aria-label="back"
          onClick={handleBackAction}
        >
          <ArrowBackIosIcon />
        </Fab>
        <Fab
          className={styles.sliderBtnForward}
          color="secondary"
          aria-label="forward"
          onClick={handleForwardAction}
        >
          <ArrowForwardIosIcon />
        </Fab>
        {items && (
          <Swiper ref={swiperRef} loop={true}>
            {items.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  items: PropTypes.array,
};

const mapStateToProps = (state) => ({
  items: getItems(state),
});

// const mapDispatchToProps = (dispatch) => ({
//   fetchItems: () => dispatch(fetchItems()),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
