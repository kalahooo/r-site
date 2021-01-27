import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import { ContextCart } from "../../pages/_app";
import Textfield from "../common/Textfield";
import Row from "./Row";
import IconAddress from "./icons_address.svg";
import IconPromocode from "./icons_promocode.svg";
import IconTime from "./icons_time.svg";
import IconWallet from "./icons_wallet.svg";
import IconComment from "./icons_comment.svg";
import AddressGroup from "./AddressGroup";
import DateGroup from "./DateGroup";
import PromoGroup from "./PromoGroup";
import PaymentGroup from "./PaymentGroup";

const prevent = (ev) => ev.preventDefault();

const CartInfo = (props) => {
  const { order } = React.useContext(ContextCart);
  const [active, setActive] = React.useState(null);

  const update = React.useCallback(() => {
    props.onSubmit().then(() => setActive(null));
  });

  React.useEffect(() => {
    if (props.dirty) {
      update();
    }
  }, [props.values?.promo]);

  return (
    <CartInfoWrap autoComplete="off" onSubmit={prevent}>
      <Title>Информация о заказе</Title>
      <Row
        activeIndex={active}
        icon={<IconAddress />}
        index={0}
        onClick={setActive}
        placeholder="Выберите адрес доставки"
        title={order.address?.label}
      >
        <AddressGroup address={order.address} />
      </Row>
      <Hr />
      <Row
        activeIndex={active}
        icon={<IconTime />}
        index={1}
        onClick={setActive}
        placeholder="Выберите время доставки"
        title={order.date?.label}
      >
        <DateGroup date={order.date} day={props.values.day} />
      </Row>
      <Hr />
      <Row
        activeIndex={active}
        icon={<IconWallet />}
        index={3}
        onClick={setActive}
        placeholder="Выберите способ оплаты"
        title={order.payment?.label}
      >
        <PaymentGroup payment={order.payment} />
      </Row>
      <Hr />
      <Row
        activeIndex={active}
        icon={<IconPromocode />}
        index={4}
        onClick={setActive}
        placeholder="Используйте промокод"
        title={order.promo?.label}
      >
        <PromoGroup promo={order.promo} />
      </Row>
      <Hr />
      <Row
        activeIndex={active}
        icon={<IconComment />}
        index={5}
        onClick={setActive}
        placeholder="Комментарий"
        title={order.comment}
      >
        <Textfield autoComplete="comment" name="comment" title="Комментарий" />
      </Row>
    </CartInfoWrap>
  );
};

const CartInfoWrap = styled.form`
  ${tw`relative py-4 px-4`}
`;

const Title = styled.div`
  ${tw`text-xl font-medium mb-4`}
`;

const Hr = styled.hr`
  ${tw`border-0 -mx-4 mt-2 mb-1`}
  height: 5px;
`;

export default CartInfo;
