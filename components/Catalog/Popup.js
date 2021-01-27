import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { axiosInstance } from "../../utils/axios";
import PopupWithBack from "../common/PopupWithBack";
import Control from "./Control";

const fetchItem = (id, count) =>
  axiosInstance.get(`/api/v1/app/item/${Number(id)}?count=${Number(count)}`);

const fetchOrderItem = (id) =>
  axiosInstance.get(`/api/v1/app/orderitem/${Number(id)}`);

const Popup = (props) => {
  const [item, setItem] = React.useState(null);

  React.useEffect(() => {
    if (props.id) {
      fetchItem(props.id, props.count).then(({ data }) => {
        setItem(data);
      });
    } else if (props.orderitem) {
      fetchOrderItem(props.orderitem).then(({ data }) => {
        setItem(data);
      });
    }
  }, [props.count]);

  if (!item) {
    return null;
  }

  return (
    <PopupWithBack onClose={props.onClose}>
      <ImageContainer>
        <Image src={item.imageUrl} />

        {props.onAdd && (
          <ControlWrap>
            <Control
              count={props.count}
              onAdd={props.onAdd}
              onRemove={props.onRemove}
              onSetCount={props.onSetCount}
              unit={item.unit}
              variants={item.variants}
            />
          </ControlWrap>
        )}
      </ImageContainer>
      <Content>
        <Title>{item.title}</Title>
        <Tags>
          {item.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>

        <Contains>
          <ContainsCol>
            <ContainsColValue>{item.calories}</ContainsColValue>
            <ContainsColtext>Калории</ContainsColtext>
          </ContainsCol>
          <ContainsCol>
            <ContainsColValue>{item.proteins}</ContainsColValue>
            <ContainsColtext>Белки</ContainsColtext>
          </ContainsCol>
          <ContainsCol>
            <ContainsColValue>{item.fats}</ContainsColValue>
            <ContainsColtext>Жиры</ContainsColtext>
          </ContainsCol>
          <ContainsCol>
            <ContainsColValue>{item.carbohydrates}</ContainsColValue>
            <ContainsColtext>Углеводы</ContainsColtext>
          </ContainsCol>
        </Contains>

        <Title2>Как приготовить?</Title2>
        <Steps>
          {item.recipes[0].steps.map((step, index) => (
            <Step key={index}>
              <LazyLoadImage src={step.videoUrl} />
              <StepTitle>{step.description}</StepTitle>
            </Step>
          ))}
        </Steps>

        <Title2>Мы привезём</Title2>
        <Items>
          {item.ingredients.map((ingredient) => (
            <Item key={ingredient.title}>
              <ItemImage src={ingredient.imageUrl} />
              <ItemTitle>{ingredient.title}</ItemTitle>
              {/* <ItemWeight>{ingredient.weight} г.</ItemWeight> */}
            </Item>
          ))}
        </Items>

        <Title2>Вам понадобится</Title2>
        <Items>
          {item.recipes[0].tools.map((tool) => (
            <Item key={tool.title}>
              <ItemImage src={tool.imageUrl} />
              <ItemTitle>{tool.title}</ItemTitle>
            </Item>
          ))}
        </Items>
      </Content>
    </PopupWithBack>
  );
};

const ImageContainer = styled.div`
  ${tw`relative leading-none`}
`;
const Image = styled.img`
  ${tw`w-full`}
`;
const ControlWrap = styled.div`
  position: absolute;
  bottom: 0;
  right: 16px;
  transform: translateY(50%);
`;

const Content = styled.div`
  ${tw`px-8 pb-8`}
  @media (max-width: 767px) {
    ${tw`px-4`}
  }
  @media (max-width: 767px) {
    ${tw`pb-20`}
  }
`;

const Title = styled.div`
  ${tw`pt-8 font-medium text-3xl`}
  @media (max-width: 767px) {
    ${tw`text-2xl`}
  }
`;

const Title2 = styled.div`
  ${tw`pt-8 font-medium text-2xl`}
`;

const Tags = styled.div`
  ${tw`pt-8 flex flex-wrap`}
`;

const Tag = styled.div`
  ${tw`bg-gray-200 py-2 px-4 rounded text-sm mr-2 mb-2 leading-none whitespace-no-wrap`}
  @media (max-width: 767px) {
    ${tw`px-2`}
  }
`;

const Contains = styled.div`
  ${tw`pt-8 flex`}
`;

const ContainsCol = styled.div`
  ${tw`text-center mr-16`}
  @media (max-width: 767px) {
    ${tw`mr-8`}
  }
`;

const ContainsColValue = styled.div`
  ${tw`text-brand font-bold text-2xl`}
`;

const ContainsColtext = styled.div`
  ${tw`text-gray-500 text-xs`}
`;

const Items = styled.div`
  ${tw`pt-4 -mr-4 flex flex-wrap`}
  @media (max-width: 767px) {
    ${tw`-mr-2`}
  }
`;

const Item = styled.div`
  ${tw`text-center w-24 mr-4 mb-4`}
  @media (max-width: 767px) {
    ${tw`mr-2 mb-2`}
  }
`;

const ItemImage = styled.img`
  ${tw`rounded`}
`;

const ItemTitle = styled.div`
  ${tw`text-xs`}
`;

const Steps = styled.div`
  ${tw``}
`;

const Step = styled.div`
  ${tw`mt-8`}
  img {
    ${tw`mb-2 h-64 max-w-full`}
    @media (max-width: 767px) {
      ${tw`h-auto`}
    }
  }
`;

const StepTitle = styled.div`
  ${tw`font-light`}
`;

export default Popup;
