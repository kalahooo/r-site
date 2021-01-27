import tw from "tailwind.macro";
import styled from "@emotion/styled";
import Title from "../common/Title";
import HowItWorks from ".";

const HowItWorksSection = () => (
  <HowItWorksWrap id="about">
    <Title>Как мы работаем</Title>
    <HowItWorks />
  </HowItWorksWrap>
);

const HowItWorksWrap = styled.div`
  ${tw`pt-4`}
  @media (max-width: 767px) {
    ${tw`pb-0 mt-8 pr-0`}
  }
`;

export default HowItWorksSection;
