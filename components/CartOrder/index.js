import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import groupItems from "../../utils/groupItems";
import { ContextCart } from "../../pages/_app";
import { sendAnalytics } from "../../utils/analytics";
import Item from "./Item";

const CartOrder = ({ isPreset1, isPreset2 }) => {
  const { cart, order, cartDispatch } = React.useContext(ContextCart);
  const freeDelivery = order.total?.free_delivery || 1;
  const total = order.total?.amount || 0;
  const percent = (100 * total) / freeDelivery;

  const uniqItems = groupItems(cart);

  const handleAddItem = React.useCallback((item) => {
    cartDispatch({ type: "add", payload: item });
    sendAnalytics("item-added");
  }, []);

  const handleSetCountItem = React.useCallback((item, count) => {
    cartDispatch({ type: "setcount", payload: { item, count } });
    sendAnalytics("item-added");
  }, []);

  return (
    <CartWrap>
      <Status>
        <Current
          complete={percent >= 100}
          style={{ width: `${percent > 100 ? 100 : percent}%` }}
        />
      </Status>

      <Remain>
        {percent >= 100 ? (
          <>
            <Label>Доставка будет</Label>&nbsp;<FreeValue>бесплатной</FreeValue>
          </>
        ) : (
          <>
            <Label>До бесплатной доставки</Label>{" "}
            <Value>{freeDelivery - total} ₽</Value>
          </>
        )}
      </Remain>

      <Title>Состав заказа</Title>
      {isPreset1 && (
        <Preset>Борщ с говядиной + Бефстроганов с пюре (2 порции)</Preset>
      )}
      {isPreset2 && <Preset>Уха финская + Лазанья (2 порции)</Preset>}
      {!isPreset1 && !isPreset2 && (
        <>
          <div>
            {uniqItems.map((item) => (
              <Item
                {...item}
                count={cart.filter((i) => i === item).length}
                key={item.id}
                onAdd={() => handleAddItem(item)}
                onRemove={() => cartDispatch({ type: "remove", payload: item })}
                onSetCount={(count) => handleSetCountItem(item, count)}
              />
            ))}
          </div>
          {cart.length === 0 && <Empty>Добавьте товары в корзину</Empty>}
        </>
      )}
    </CartWrap>
  );
};

const Preset = styled.div`
  ${tw`font-bold text-xl`}
`;

const CartWrap = styled.div`
  ${tw`py-8 px-4 top-0`}
  @media (max-width: 768px) {
    ${tw`py-4`}
  }
`;

const Title = styled.div`
  ${tw`text-xl font-medium mb-8`}
  @media (max-width: 767px) {
    ${tw`mb-4`}
  }
`;

const Remain = styled.div`
  ${tw`flex mb-8  pb-4 border-0 border-b border-solid border-gray-300 `}
  @media (max-width: 767px) {
    ${tw`mb-6`}
  }
`;

const Label = styled.span`
  ${tw`font-light whitespace-no-wrap`}
`;

const Value = styled.span`
  ${tw`font-medium ml-auto`}
`;

const FreeValue = styled.span`
  ${tw`text-green-500`}
`;

const Status = styled.div`
  ${tw`h-2 bg-gray-300 rounded mb-4`}
`;

const Current = styled.div`
  ${tw`h-full bg-brand rounded`}
  ${(props) => props.complete && tw`bg-green-500`}
  transition: all 0.1s;
`;

const Empty = styled.div`
  ${tw`text-center text-gray-500 py-8`}
`;

export default CartOrder;
