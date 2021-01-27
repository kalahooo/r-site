import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Placeholder = styled.div`
  min-width: 1px;
  min-height: 1px;
`;

const Item = (props) => (
  <ItemWrap>
    <Image>
      <ImageContainer>
        <LazyLoadImage
          alt={props.title}
          onClick={props.onClick}
          placeholder={<Placeholder />}
          src={props.imageUrl}
          threshold={300}
        />
      </ImageContainer>
      <Label>до -50%</Label>
    </Image>
    <Title>{props.title}</Title>
    <PriceWrap>
      <Price>{props.price} ₽</Price>
      <NewPrice>{(props.price / 2).toFixed(0)} ₽</NewPrice>
    </PriceWrap>
  </ItemWrap>
);

const ItemWrap = styled.div`
  ${tw``}
`;

const Image = styled.div`
  ${tw`relative cursor-pointer`}
`;

const ImageContainer = styled.div`
  ${tw`relative`}
  padding-top: 100%;
  & > img {
    ${tw`rounded w-full h-full absolute inset-0`}
  }
  & > span {
    ${tw`absolute top-0`}
  }
`;

const Label = styled.div`
  ${tw`bg-brand text-white absolute left-0 top-0 py-1 px-2 rounded text-sm`}
  transform: rotate(-10deg);
`;

const Title = styled.div`
  ${tw`pt-4 pb-1 text-base font-light rounded`}
`;

const PriceWrap = styled.div`
  ${tw``}
`;

const Price = styled.span`
  ${tw`line-through text-sm`}
`;

const NewPrice = styled.span`
  ${tw`text-brand font-bold ml-2`}
`;

export default Item;
