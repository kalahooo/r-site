const errorReducer = (state, action) => {
  switch (action.type) {
    case "show":
      return action.payload;
    case "hide":
      return null;
    default:
      throw new Error();
  }
};

export default errorReducer;
