import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";
import data from "./data.json";

const Faq = () => {
  return (
    <FaqWrap>
      {data.map((row, index) => (
        <Item {...row} index={index} key={row.title} />
      ))}
    </FaqWrap>
  );
};

const FaqWrap = styled.div`
  ${tw``}
`;

const Item = (props) => {
  const [opened, setOpened] = React.useState(props.index === 0);

  const handleClick = React.useCallback(() => {
    setOpened(!opened);
  });

  return (
    <ItemWrap>
      <Title onClick={handleClick}>
        {props.title}
        <Shevron
          active={opened}
          alt="Развернуть"
          height="10"
          src={require("./shevron.svg")}
          width="14"
        />
      </Title>
      {opened && <Text dangerouslySetInnerHTML={{ __html: props.text }} />}
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  &::after {
    height: 2px;
    ${tw`block bg-brand w-16 my-4`}
    content: "";
  }
  &:last-of-type &::after {
    ${tw`hidden`}
  }
`;

const Title = styled.div`
  ${tw`text-base font-bold flex items-center cursor-default`}
  @media (max-width: 767px) {
    ${tw`justify-between`}
  }
`;

const Shevron = styled.img`
  ${tw`inline-block ml-2 flex-shrink-0`}
  width: 16px;
  height: 16px;
  ${(props) =>
    props.active &&
    css`
      transform: rotate(180deg);
    `}
`;

const itemAnimation = keyframes`
  from {
    opacity: 0;
    top: -10px;
  }
  to {
    opacity: 1;
    top: 0;
  }
`;

const Text = styled.div`
  ${tw`mt-2 text-sm relative`}
  animation: 0.15s ease-out ${itemAnimation};
  animation-fill-mode: forwards;
`;

export default Faq;
