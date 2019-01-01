
export default function reducer(state = { advertisers: [] }, action) {
  switch (action.type) {
    // getting advertisers fro server and load it into redux state
    case 'FETCH_ADVERTISERS': {
      return Object.assign({}, state, {
        advertisers: action.payload.advertisers,
        total: action.payload.advertisers_count,
      });
    }
    default: {
      break;
    }
  }
  return state;
}
