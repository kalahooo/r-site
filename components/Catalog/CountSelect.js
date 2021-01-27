import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import BottomSheet from "../common/BottomSheet/BottomSheet";
import CountSelectItem from "./CountSelectItem";

const CountSelect = (props) => (
  <BottomSheet onClose={props.onClose}>
    <Header>Выберите количество порций</Header>
    {props.variants.map((variant, index) => (
      <CountSelectItem
        {...variant}
        key={index}
        onClick={() => props.handleSelectCount(variant.count)}
      />
    ))}
    {props.zeroVisible && (
      <ZeroSelectItem onClick={() => props.handleSelectCount(0)}>
        Убрать из корзины
        <ZeroIcon alt="Убрать из корзины" src={require("./Trash.svg")} />
      </ZeroSelectItem>
    )}
  </BottomSheet>
);

const Header = styled.div`
  ${tw`hidden`}
  @media(max-width: 767px) {
    ${tw`block pb-3 px-3 font-bold text-base`}
  }
`;

const ZeroSelectItem = styled.div`
  ${tw`text-brand py-2 px-3 flex items-center justify-center cursor-pointer`}
  &:hover {
    ${tw`bg-gray-200`}
  }
  @media (max-width: 767px) {
    ${tw`py-4`}
  }
`;

const ZeroIcon = styled.img`
  ${tw`ml-2 w-5 h-5`}
`;

export default CountSelect;
