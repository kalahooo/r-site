import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

const Item = (props) => (
  <ItemWrap>
    <Image style={{ backgroundImage: `url(${props.imageUrl})` }} />
    <Product>{props.title}</Product>
    <Price>
      {props.count} x {props.price} ₽
    </Price>
  </ItemWrap>
);

const itemAnimation = keyframes`
  from {
    opacity: 0;
    left: -10px;
  }
  to {
    opacity: 1;
    left: 0;
  }
`;

const ItemWrap = styled.div`
  ${tw`flex py-2 relative items-center `}
  animation: 0.15s ease-out ${itemAnimation};
  animation-fill-mode: forwards;
`;

const Image = styled.div`
  ${tw`w-24 h-16 mr-4 bg-gray-200 rounded bg-center bg-cover hidden`}
`;

const Product = styled.div`
  ${tw`text-sm font-light mr-auto`}
`;

const Price = styled.div`
  ${tw`ml-4 text-base font-medium whitespace-no-wrap`}
`;

const Control = styled.div`
  ${tw`bg-gray-200 rounded-full flex items-center justify-center ml-4`}
`;

const Button = styled.button`
  ${tw`text-base font-bold text-gray-600 rounded-full border-none mx-1 py-1 px-1 outline-none cursor-pointer bg-transparent`}
`;

const Count = styled.div`
  ${tw`m-auto w-5 text-center`}
`;

export default Item;
