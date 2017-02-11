import {
  REQUEST_COUPONS,
  RECEIVE_COUPONS,
  SORT_BY_DATE,
  SORT_BY_TIME_LEFT,
  SORT_BY_SAVINGS
} from '../constants/ActionTypes';
import { URL } from '../constants/NetworkUrls';

// Will change isFetching state of list to true
function requestCoupons() {
  return {
    type: REQUEST_COUPONS,
  }
}

function receiveCoupons(json) {
  return {
    type: RECEIVE_COUPONS,
    coupons: json,
    receivedAt: Date.now()
  }
}

// Used by FilterView
export function sortCouponsByDate() {
  return {
    type: SORT_BY_DATE
  }
}

export function sortCouponsByTimeLeft() {
  return {
    type: SORT_BY_TIME_LEFT
  }
}

export function sortCouponsBySavings() {
  return {
    type: SORT_BY_SAVINGS
  }
}

// Thunk action creator -- allows to pass function as action to further
// customize dispatches, in this case, delay until response is received
// Use like other action creators
// store.dispatch(fetchPosts('reactjs'))
export function fetchPosts(user_id) {
  // Pass dispatch method as an argument
  // Allowing the thunk to dispatch actions itself

  return dispatch => {

    // First synchronously dispatch updates to signal
    // the start of the API call
    dispatch(requestCoupons());

    return fetch(URL + `user/${ user_id }/coupon`)
      .then(response => response.json())
      .then(json => {

          // Update app state with results of API call
          return dispatch(receiveCoupons(json))
        })

      // Catch errors
      .catch((err) => {
        console.error('Error in fetching coupons in listViewActions.js', err.message);
      })
  }
}
