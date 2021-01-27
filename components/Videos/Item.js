import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const Item = ({ children, onClose }) => (
  <ItemWrap>
    <div>
      <Close onClick={onClose}>
        <img src={require("./close.svg")} />
      </Close>
      {children}
    </div>
  </ItemWrap>
);

const ItemWrap = styled.div`
  ${tw`h-full w-full flex items-center justify-center relative`}
  & > * {
    ${tw`relative max-w-full`}
    & > * {
      ${tw`max-w-full`}
    }
  }
`;

const Close = styled.button`
  ${tw`absolute top-0 right-0 p-4 border-0 bg-transparent`}
  z-index: 9999;
`;

export default Item;
