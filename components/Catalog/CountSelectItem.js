import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import declOfNum from "../../utils/declOfNum";

const portions_str = ["порция", "порции", "порций"];
const pieces_str = ["штука", "штуки", "штук"];

const CountSelectItem = (props) => (
  <CountSelectItemWrap onClick={props.onClick}>
    <Count>
      {props.count}{" "}
      {props.unit === "PORTION"
        ? declOfNum(props.count, portions_str)
        : declOfNum(props.count, pieces_str)}
    </Count>{" "}
    <Weight>/ {props.weight} г.</Weight>
    <PriceWrap>
      <Price>{props.price}</Price> ₽
    </PriceWrap>
  </CountSelectItemWrap>
);

const CountSelectItemWrap = styled.div`
  ${tw`py-2 px-4 flex items-baseline cursor-pointer relative`}
  z-index: 1;
  &:hover {
    ${tw`bg-gray-200`}
  }
  @media (max-width: 767px) {
    ${tw`py-4`}
  }
`;

const Count = styled.span`
  ${tw`text-base`}
`;

const Weight = styled.span`
  ${tw`text-gray-600 text-sm ml-1`}
`;

const PriceWrap = styled.span`
  ${tw`ml-auto`}
`;

const Price = styled.span`
  ${tw`text-xl font-bold`}
`;

export default CountSelectItem;
