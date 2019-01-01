import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import advertisersReducer from './advertisers-reducer';
import campaignsReducer from './campaigns-reducer';
import dashboardReducer from './dashboard-reducer';

export default combineReducers({
  routerReducer,
  advertisersReducer,
  campaignsReducer,
  dashboardReducer,
});
