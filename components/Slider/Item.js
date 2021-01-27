import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import animatedScroll from "../../utils/animatedScroll";
import { sendAnalytics } from "../../utils/analytics";

const Item = () => {
  const handleClickScroll = React.useCallback((ev) => {
    animatedScroll(ev);
    sendAnalytics("scroll-menu-click");
  }, []);

  return (
    <ItemWrap>
      <picture>
        <source media="(min-width: 481px)" srcSet={require("./slider-3.jpg")} />
        <source
          media="(max-width: 480px)"
          srcSet={require("./offer-mobile@2x.jpg")}
        />
        <Banner
          alt="Redmond.еда"
          height="430"
          src={require("./slider-3.jpg")}
          width="100%"
        />
      </picture>
      <Content>
        <Title>Доставка правильных продуктов для приготовления ужина</Title>
        <div>
          <SubTitle>
            Мы привезем подготовленные ингредиенты и рецепты.
            <Br /> Готовьте дома на плите, в духовке, мультиварке и гриле.
          </SubTitle>
        </div>

        <ButtonSec href="#catalog" onClick={handleClickScroll}>
          Выбрать блюдо
        </ButtonSec>
      </Content>
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  ${tw`relative overflow-hidden`}
  background: #ffe4c4;
  /* @media (max-width: 1024px) {
    height: 400px;
  } */
  @media (max-width: 767px) {
    height: 430px;
  }
`;

const Banner = styled.img`
  ${tw`w-full rounded`}
  height: auto !important;
  /* min-height: 400px; */
  @media (max-width: 767px) {
    ${tw`h-full absolute w-auto`}
    height: 100% !important;
    min-height: auto;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Content = styled.div`
  ${tw`absolute w-full text-center`}
  left: 50%;
  bottom: 5rem;
  transform: translate(-50%, 0);
  max-width: 710px;
  @media (max-width: 1024px) {
  }
  @media (max-width: 767px) {
    left: 0;
    transform: none;
    bottom: 3rem;
  }
`;
const Title = styled.div`
  ${tw`text-black text-3xl font-bold uppercase mb-6`}
  letter-spacing: 1px;
  text-shadow: 0 0 3px #fff;
  @media (max-width: 1024px) {
    ${tw`text-3xl`}
  }
  @media (max-width: 767px) {
    ${tw`text-xl`}
  }
`;

const SubTitle = styled.span`
  ${tw`text-black text-2xl px-6 py-4 inline-block rounded`}
  background: rgba(255,255,255,0.5);
  line-height: 1.5;

  @media (max-width: 1024px) {
    ${tw`text-xl`}
  }
  @media (max-width: 767px) {
    ${tw`text-base rounded-none`}
  }
`;

const Br = styled.br`
  ${tw`block`}
  @media (max-width: 767px) {
    ${tw`hidden`}
  }
`;

const ButtonSec = styled.a`
  ${tw`bg-brand no-underline rounded px-10 py-4 mt-10 text-white font-semibold uppercase inline-block`}
  @media (max-width: 767px) {
    ${tw`mt-12`}
  }
`;

export default Item;
