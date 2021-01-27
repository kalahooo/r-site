import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import Link from "next/link";
import Title from "../common/Title";
import { sendAnalytics } from "../../utils/analytics";
import Item from "./Item";

const Package2in1 = () => {
  const handleClickPreset1 = React.useCallback(() => {
    sendAnalytics("select-preset-1");
  }, []);

  const handleClickPreset2 = React.useCallback(() => {
    sendAnalytics("select-preset-2");
  }, []);

  return (
    <Package2in1Wrap id="p2in1">
      <Title>Выберите набор</Title>

      <Row>
        <Variant>
          Борщ + Бефстроганов <Sum>= 499 ₽</Sum>
        </Variant>
        <Link href="/cart?preset=1" passHref>
          <BtnLink onClick={handleClickPreset1}>+ В корзину</BtnLink>
        </Link>
      </Row>

      <Items>
        <Item
          id={26}
          img="https://redmondeda.ru/media/f33d4a4a.png"
          portions="2 порции"
          time="10 минут"
          title="Борщ с говядиной"
          weight="800 г"
        />
        <Item
          id={13}
          img="https://redmondeda.ru/media/4328f09d.png"
          portions="2 порции"
          time="25 минут"
          title="Бефстроганов с пюре"
          weight="800 г"
        />
      </Items>

      <Row>
        <Variant>
          Уха + Лазанья <Sum>= 499 ₽</Sum>
        </Variant>
        <Link href="/cart?preset=2" passHref>
          <BtnLink onClick={handleClickPreset2}>+ В корзину</BtnLink>
        </Link>
      </Row>

      <Items>
        <Item
          id={55}
          img="https://redmondeda.ru/media/30f6d460.png"
          portions="2 порции"
          time="10 минут"
          title="Уха финская"
          weight="800 г"
        />
        <Item
          id={18}
          img="https://redmondeda.ru/media/4d3efb62.png"
          portions="2 порции"
          time="20 минут"
          title="Лазанья"
          weight="800 г"
        />
      </Items>
    </Package2in1Wrap>
  );
};

const Package2in1Wrap = styled.div`
  ${tw`pt-8 pb-8 text-center`}
`;

const Row = styled.div`
  ${tw`flex mb-4 mt-12 mx-auto items-center justify-between`}
  width: 800px;
  @media (max-width: 767px) {
    width: auto;
    ${tw`flex-col`}
  }
`;

const Variant = styled.div`
  ${tw`text-2xl font-bold`}
`;

const Sum = styled.span`
  ${tw`text-brand`}
`;

const Items = styled.div`
  ${tw`inline-flex mx-auto pb-2`}
  max-width: 100%;
  & > * {
    ${tw`mr-4`}
    &:last-child {
      ${tw`mr-0`}
    }
  }

  @media (max-width: 767px) {
    ${tw`overflow-x-auto pb-6`}
    & > * {
      ${tw`w-10/12 mr-0 ml-4`}
      flex-shrink: 0
    }
    &::after {
      content: "";
      display: block;
      min-width: 1.5rem;
    }
  }
`;

const BtnLink = styled.a`
  ${tw`no-underline inline-block text-white bg-brand rounded-full py-2 px-4`}
  @media (max-width: 767px) {
    ${tw`mt-2`}
  }
`;

export default Package2in1;
