import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import { ContextCart } from "../../pages/_app";

const Summary = ({ onSubmit }) => {
  const { order } = React.useContext(ContextCart);

  const handleClickBack = React.useCallback(() => {
    window.history.back();
  });

  return (
    <SummaryWrap>
      {order.summary && (
        <Info>
          {order.summary.map((row) => (
            <Row key={row.label}>
              {row.label}
              <Value type={row.style}>{row.value} ₽</Value>
            </Row>
          ))}
        </Info>
      )}
      <Buttons>
        <Back onClick={handleClickBack}>Вернуться в каталог</Back>
        <Continue onClick={onSubmit}>
          Оформить заказ <Price>{order.total?.amount} ₽</Price>
        </Continue>
      </Buttons>
    </SummaryWrap>
  );
};

const SummaryWrap = styled.div`
  ${tw`mx-4`}
`;

const Info = styled.div`
  ${tw`my-4 bg-gray-200`}
`;

const Row = styled.div`
  ${tw`p-4 flex justify-between font-light`}
`;

const Value = styled.span`
  ${tw`font-normal`}
  ${(props) => props.type === "danger" && tw`text-brand`}
`;

const Buttons = styled.div`
  ${tw`flex py-10 justify-between`}
  @media(max-width: 767px) {
    ${tw`py-4 flex-col-reverse`}
  }
`;

const Back = styled.button`
  ${tw`bg-white text-gray-700 rounded py-4 border-0 text-base font-light pr-4 outline-none`}
`;

const Continue = styled.button`
  ${tw`bg-brand rounded py-4 pl-4 pr-24 relative border-none text-white text-base text-left outline-none`}
  &:disabled {
    ${tw`opacity-25 cursor-not-allowed`}
  }
`;

const Price = styled.span`
  ${tw`py-2 px-2 rounded bg-red-700 absolute right-0 top-0 mr-2`}
  top: 50%;
  transform: translateY(-50%);
`;

export default Summary;
