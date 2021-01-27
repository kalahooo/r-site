import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";

const Row = (props) => {
  return (
    <RowWrap onClick={(ev) => ev.stopPropagation()}>
      <Icon>{props.icon}</Icon>
      <Content>{props.children}</Content>
    </RowWrap>
  );
};

const RowWrap = styled.div`
  ${tw`flex items-start`}
`;

const Icon = styled.span`
  ${tw`mt-5 text-brand inline-block`}
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  svg {
    ${tw`fill-current w-full h-full`}
  }
`;

const Content = styled.div`
  ${tw`w-full mt-4 pl-2`}
  box-sizing: border-box;
`;

export default Row;
