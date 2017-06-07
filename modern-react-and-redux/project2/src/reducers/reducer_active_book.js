// State argument is not application state,
// only the state this reducer is responsible for
export default function(state = null, action) {
  // Object from reducer must be 100 percent clean, fresh, new object.
  switch(action.type) {
    case 'BOOK_SELECTED':
      return action.payload;
    default:
      return state;
  }
}
