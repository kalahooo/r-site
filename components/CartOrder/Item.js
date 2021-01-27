import tw from "tailwind.macro";
import styled from "@emotion/styled";
import Control from "../Catalog/Control";

const Item = (props) => (
  <ItemWrap>
    <Image style={{ backgroundImage: `url(${props.imageUrl})` }} />
    <Info>
      <Product>{props.title}</Product>
      <ControlWrap>
        <Control
          count={props.count}
          flat
          onAdd={props.onAdd}
          onRemove={props.onRemove}
          onSetCount={props.onSetCount}
          unit={props.unit}
          variants={props.variants}
        />
      </ControlWrap>
    </Info>
    <Price>{props.price} ₽</Price>
  </ItemWrap>
);

const ItemWrap = styled.div`
  ${tw`flex mb-4 relative items-center`}
  &:last-of-type {
    ${tw`mb-0`}
  }
  @media (max-width: 767px) {
    ${tw`mb-6`}
  }
`;

const Image = styled.div`
  ${tw`w-20 h-16 mr-4 bg-gray-200 rounded bg-center bg-cover`}
  flex-shrink: 0;
  @media (max-width: 767px) {
    width: 6rem;
    height: 5rem;
  }
`;

const Info = styled.div`
  ${tw`flex items-center flex-1`}
  @media (max-width: 767px) {
    ${tw`flex-col items-start`}
  }
`;

const ControlWrap = styled.div`
  ${tw`inline-block`}
  @media (min-width: 768px) {
    ${tw`ml-auto relative`}
  }
`;

const Product = styled.div`
  ${tw`font-light`}
`;

const Price = styled.div`
  ${tw`w-16 ml-4 text-lg font-medium text-right whitespace-no-wrap`}
`;

export default Item;
