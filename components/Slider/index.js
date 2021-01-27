import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import Item from "./Item";
import Item2 from "./Item2";

const Slider = () => (
  <BannerWrap>
    <Item />
  </BannerWrap>
);

export const Slider2 = () => (
  <BannerWrap>
    <Item2 />
  </BannerWrap>
);

const BannerWrap = styled.div`
  ${tw`mx-auto px-4`}
  max-width: 1400px;
  @media (max-width: 1280px) {
    ${tw`px-4`}
  }
  @media (max-width: 767px) {
    ${tw`px-0`}
  }
`;

export default Slider;
