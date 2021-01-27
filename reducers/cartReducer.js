const cardReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return state.concat(action.payload);
    case "remove":
      const indexToRemove = state.lastIndexOf(action.payload);
      return state.filter((item, index) => index !== indexToRemove);
    case "removeall":
      return state.filter((item) => item != action.payload.item);
    case "setcount":
      if (action.payload.count > 0) {
        const items = [];
        for (let i = 0; i < action.payload.count; i++) {
          items.push(action.payload.item);
        }
        return state
          .filter((item) => item != action.payload.item)
          .concat(items);
      } else {
        return state.filter((item) => item != action.payload.item);
      }
    case "restore":
      return action.payload;
    case "reset":
      return [];
    default:
      throw new Error();
  }
};

export default cardReducer;
