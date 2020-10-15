const Axios = require('axios');

/* selectors */
export const getUser = ({ user }) => user;
export const getShoppingCart = ({ user }) => user.shoppingCart;

/* action name creator */
const reducerName = 'user';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

/* thunk creators */

export const fetchUser = (token) => {
  return async (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios.get('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(fetchSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addToShoppingCart = (token, _id, quantity = 1) => {
  return async (dispatch, getState) => {
    Axios.put(
      'http://localhost:8000/api/user/cart',
      {
        _id: _id,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
        // dispatch(fetchSuccess(res.data));
      })
      .catch((err) => {
        // dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        ...action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
