import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import Popup from "../Catalog/Popup";

const Item = ({ img, title, time, weight, portions, id }) => {
  const [active, setActive] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setActive(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setActive(false);
  }, []);

  return (
    <>
      <ItemWrap>
        <ImageWrap>
          <Image onClick={handleOpen} src={img} />
          <Time>Подробнее</Time>
        </ImageWrap>
        <Title>{title}</Title>
        <Tags>
          <Tag>{time}</Tag>
          <Tag>{weight}</Tag>
          <Tag>{portions}</Tag>
        </Tags>
      </ItemWrap>
      {active && <Popup count={2} id={id} onClose={handleClose} />}
    </>
  );
};

const ItemWrap = styled.div`
  ${tw`text-left`}
`;

const ImageWrap = styled.div`
  ${tw`relative`}
`;

const Image = styled.img`
  ${tw`cursor-pointer`}
  height: 240px;
  @media (max-width: 767px) {
    height: auto;
    max-width: 100%;
  }
`;

const Title = styled.div`
  ${tw`pt-4 font-medium text-2xl`}
`;

const Tags = styled.div`
  ${tw`pt-4 flex flex-wrap`}
`;

const Time = styled.div`
  ${tw`absolute bg-white text-black text-sm rounded-full px-2 py-1 leading-none`}
  bottom: 1rem;
  left: 1rem;
`;

const Tag = styled.div`
  ${tw`bg-gray-200 py-2 px-4 rounded text-sm mr-2 mb-2 leading-none whitespace-no-wrap`}
  @media (max-width: 767px) {
    ${tw`px-2`}
  }
`;

export default Item;
