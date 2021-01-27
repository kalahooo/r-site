import React from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import Faq from "../components/Faq";

const FaqPage = () => {
  return (
    <FaqWrap>
      <Faq />
    </FaqWrap>
  );
};

const FaqWrap = styled.div`
  ${tw`p-4`}
`;
export default FaqPage;
