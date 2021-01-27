import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import BottomSheet from "../common/BottomSheet/BottomSheet";
import { fetchLastOrderInfo } from "../../api/data";
import storage from "../../utils/storage";
import { sendAnalytics } from "../../utils/analytics";
import GoogleplayLink from "../common/Markets/GoogleplayLink";
import AppstoreLink from "../common/Markets/AppstoreLink";
import isIos from "../../utils/isios";
import IconBell from "./icons_bell.svg";

const sendAppstoreClick = () => sendAnalytics("appstore-click");
const sendPlaymarketClick = () => sendAnalytics("playmarket-click");

const LastOrderInfo = () => {
  const [info, setInfo] = React.useState(null);
  const [opened, setOpened] = React.useState(false);

  React.useEffect(async () => {
    const isGuest = !storage.permanent.getValue("token");
    if (isGuest) {
      return;
    }
    try {
      const { data } = await fetchLastOrderInfo();
      setInfo(data.text);
    } catch (e) {
      console.log(">>>>", e);
    }
  }, []);

  const handleClickOpen = React.useCallback(() => {
    setOpened(true);
    sendAnalytics("lastorderinfo-click");
  }, []);

  const handleClickClose = React.useCallback(() => {
    setOpened(false);
  }, []);

  if (!info) {
    return null;
  }

  return (
    <LastOrderInfoWrap>
      <Button onClick={handleClickOpen}>
        <IconBell />
        <ButtonText>Ваш заказ</ButtonText>
      </Button>

      {opened && (
        <BottomSheet onClose={handleClickClose} x="left" y="bottom">
          <Content>
            <Title>Информация о заказе</Title>
            <Body>{info}</Body>

            <Links>
              <GoogleplayLink onClick={sendPlaymarketClick} />
              <AppstoreLink onClick={sendAppstoreClick} />
            </Links>
            <MobileLinks>
              {isIos() ? (
                <AppstoreLink onClick={sendAppstoreClick} />
              ) : (
                <GoogleplayLink onClick={sendPlaymarketClick} />
              )}
            </MobileLinks>
          </Content>
        </BottomSheet>
      )}
    </LastOrderInfoWrap>
  );
};

const animation = keyframes`
  0% { transform: rotate(0); }
  15% { transform: rotate(10deg); }
  30% { transform: rotate(-10deg); }
  45% { transform: rotate(7deg); }
  60% { transform: rotate(-7deg); }
  75% { transform: rotate(3deg); }
  85% { transform: rotate(-3deg); }
  92% { transform: rotate(1deg); }
  100% { transform: rotate(0); }
`;

const LastOrderInfoWrap = styled.div`
  ${tw`relative`}
`;

const Button = styled.button`
  ${tw`text-center`}
  @media (min-width: 1025px) {
    ${tw`text-white ml-3 bg-brand border-0 px-2 rounded flex items-center`}
  }
  @media (max-width: 1024px) {
    ${tw`text-brand ml-3 bg-transparent border-0 p-0`}
  }
  & > svg {
    ${tw`fill-current`}
    animation: 0.6s ease-out ${animation};
    animation-fill-mode: both;
    animation-iteration-count: infinite;
  }
`;

const ButtonText = styled.span`
  ${tw`block`}
`;

const Content = styled.div`
  ${tw`px-4 py-2 text-center`}
  @media (min-width: 768px) {
    width: 330px;
    max-width: 100%;
  }
`;

const Title = styled.div`
  ${tw`font-bold text-lg mb-4`}
`;

const Body = styled.div`
  ${tw`text-sm mb-6`}
  white-space: pre-wrap;
`;

const Links = styled.div`
  ${tw`hidden`}
  @media (min-width: 768px) {
    ${tw`block`}
    a {
      ${tw`inline-block`}
      &:last-child {
        ${tw`ml-3`}
      }
    }
  }
`;
const MobileLinks = styled.div`
  @media (min-width: 768px) {
    ${tw`hidden`}
  }
`;

export default LastOrderInfo;
