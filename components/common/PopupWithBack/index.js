import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import tw from "tailwind.macro";
import Portal from "../Portal";
import ModalBackground from "../ModalBackground";

const PopupWithBack = ({ onClose, children }) => {
  const [stickyHeader, setStickyHeader] = React.useState(false);

  const scrollHandler = React.useCallback((ev) => {
    const needSticky = ev.target.scrollTop > 0;
    if (needSticky && !stickyHeader) {
      setStickyHeader(true);
    } else if (stickyHeader && !needSticky) {
      setStickyHeader(false);
    }
  });

  return (
    <Portal>
      <ModalBackground lower onClick={onClose}>
        <PopupContent
          onClick={(ev) => ev.stopPropagation()}
          onScroll={scrollHandler}
        >
          {children}
        </PopupContent>
        <HeaderWrap>
          <Header active={stickyHeader}>
            <Back onClick={onClose}>
              <img height="24" src={require("./Arrow Back.svg")} width="24" />
            </Back>
          </Header>
        </HeaderWrap>
      </ModalBackground>
    </Portal>
  );
};

const PopupContent = styled.div`
  ${tw`bg-white min-h-full max-h-full h-full overflow-y-auto max-w-full relative`}
  width: 780px;
  max-width: 100%;

  &::-webkit-scrollbar-track {
    ${tw`bg-gray-200`}
  }

  &::-webkit-scrollbar {
    ${tw`w-1`}
  }

  &::-webkit-scrollbar-thumb {
    ${tw`bg-gray-500 rounded`}
  }
`;

const HeaderWrap = styled.div`
  ${tw`fixed top-0 left-0 w-full`}
`;

const Header = styled.div`
  ${tw`mx-auto p-4`}
  width: 780px;
  max-width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  background-color: rgba(255, 255, 255, 0);
  ${(props) =>
    props.active && [
      css`
        background-color: rgba(255, 255, 255, 0.9);
      `,
      tw`py-2`
    ]}
`;

const Back = styled.button`
  ${tw`rounded-full border-0 bg-white w-12 h-12`}
`;

export default PopupWithBack;
