import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import groupItems from "../../utils/groupItems";
import { ContextCart } from "../../pages/_app";
import SidebarBanner from "../SidebarBanner";
import Item from "./Item2";

const DELIVERY_FREE = 990;

const Cart = (props) => {
  const { cart, cartDispatch } = React.useContext(ContextCart);

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const percent = (100 * total) / DELIVERY_FREE;

  const items = groupItems(cart);

  return (
    <CartWrap>
      <Content>
        <Status>
          <Current
            complete={percent >= 100}
            style={{ width: `${percent > 100 ? 100 : percent}%` }}
          />
        </Status>

        <Remain>
          {percent >= 100 ? (
            <>
              <Label>Доставка будет</Label>&nbsp;
              <FreeValue>бесплатной</FreeValue>
            </>
          ) : (
            <>
              <Label>До бесплатной доставки</Label>{" "}
              <Value>{DELIVERY_FREE - total} ₽</Value>
            </>
          )}
        </Remain>

        <Title>Корзина</Title>
        {items.map((item) => (
          <Item
            {...item}
            count={cart.filter((i) => i === item).length}
            key={item.id}
            onAdd={() => cartDispatch({ type: "add", payload: item })}
            onRemove={() => cartDispatch({ type: "remove", payload: item })}
            onRemoveAll={() =>
              cartDispatch({ type: "removeall", payload: item })
            }
          />
        ))}
        {items.length === 0 && <Empty>Добавьте товары в корзину</Empty>}
      </Content>

      <Continue
        disabled={items.length === 0 || props.loading}
        onClick={props.onSubmit}
      >
        В корзину <Price>{total} ₽</Price>
      </Continue>
      <SidebarBanner />
    </CartWrap>
  );
};

const CartWrap = styled.div`
  ${tw`py-8 px-4 top-0 sticky`}
  @media(max-width: 1024px) {
    ${tw`py-4`}
  }
`;

const Content = styled.div`
  @media (max-width: 1024px) {
    ${tw`hidden`}
  }
`;

const Continue = styled.button`
  ${tw`bg-brand rounded border py-4 w-full mt-8 relative border-none text-white text-base text-left px-4 outline-none`}
  &:disabled {
    ${tw`opacity-25 cursor-not-allowed`}
  }
  @media (max-width: 1024px) {
    &:disabled {
      ${tw`opacity-100`}
    }
  }
`;

const Price = styled.span`
  ${tw`py-2 px-2 rounded bg-red-700 absolute right-0 top-0 mt-2 mr-2 text-center`}
  min-width: 60px;
  box-sizing: border-box;
`;

const Title = styled.div`
  ${tw`text-lg mb-2`}
`;

const Remain = styled.div`
  ${tw`flex mb-8  pb-4 border-0 border-b border-solid border-gray-300 `}
`;

const Label = styled.span`
  ${tw`font-light text-sm whitespace-no-wrap`}
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

export default Cart;
