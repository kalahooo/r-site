import Selectfield from "../common/Selectfield";

const PaymentGroup = (props) => (
  <Selectfield name="payment" parse={Number} title="Способ оплаты">
    {props.payment?.options && makeOptionsForPayment(props.payment.options)}
  </Selectfield>
);

function makeOptionsForPayment(options) {
  return options.map((row) => (
    <option key={row.label} value={row.id}>
      {row.label}
    </option>
  ));
}

export default PaymentGroup;
