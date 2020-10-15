import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';

// import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

// import styles from './Swiper.module.scss';

const Component = ({
  children,
  activePage,
  rightAction,
  leftAction,
  slideAction = () => {},
  spaceBetween,
  slidesPerView,
  loop,
}) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(activePage);
    }
  });

  const params = {
    spaceBetween: spaceBetween || 0,
    on: {
      slideChangeTransitionStart: () => slideAction(swiperRef.current.swiper.activeIndex),
      slidePrevTransitionStart: rightAction,
      slideNextTransitionStart: leftAction,
    },
    // pagination: {
    //   el: '.swiper-pagination',
    //   type: 'bullets',
    //   clickable: true,
    // },
    slidesPerView: slidesPerView || 1,
    loop: loop || false,
  };

  return (
    <Swiper ref={swiperRef} {...params}>
      {children}
    </Swiper>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  rightAction: PropTypes.func,
  leftAction: PropTypes.func,
  activePage: PropTypes.number,
  noSwiping: PropTypes.bool,
  grabCursor: PropTypes.bool,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Swiper,
  // Container as Swiper,
  Component as SwiperComponent,
};
