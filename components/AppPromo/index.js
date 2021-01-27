import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { sendAnalytics } from "../../utils/analytics";
import AppstoreLink from "../common/Markets/AppstoreLink";
import GoogleplayLink from "../common/Markets/GoogleplayLink";

const sendAppstoreClick = () => sendAnalytics("appstore-click");
const sendPlaymarketClick = () => sendAnalytics("playmarket-click");

const AppPromo = () => (
  <AppPromoWrap>
    <Title>Приложение REDMOND EDA</Title>
    <Row>
      <Index>1.</Index> Отслеживание статуса заказов
    </Row>
    <Row>
      <Index>2.</Index> Обмен баллов на технику
    </Row>
    <Row>
      <Index>3.</Index> Личный кабинет
    </Row>
    <Links>
      <GoogleplayLink onClick={sendPlaymarketClick} />
      <AppstoreLink onClick={sendAppstoreClick} />
    </Links>
    <MobileImg>
      <LazyLoadImage
        alt="Приложение Redmond.еда"
        height="298"
        src={require("./Frame 632.png")}
        width="240"
      />
    </MobileImg>
  </AppPromoWrap>
);

const AppPromoWrap = styled.div`
  ${tw`p-8 bg-gray-200 relative`}
  @media (max-width: 767px) {
    ${tw`hidden`}
  }
`;

const Title = styled.div`
  ${tw`text-2xl font-medium mb-4`}
`;

const Row = styled.div`
  ${tw`py-4`}
`;

const Index = styled.span`
  ${tw`font-medium text-lg text-brand mr-2`}
`;

const Links = styled.div`
  ${tw`mt-12`}
  a {
    ${tw`inline-block`}
  }
  img {
    ${tw`mr-6`}
    height: 48px;
  }
`;

const MobileImg = styled.div`
  img {
    ${tw`absolute right-0 bottom-0 mr-16`}
    width: 240px;
  }
`;

export default AppPromo;
