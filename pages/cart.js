import styled from "@emotion/styled";
import tw from "tailwind.macro";
import React from "react";
import { Form } from "react-final-form";
import Router, { useRouter } from "next/router";
import { keyframes } from "@emotion/core";
import HeaderOrder from "../components/HeaderOrder";
import CartOrder from "../components/CartOrder";
import CartInfo from "../components/CartInfo";
import groupItems from "../utils/groupItems";
import Summary from "../components/Summary";
import Confirm from "../components/Confirm";
import { axiosInstance } from "../utils/axios";
import Finish from "../components/Finish";
import useScrollTop from "../components/common/useScrollTop";
import storage from "../utils/storage";
import { ContextCart } from "./_app";

const fetchCart = (data) => axiosInstance.post("/api/v2/app/order/cart", data);

const PageCart = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [confirmOpened, setConfirmOpened] = React.useState(false);
  const [finishOpened, setFinishOpened] = React.useState(false);
  const isPreset1 = router.asPath.includes("preset=1");
  const isPreset2 = router.asPath.includes("preset=2");

  const {
    cart,
    order,
    orderDispatch,
    cartDispatch,
    errorDispatch
  } = React.useContext(ContextCart);

  useScrollTop();

  const closeConfirm = React.useCallback(() => setConfirmOpened(false));

  const handleClickNext = React.useCallback(() => {
    setConfirmOpened(true);
  });

  const handleSaveOrder = React.useCallback(() => {
    setLoading(true);
    setConfirmOpened(false);
    setFinishOpened(true);
    storage.session.setValue("cart", []);
  });

  const handleCloseFinish = React.useCallback(() => {
    Router.replace("/");
    setTimeout(() => {
      orderDispatch({ type: "reset" });
      cartDispatch({ type: "reset" });
    }, 300);
  });

  const updateCart = React.useCallback((values = {}) => {
    setLoading(true);

    // if (cart.length === 0 && !isPreset1 && !isPreset2) {
    //   Router.replace("/");
    //   return;
    // }

    const items =
      cart.length > 0
        ? groupItems(cart).map((item) => ({
            id: item.id,
            count: cart.filter((i) => i === item).length
          }))
        : isPreset2
        ? [
            { id: 55, count: 2 },
            { id: 18, count: 2 }
          ]
        : isPreset1
        ? [
            { id: 26, count: 2 },
            { id: 13, count: 2 }
          ]
        : [];

    return fetchCart({
      address: values.address?.address
        ? { location: 4, ...values.address, id: undefined }
        : values.address?.id
        ? values.address
        : undefined,
      date: values.date,
      payment: values.payment,
      promo: isPreset1 || isPreset2 ? "Набор2в1" : values.promo,
      comment: values.comment || undefined,
      items,
      save: values.save
    })
      .then(({ data }) => {
        orderDispatch({
          type: "set",
          payload: data
        });

        if (data.message) {
          errorDispatch(backendErrorActionWithText(data.message.text));
        }
      })
      .catch((e) => {
        setConfirmOpened(false);
        setFinishOpened(false);
        if (e.response.data.error) {
          errorDispatch(backendErrorActionWithText(e.response.data.error));
        } else {
          errorDispatch(backendErrorAction);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  });

  React.useEffect(() => {
    updateCart(order.formValues);
  }, [cart]);

  return (
    <>
      <HeaderOrder complete={finishOpened} confirm={confirmOpened} />
      <MainWrap>
        <CartOrder isPreset1={isPreset1} isPreset2={isPreset2} />
        <Form initialValues={order.formValues} onSubmit={updateCart}>
          {(formRenderProps) => (
            <>
              <CartInfo
                dirty={formRenderProps.dirty}
                loading={loading}
                onSubmit={formRenderProps.handleSubmit}
                values={formRenderProps.values || {}}
              />
              {finishOpened && (
                <Finish
                  {...order.complete}
                  loading={loading}
                  onClose={handleCloseFinish}
                  onSubmit={formRenderProps.handleSubmit}
                />
              )}
            </>
          )}
        </Form>
        <Summary onSubmit={handleClickNext} />
        {confirmOpened && (
          <Confirm
            loading={loading}
            onClose={closeConfirm}
            onSubmit={handleSaveOrder}
            setLoading={setLoading}
          />
        )}

        {loading && <LoaderView />}
      </MainWrap>
    </>
  );
};

const MainWrap = styled.main`
  ${tw`mx-auto relative`}
  max-width: 680px;
`;

const loaderAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.8;
  }
`;

const LoaderView = styled.div`
  ${tw`absolute w-full h-full left-0 top-0`}
  animation: 0.35s ease-out ${loaderAnimation};
  animation-fill-mode: forwards;
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
`;

const backendErrorAction = {
  type: "show",
  payload: {
    title: "Ошибка",
    text: "Возможно один или несколько товаров уже не доступны.",
    critical: true
  }
};

const backendErrorActionWithText = (text) => ({
  type: "show",
  payload: {
    title: "Ошибка",
    text,
    dismissable: true
  }
});

const emptyAddressAction = {
  type: "show",
  payload: {
    title: "Ошибка",
    text: "Не выбран адрес доставки.",
    dismissable: true
  }
};

export default PageCart;
