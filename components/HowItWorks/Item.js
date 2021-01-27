import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Item = (props) => (
  <ItemWrap>
    <LazyLoadImage alt={props.title} height="160" src={props.src} width="160" />
    <Title dangerouslySetInnerHTML={{ __html: props.title }} />
    <Text dangerouslySetInnerHTML={{ __html: props.text }} />
  </ItemWrap>
);

const ItemWrap = styled.div`
  img {
    ${tw`block mx-auto rounded-full`}
    width: 160px;
    height: 160px;
    box-shadow: 0 0 0px 3px #e2e8f0;
    border: 3px solid transparent;
  }
`;

const Title = styled.div`
  ${tw`pt-4 text-center text-base font-bold`}
`;

const Text = styled.div`
  ${tw`pt-4 text-center text-sm`}
`;

export default Item;
