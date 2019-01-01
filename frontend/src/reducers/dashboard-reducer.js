
const defaultState = {
  dateUnit: 'day',
  totalImpressions: [],
  totalClicks: [],
  totalCostMicros: [],
  totalInstalls: [],
  totalCampaigns: [],
  totalAdvertisers: [],
  top10Installs: [],
  top10Clicks: [],
  top10Impressions: [],
  activityInstalls: [],
  activityClicks: [],
  activityImpressions: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    // get all stats at once to avoid calling server multiple times
    case 'FETCH_STATS': {
      return Object.assign({}, state, action.payload);
    }
    // updating only line chart
    case 'UPDATE_STATS': {
      return Object.assign({}, state, {
        activityImpressions: action.payload.activityImpressions,
        activityInstalls: action.payload.activityInstalls,
        activityClicks: action.payload.activityClicks,
        dateUnit: action.payload.dateUnit,
      });
    }
    default: {
      break;
    }
  }
  return state;
}
