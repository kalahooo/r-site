import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SidebarBanner = () => (
  <SidebarBannerWrap>
    <LazyLoadImage
      alt={"Обменяй баллы на технику"}
      src={require("./banner-sidebar2.png")}
    />
  </SidebarBannerWrap>
);

const SidebarBannerWrap = styled.div`
  ${tw`pt-4`}
  img {
    ${tw`w-full rounded`}
  }
  @media (max-width: 1024px) {
    ${tw`hidden`}
  }
`;

export default SidebarBanner;
