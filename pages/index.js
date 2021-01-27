import loadable from "@loadable/component";
import React from "react";
import Router from "next/router";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import { sendAnalytics } from "../utils/analytics";
import AppPromo from "../components/AppPromo";
import groupItems from "../utils/groupItems";
import Header from "../components/Header";
import HowItWorksSection from "../components/HowItWorks/HowItWorksSection";
import Slider from "../components/Slider";
import Videos from "../components/Videos";
import Catalog from "../components/Catalog";
import Banners from "../components/Banners";
import PopupMarkets from "../components/PopupMarkets/PopupMarkets";
import { fetchCart } from "../api/data";
import { ContextCart } from "./_app";

const Cart = loadable(() => import("../components/Cart"));
const DeliveryMap = loadable(() => import("../components/DeliveryMap"));
const FaqSection = loadable(() => import("../components/Faq/FaqSection"));
const Footer = loadable(() => import("../components/Footer"));
const Technics = loadable(() => import("../components/Technics"));

const PageIndex = () => {
  const [loading, setLoading] = React.useState(false);

  const { cart, orderDispatch, errorDispatch } = React.useContext(ContextCart);

  const updateCart = React.useCallback(() => {
    setLoading(true);

    sendAnalytics("cart-opened");

    const items = groupItems(cart).map((item) => ({
      id: item.id,
      count: cart.filter((i) => i === item).length
    }));

    fetchCart({ items })
      .then(({ data }) => {
        orderDispatch({ type: "set", payload: data });
        Router.push("/cart");
      })
      .catch((e) => {
        errorDispatch(backendErrorResponseAction(e.response?.data?.error));
        setLoading(false);
      });
  });

  return (
    <>
      <PopupMarkets />
      <Header />
      <Slider />
      <MainWrap>
        <ContentColumn>
          <HowItWorksSection />
          <Banners />
          <Catalog />
          <AppPromo />
          <Technics />
          <FaqSection />
          <Footer />
        </ContentColumn>
        <CartColumn visible={cart.length > 0}>
          <Cart loading={loading} onSubmit={updateCart} />
        </CartColumn>
      </MainWrap>
      <DeliveryMap />
    </>
  );
};

const MainWrap = styled.main`
  ${tw`flex w-full mx-auto`}
  max-width: 1400px;
  box-sizing: border-box;
  @media (max-width: 1280px) {
    ${tw`px-0`}
  }
`;

const ContentColumn = styled.div`
  ${tw`flex-1 border-0 border-r border-gray-200 border-solid`}
  @media (min-width: 1023px) {
    width: calc(100% - 300px);
  }
  @media (max-width: 1024px) {
    ${tw`border-0 max-w-full`}
  }
`;

const CartColumn = styled.div`
  @media (min-width: 1025px) {
    width: 300px;
  }
  @media (max-width: 1024px) {
    transition: bottom 0.3s ease;
    bottom: -100px;
    ${tw`fixed left-0 w-full z-30`}
    ${({ visible }) => visible && tw`bottom-0`}
  }
`;

const backendErrorResponseAction = (text) => ({
  type: "show",
  critical: true,
  payload: {
    title: "Внимание",
    text,
    dismissable: true
  }
});

export default PageIndex;
