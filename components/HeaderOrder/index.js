import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import Link from "next/link";

const HeaderOrder = (props) => {
  return (
    <HeaderOrderWrap>
      <HeaderInner>
        <Link href="/">
          <Logo src={require("./logo.svg")} />
        </Link>

        <Steps>
          <Step active={!props.confirm && !props.complete}>Корзина</Step>
          <Step active={props.confirm}>Оформление</Step>
          <Step active={props.complete}>Заказ в работе</Step>
          <Dots />
        </Steps>
      </HeaderInner>
    </HeaderOrderWrap>
  );
};

const HeaderOrderWrap = styled.header`
  ${tw`px-4 bg-white`}
`;

const HeaderInner = styled.div`
  ${tw`w-full max-w-screen-xl mx-auto flex items-center`}
  max-width: 1024px;
`;

const Logo = styled.img`
  ${tw`py-4`}
`;

const Steps = styled.div`
  ${tw`ml-auto flex relative`}
  @media (max-width: 767px) {
    ${tw`hidden`}
  }
`;

const Step = styled.div`
  ${tw`ml-4 font-light text-sm text-gray-500 text-center bg-white px-4 py-1 z-10 bg-gray-200 rounded-full`}
  ${(props) => props.active && tw`bg-brand text-white `}
  &:first-of-type {
    ${tw`ml-0`}
  }
`;

const Dots = styled.div`
  ${tw`absolute left-0 top-0 w-full border-dashed border-0 border-b border-gray-400 mt-3`}
`;

export default HeaderOrder;
