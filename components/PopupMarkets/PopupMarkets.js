import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import storage from "../../utils/storage";
import { sendAnalytics } from "../../utils/analytics";

const TOKEN = "applinkshowed";

const PopupMarkets = () => {
  const [visible, setVisible] = React.useState(true);

  const handleClose = React.useCallback(() => {
    setVisible(false);
    // storage.permanent.setValue(TOKEN, 1);
  }, []);

  const handleClickLink = React.useCallback(() => {
    setVisible(false);
    // storage.permanent.setValue(TOKEN, 1);
    sendAnalytics("appstore-header-click");
  }, []);

  // React.useEffect(() => {
  //   const notShowed = !storage.permanent.getValue(TOKEN);
  //   if (notShowed) {
  //     setVisible(true);
  //   }
  // }, []);

  if (!visible) {
    return null;
  }

  return (
    <PopupMarketsWrap>
      <Close onClick={handleClose}>
        <img src={require("./close.svg")} />
      </Close>
      <Logowrap>
        <Logo src={require("./logo.svg")} />
      </Logowrap>
      <Title>
        Приложение
        <br />
        Redmond.еда
      </Title>
      <AppLink
        href="https://app.redmondeda.ru/link/app"
        onClick={handleClickLink}
        rel="noreferrer"
        target="_blank"
      >
        Скачать
      </AppLink>
    </PopupMarketsWrap>
  );
};

const PopupMarketsWrap = styled.div`
  @media (min-width: 541px) {
    display: none;
  }

  ${tw`
  relative
  flex items-center
  h-16 p-4 pl-0 bg-gray-100 border-0 border-b border-bottom border-solid border-gray-300
  `}
  box-sizing: border-box;
  z-index: 2;
`;

const Close = styled.button`
  ${tw`border-0 bg-transparent leading-none p-2`}
  img {
    ${tw`w-2 h-2`}
  }
`;

const AppLink = styled.a`
  ${tw`text-sm ml-auto uppercase no-underline`}
  color:#3678f3;
`;

const Logo = styled.img`
  ${tw`w-8 h-8`}
`;

const Title = styled.div`
  ${tw`font-light text-sm ml-2`}
`;

const Logowrap = styled.div`
  ${tw`p-2 bg-white rounded-lg leading-none`}
`;
export default PopupMarkets;
