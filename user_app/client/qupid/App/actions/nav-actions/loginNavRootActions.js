// Actions to be dispatched to reducers to signify change of nav state
import {
  AUTH_PUSH_ROUTE,
  AUTH_POP_ROUTE,
  REQUEST_USER_INFO_BY_DEVICE,
  RECEIVE_USER_INFO_BY_DEVICE,
  RECEIVE_AUTH
} from '../../constants/ActionTypes';
import { URL } from '../../constants/NetworkUrls';
import DeviceInfo from 'react-native-device-info';

export function authPush (route) {
  return {
    type: AUTH_PUSH_ROUTE,
    route
  }
};

var entranceAuthPush = function (route) {
  return {
    type: AUTH_PUSH_ROUTE,
    route
  }
};

export function authPop(route) {
  return {
    type: AUTH_POP_ROUTE,
    route
  }
};

function requestUserInfoByDevice() {
  return {
    type: REQUEST_USER_INFO_BY_DEVICE
  }
}

function receiveUserInfoByDevice() {
  return {
    type: RECEIVE_USER_INFO_BY_DEVICE
  }
}

function receiveAuth(json) {
  return {
    type: RECEIVE_AUTH,
    userInfo: json // TODO [{email: }]
  }
}

// Thunk action creator -- allows to pass function as action to further
// customize dispatches, in this case, delay until response is received
// Use like other action creators
// store.dispatch(fetchPosts('reactjs'))
export function fetchUserInfoByDevice(route, callback) {

  // Pass dispatch method as an argument
  // Allowing the thunk to dispatch actions itself

  return dispatch => {

    // First synchronously dispatch updates to signal
    // the start of the API call
    dispatch(requestUserInfoByDevice());
    return fetch(URL + 'user/device_id/' + DeviceInfo.getUniqueID())
      .then(response => response.json())
      .then(json => {

          // Change isFetching to false
          dispatch(receiveUserInfoByDevice());

          // if no error then navigate to home page
          if (json.error) {
            console.log('error found in json from fetchUserInfoByDevice')
            return;
          } else {
            // On success dispatch to set loginView state if automatically signed in
            console.log('inside fetchUserInfoByDevice');
            console.log(json);
            console.log(json[0]);
            dispatch(receiveAuth(json[0]));
            // Navigate automatically to tabsroot
            callback(route);
            return;
          }
        })
      // Catch errors
      .catch((err) => {
        console.error('Error in fetching user info by device in loginNavRootActions.js', err.message);
      })
  }
}
