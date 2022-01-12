// Keeping track of setTimeout ensures that if notification is triggered multiple times in a row,
// we cancel the removal of the previous notification and notification for the current action is displayed for the complete expected duration
//  instead of getting cleared earlier than expected (because of an earlier setTimeout call for a previous action).
let previousTimeout = null;

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    if (previousTimeout) {
        console.log(previousTimeout)
        clearTimeout(previousTimeout)
    }

    dispatch({
      type: "SET_NOTIFICATION",
      data: { message },
    });
    previousTimeout = setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
      });
    }, seconds * 1000);
  };
};

const initialState = {
  message: null,
  display: "none",
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      const notification = {
        message: action.data.message,
        display: "",
      };
      return notification;
    case "REMOVE_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
