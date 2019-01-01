import axios from 'axios';
import { API_URL } from '../config/constants';
/*
  action fuction to get all stats at once from server and dispatch it to redux
  reducer
*/
export function getStats(params, cb) {
  return dispatch => {
    let url = `${API_URL}reports.json`;
    // check if date params passed, if yes update request url
    if (params) {
      url = `${url}?${params}`;
    }
    axios.get(url)
      .then((response) => {
        if (params) {
          /*
            if date params exists then it mean that we only need to update
            line chart
          */
          dispatch({ type: 'UPDATE_STATS', payload: response.data });
        } else {
          // else just fetch default stats from the server
          dispatch({ type: 'FETCH_STATS', payload: response.data });
        }
        // if callback function exists then pass the response to it and call it.
        cb && cb(response);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // if callback function exists then pass the error to it and call it.
          cb && cb([]);
        }
      });
  };
}
