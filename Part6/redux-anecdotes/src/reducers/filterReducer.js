const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "INPUT":
      return action.data;
    default:
      return state;
  }
};

export const handleInputChange = (input) => {
  return {
    type: "INPUT",
    data: input,
  };
};

export default filterReducer;
