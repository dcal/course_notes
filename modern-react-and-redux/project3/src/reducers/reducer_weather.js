import {FETCH_WEATHER} from '../actions/index'

export default function (state=[], action) {
  // concat returns a new state
  switch(action.type) {
    case FETCH_WEATHER:
      return state.concat( action.payload.data )
  }
  return state;
}
