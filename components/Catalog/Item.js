import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import Control, { ControlSkeleton, EmptySkeleton } from "./Control";

const Placeholder = styled.div`
  min-width: 1px;
  min-height: 1px;
`;

const Item = (props) => {
  return (
    <ItemWrap>
      <Link href={`?product=${props.id}`} passHref>
        <Image onClick={props.onPreview}>
          <ImageContainer>
            <LazyLoadImage
              alt={props.title}
              placeholder={<Placeholder />}
              src={props.imageUrl}
              threshold={500}
            />
          </ImageContainer>

          <Time>Подробнее</Time>
        </Image>
      </Link>

      <Link href={`?product=${props.id}`} passHref>
        <Title onClick={props.onPreview}>{props.title}</Title>
      </Link>
      <PriceWrap>
        <Price>{props.price} ₽</Price>
        <Portions>
          за 1 {props.unit === "PORTION" ? "порцию" : "штуку"} / {props.weight}{" "}
          г
        </Portions>

        <ControlWrap>
          <Control
            count={props.count}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
            onSetCount={props.onSetCount}
            unit={props.unit}
            variants={props.variants}
          />
        </ControlWrap>
      </PriceWrap>
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  ${tw`relative flex flex-col`}
  padding-bottom: 2.3rem;
`;

const ImageContainer = styled.div`
  ${tw`relative overflow-hidden block rounded`}
  padding-top: 70%;
  & > img {
    ${tw`rounded w-auto h-full absolute top-0 cursor-pointer border-transparent border-solid border`}
    left: 50%;
    transform: translateX(-50%);
  }
  & > span {
    ${tw`absolute top-0`}
  }
`;

const Image = styled.a`
  ${tw`relative leading-none`}
`;

const Info = styled.img`
  ${tw`absolute w-4 h-4`}
  right: 1rem;
  top: 1rem;
`;

const Time = styled.div`
  ${tw`absolute bg-white text-black text-sm rounded-full px-2 py-1 leading-none`}
  bottom: 1rem;
  left: 1rem;
`;

const ControlWrap = styled.div`
  position: absolute;
  bottom: 20px;
  right: 0;
  transform: translateY(50%);
`;

const Title = styled.a`
  ${tw`py-2 text-black text-sm cursor-pointer mt-auto mb-auto no-underline`}
`;

const PriceWrap = styled.div`
  ${tw`absolute left-0 bottom-0 w-full pl-6`}
  box-sizing: border-box;
`;

const Price = styled.div`
  ${tw`font-bold text-lg`}
`;

const Portions = styled.div`
  ${tw`text-gray-600 text-sm`}
`;

const ImageConteinerSkeleton = styled(ImageContainer)`
  ${tw`bg-gray-200`}
`;

const TitleSkeleton = styled.div`
  ${tw`w-48 py-2 rounded bg-gray-200`}
`;
const PriceSkeleton = styled.div`
  ${tw`w-24 py-2 mt-1 rounded bg-gray-200`}
`;

export const ItemSkeleton = () => (
  <ItemWrap>
    <Image>
      <ImageConteinerSkeleton />
      <ControlWrap>
        <ControlSkeleton>
          <EmptySkeleton />
        </ControlSkeleton>
      </ControlWrap>
    </Image>
    <Title>
      <TitleSkeleton />
    </Title>
    <PriceSkeleton />
  </ItemWrap>
);

export default React.memo(Item);
