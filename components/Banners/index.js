import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { css } from "@emotion/core";
import Title from "../common/Title";
import Popup from "./Popup";
import useBanners from "./useBanners";

const Placeholder = styled.div`
  min-width: 1px;
  min-height: 1px;
`;

const Banners = () => {
  const banners = useBanners();

  const [selectedBanner, setSelectedBanner] = React.useState(null);

  return (
    <>
      <Title>Акции</Title>
      <BannersWrap>
        <ScrollContainer hideScrollbars horizontal vertical={false}>
          {banners
            ? banners.map((banner) => (
                <LazyLoadImage
                  alt="Акция"
                  key={banner.id}
                  onClick={() => setSelectedBanner(banner)}
                  placeholder={<Placeholder />}
                  src={banner.imageUrl}
                  threshold={300}
                />
              ))
            : [0, 1, 2].map((key) => <BannerSkeleton key={key} />)}
        </ScrollContainer>
      </BannersWrap>
      {selectedBanner && (
        <Popup
          bannerId={selectedBanner.id}
          onClose={() => setSelectedBanner(null)}
        />
      )}
    </>
  );
};

const Banner = css`
  ${tw`ml-6 rounded cursor-pointer`}
  &:last-child {
    ${tw`mr-6`}
  }
  height: 9rem;
`;

const BannersWrap = styled.div`
  ${tw`pb-6 max-w-full relative`}

  img {
    ${Banner}
  }

  & > * {
    ${tw`flex`}

    &::after {
      content: "";
      ${tw`h-32 w-1 block`}
      flex-shrink: 0;
    }
  }

  @media (max-width: 767px) {
    ${tw`pb-6`}
  }
`;

const BannerSkeleton = styled.div`
  ${tw`h-32 mr-6 rounded bg-gray-200`}
`;

export default Banners;
