import loadable from "@loadable/component";
import React from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import Header from "../components/Header";
import HowItWorksSection from "../components/HowItWorks/HowItWorksSection";
import { Slider2 } from "../components/Slider";
import PopupMarkets from "../components/PopupMarkets/PopupMarkets";
import Package2in1 from "../components/Package2in1/Package2in1";

const DeliveryMap = loadable(() => import("../components/DeliveryMap"));
const Footer = loadable(() => import("../components/Footer"));
const Technics = loadable(() => import("../components/Technics"));

const Page2in1 = () => {
  return (
    <>
      <PopupMarkets />
      <Header />
      <Slider2 />
      <MainWrap>
        <ContentColumn>
          <Package2in1 />
          <HowItWorksSection />
          <Technics />
          <Footer />
        </ContentColumn>
      </MainWrap>
      <DeliveryMap />
    </>
  );
};

const MainWrap = styled.main`
  ${tw`flex w-full mx-auto`}
  max-width: 1400px;
  box-sizing: border-box;
  @media (max-width: 1280px) {
    ${tw`px-0`}
  }
`;

const ContentColumn = styled.div`
  ${tw`flex-1 border-0 border-r border-gray-200 border-solid`}
  @media (min-width: 1023px) {
    width: calc(100% - 300px);
  }
  @media (max-width: 1024px) {
    ${tw`border-0 max-w-full`}
  }
`;

export default Page2in1;
