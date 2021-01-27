import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import Link from "next/link";
import { css } from "@emotion/core";
import animatedScroll from "../../utils/animatedScroll";
import { sendAnalytics } from "../../utils/analytics";
import LastOrderInfo from "../LastOrderInfo/LastOrderInfo";

const Header = () => {
  const [showed, setShowed] = React.useState(false);

  const toggle = React.useCallback(() => {
    setShowed(!showed);
  }, [showed]);

  const handleClickHeaderLink = React.useCallback((ev) => {
    animatedScroll(ev);
    sendAnalytics("header-link-click");
  }, []);

  const handleClickHeaderMapLink = React.useCallback(() => {
    sendAnalytics("header-link-click");
  }, []);

  return (
    <HeaderWrap>
      <HeaderInner>
        <LogoWrap>
          <Logo
            alt="Redmond.еда"
            height="50"
            src={require("./logo2.svg")}
            width="204"
          />

          <ToggleMenuButton
            active={showed}
            aria-label="Меню"
            onClick={toggle}
          />
        </LogoWrap>
        <Nav showed={showed}>
          <a href="#about" onClick={handleClickHeaderLink}>
            Как мы работаем
          </a>
          <a href="#technics" onClick={handleClickHeaderLink}>
            Техника REDMOND за баллы
          </a>
          <Link href={`?showmap=1`} onClick={handleClickHeaderMapLink} passHref>
            <a>Зона доставки</a>
          </Link>
        </Nav>
        <LastOrderInfo />
      </HeaderInner>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header``;
//${tw`absolute inset-x-0 top-0 px-8 z-10`}
const HeaderInner = styled.div`
  ${tw`w-full max-w-screen-xl mx-auto flex items-center relative px-4`}
  max-width: 1400px;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  @media (max-width: 1280px) {
    ${tw`px-4`}
  }
`;

const LogoWrap = styled.div`
  @media (max-width: 1024px) {
    ${tw`bg-white relative flex items-center w-full`}
    z-index:2;
  }
`;

const Logo = styled.img`
  ${tw`py-4`}
  @media (max-width: 767px) {
  }
`;

const Nav = styled.nav`
  ${tw`ml-24 relative`}
  a {
    ${tw`text-black mr-8 no-underline`}
  }
  @media (max-width: 1024px) {
    ${tw`absolute right-0 w-full bg-white`}
    top: 100%;
    transition: all 0.1s ease-in-out;
    transform: translateY(-300px);
    opacity: 0;
    z-index: -1;
    a {
      ${tw`mr-0 mb-8 mt-8 text-lg block text-center`}
    }
    ${(props) =>
      props.showed &&
      css`
        transform: translateY(0);
        opacity: 1;
        z-index: 1;
      `}
  }
`;

const ToggleMenuButton = styled.button`
  ${tw`hidden`}
  @media (max-width: 1024px) {
    ${tw`block ml-auto border-0`}
    z-index: 3;
    background: transparent;
    position: relative;
    height: 20px;
    width: 24px;

    &:before,
    &:after {
      background: #333;
      backface-visibility: hidden;
      content: "";
      height: 2px;
      left: 0;
      transition: 0.35s;
      width: 24px;
    }

    &:before {
      box-shadow: #333 0 9px 0 0;
      position: absolute;
      top: 0;
    }

    &:after {
      position: absolute;
      top: calc(100% - 2px);
    }

    ${(props) =>
      props.active &&
      css`
        &:before {
          box-shadow: transparent 0 0 0 0;
          top: 50%;
          transform: rotate(225deg);
        }

        &:after {
          top: 50%;
          transform: rotate(315deg);
        }
      `}
  }
`;

export default Header;
