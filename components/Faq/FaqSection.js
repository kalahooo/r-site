import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import Title from "../common/Title";
import Faq from ".";

const FaqSection = () => (
  <FaqSectionWrap id="faq">
    <Title>Вопросы и ответы</Title>
    <Faq />
  </FaqSectionWrap>
);

const FaqSectionWrap = styled.div`
  ${tw`pb-8 px-6`}
`;

export default FaqSection;
