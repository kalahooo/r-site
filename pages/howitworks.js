import React from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import HowItWorks from "../components/HowItWorks";

const PageHowItWorks = () => {
  return (
    <HowItWorksWrap>
      <HowItWorks />
    </HowItWorksWrap>
  );
};

const HowItWorksWrap = styled.div`
  ${tw`p-6`}
`;

export default PageHowItWorks;
