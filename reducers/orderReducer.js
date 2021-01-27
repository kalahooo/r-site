import { format } from "date-fns";

const orderReducer = (state, action) => {
  switch (action.type) {
    case "set":
      return {
        ...action.payload,
        formValues: toFormValues(action.payload),
        complete: toCompleteValues(action.payload)
      };
    case "resetpromo":
      return { ...state, promo: null };
    case "reset":
      return {};
    default:
      throw new Error();
  }
};

function toFormValues(order) {
  if (Object.keys(order).length === 0) return {};

  const date = new Date(order.date.value);
  const day = format(date, "yyyy-MM-dd");
  const payment = order.payment?.id;
  const comment = order.comment;
  const promo = order.promo?.value;
  const address = {
    id: order.address?.id || undefined,
    ...order.address.details
  };

  const output = {
    day,
    date,
    payment,
    comment,
    promo,
    promotmp: promo,
    address
  };

  return output;
}

function toCompleteValues(data) {
  return data.order;
}

export default orderReducer;
