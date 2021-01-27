import tw from "tailwind.macro";
import styled from "@emotion/styled";
import animatedScroll from "../../utils/animatedScroll";
import { sendAnalytics } from "../../utils/analytics";
import GoogleplayLink from "../common/Markets/GoogleplayLink";
import AppstoreLink from "../common/Markets/AppstoreLink";

const sendAppstoreClick = () => sendAnalytics("appstore-click");
const sendPlaymarketClick = () => sendAnalytics("playmarket-click");

const Footer = () => (
  <FooterWrap>
    <Col>
      <Logo
        alt="Redmond.еда"
        height="50"
        src={require("./logo.svg")}
        width="204"
      />
      <Links>
        <GoogleplayLink onClick={sendPlaymarketClick} />
        <AppstoreLink onClick={sendAppstoreClick} />
      </Links>
    </Col>
    <Col>
      <Title2>О компании</Title2>
      <Link href="#about" onClick={animatedScroll}>
        Как мы работаем
      </Link>
      <Link href="#catalog" onClick={animatedScroll}>
        Меню
      </Link>
      <Link href="#technics" onClick={animatedScroll}>
        Техника REDMOND
      </Link>
      <Link href="#faq" onClick={animatedScroll}>
        FAQ
      </Link>
      <Link href="/docs/offer.html" target="_blank">
        Оферта
      </Link>
      <Link href="/docs/sale.html" target="_blank">
        Ешь и зарабатывай
      </Link>
    </Col>
    <Col>
      <Title2>Контакты</Title2>
      <Chats>
        <Chat href="https://t.me/redmondeda" rel="noreferrer" target="_blank">
          <img
            alt="Redmond.еда telegram"
            height="24"
            src={require("./telegram.svg")}
            width="24"
          />
        </Chat>
        <Chat
          href="https://api.whatsapp.com/send?phone=79215517061"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="Redmond.еда whatsapp"
            height="24"
            src={require("./whatsapp.svg")}
            width="24"
          />
        </Chat>
      </Chats>
      <Time>c 10 до 22 ежедневно</Time>
      <Socials>
        <Social
          href="https://www.facebook.com/pg/eda.redmond"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="Redmond.еда facebook"
            height="18"
            src={require("./fb.svg")}
            width="18"
          />
        </Social>
        <Social
          href="https://vk.com/eda.redmond"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="Redmond.еда вконтакте"
            height="18"
            src={require("./vk.svg")}
            width="18"
          />
        </Social>
        <Social
          href="https://www.instagram.com/eda.redmond/?hl=ru"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="Redmond.еда instagram"
            height="18"
            src={require("./in.svg")}
            width="18"
          />
        </Social>
      </Socials>
    </Col>
  </FooterWrap>
);

const FooterWrap = styled.div`
  ${tw`bg-gray-200 py-12 px-8 flex`}
  @media (max-width: 767px) {
    ${tw`flex-col text-center`}
  }
`;

const Col = styled.div`
  ${tw`w-1/3 pl-16`}
  &:first-of-type {
    ${tw`pl-0`}
  }
  @media (max-width: 767px) {
    ${tw`w-full p-0`}
  }
`;

const Logo = styled.img`
  ${tw``}
`;

const Links = styled.div`
  ${tw`mt-10`}
  a {
    ${tw`mt-2 block`}
  }
  @media (max-width: 767px) {
    ${tw`mb-4`}
  }
`;

const Title2 = styled.div`
  ${tw`text-xl text-semibold py-4 mb-4`}
`;

const Link = styled.a`
  ${tw`block py-1 no-underline text-gray-600 font-light`}
  @media(max-width: 767px) {
    ${tw`my-2`}
  }
`;

const Time = styled.div`
  ${tw`text-gray-400 font-light`}
`;

const Socials = styled.div`
  ${tw`flex mt-4`}
  @media (max-width: 767px) {
    ${tw`justify-center`}
  }
`;

const Social = styled.a`
  ${tw`w-8 h-8 rounded bg-white mr-2 flex items-center justify-center`}
  &:last-of-type {
    ${tw`mr-0`}
  }
`;

const Chats = styled.div`
  ${tw`flex mb-8`}
  @media (max-width: 767px) {
    ${tw`justify-center`}
  }
`;

const Chat = styled.a`
  ${tw`w-6 h-6 mr-4 inline-block flex items-center justify-center`}
  img {
    ${tw`w-6 h-6`}
  }
  &:last-of-type {
    ${tw`mr-0`}
  }
`;

export default Footer;
