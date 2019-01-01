import axios from 'axios';
import { API_URL } from '../config/constants';
/*
  action fuction to get campaigns list from server and dispatch it to redux
  reducer
*/
export function getCampaignsList(page, cb) {
  return dispatch => {
    let url = `${API_URL}campaigns.json`;
    // check if page passed to action, if yes update request url
    if (page) {
      url = `${API_URL}campaigns.json?page=${page}`;
    }
    axios.get(url)
      .then((response) => {
        // dispatch data to reducer
        dispatch({ type: 'FETCH_CAMPAIGNS', payload: response.data });
        // if callback function exists then pass the response to it and call it.
        cb && cb(response);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // if callback function exists then pass the error to it and call it.
          cb && cb(error);
        }
      });
  };
}
