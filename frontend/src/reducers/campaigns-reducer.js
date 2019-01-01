
export default function reducer(state = { campaigns: [] }, action) {
  switch (action.type) {
    // getting campaigns from server and load it into redux state
    case 'FETCH_CAMPAIGNS': {
      return Object.assign({}, state, {
        campaigns: action.payload.campaigns,
        total: action.payload.campaigns_count,
      });
    }
    default: {
      break;
    }
  }
  return state;
}
