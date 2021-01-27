import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import { axiosInstance } from "../../utils/axios";
import PopupWithBack from "../common/PopupWithBack";

const fetchItem = (id) => axiosInstance.get(`/api/v1/app/technics/show/${id}`);
const Popup = (props) => {
  const [item, setItem] = React.useState(null);

  React.useEffect(() => {
    fetchItem(props.id).then(({ data }) => {
      setItem(data);
    });
  }, []);

  if (!item) {
    return null;
  }

  return (
    <PopupWithBack onClose={props.onClose}>
      <Content>
        <Title>{item.title}</Title>
        <Columns>
          <Column>
            <Image src={item.images[0]} />
            <Description>
              <Subtitle>Описание</Subtitle>
              {item.description}
            </Description>
            {item.video && (
              <iframe
                allow="autoplay; encrypted-media"
                allowFullScreen
                frameBorder="0"
                height="240"
                src={`https://www.youtube.com/embed/${item.video}`}
                width="320"
              />
            )}
          </Column>
          <Column>
            <Subtitle>Тех. характеристики</Subtitle>
            {item.parameters.map((row) => (
              <Row key={row.label}>
                <Detail>{row.label}</Detail>
                <Detail>{row.value}</Detail>
              </Row>
            ))}
          </Column>
        </Columns>
      </Content>
    </PopupWithBack>
  );
};

const Content = styled.div`
  ${tw`px-8 pb-8 pt-20`}
  @media (max-width: 767px) {
    ${tw`px-4`}
  }
  @media (max-width: 767px) {
    ${tw`pb-20`}
  }
`;
const Title = styled.div`
  ${tw`mb-8 font-medium text-3xl`}
  @media (max-width: 767px) {
    ${tw`text-2xl`}
  }
`;

const Columns = styled.div`
  ${tw`flex flex-wrap`}
`;

const Column = styled.div`
  ${tw`w-1/2`}
  box-sizing: border-box;
  &:first-of-type {
    ${tw`pr-2`}
  }
  &:last-of-type {
    ${tw`pl-2`}
  }
  @media (max-width: 767px) {
    ${tw`w-full mb-8`}
    padding: 0 !important;
  }
`;

const Image = styled.img`
  ${tw`w-full mb-8`}
`;

const Description = styled.div`
  ${tw`text-sm font-light`}
`;

const Subtitle = styled.div`
  ${tw`mb-8 font-medium text-2xl`}
`;

const Row = styled.div`
  ${tw`p-2 flex text-xs font-light`}
  &:nth-of-type(even) {
    ${tw`bg-gray-200`}
  }
`;

const Detail = styled.div`
  ${tw`w-1/2`}
`;

export default Popup;
