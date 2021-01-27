import tw from "tailwind.macro";
import styled from "@emotion/styled";
import router from "next/router";
import React from "react";
import Portal from "../Portal";
import { ContextCart } from "../../../pages/_app";
import ModalBackground from "../ModalBackground";

const ErrorModal = (props) => {
  const { errorDispatch } = React.useContext(ContextCart);

  function handleClickBack() {
    router.replace("/");
    errorDispatch({ type: "hide" });
  }

  function handleClickDismiss() {
    if (props.dismissable) {
      errorDispatch({ type: "hide" });
    }
  }

  return (
    <Portal>
      <ModalBackground onClick={handleClickDismiss}>
        <ErrorContent onClick={(ev) => ev.stopPropagation()}>
          {props.title && <Title>{props.title}</Title>}
          {props.text && <Text>{props.text}</Text>}
          <Buttons>
            {props.critical && (
              <Button onClick={handleClickBack}>Закрыть</Button>
            )}
            {props.dismissable && (
              <Button onClick={handleClickDismiss}>Закрыть</Button>
            )}
          </Buttons>
        </ErrorContent>
      </ModalBackground>
    </Portal>
  );
};

const ErrorContent = styled.div`
  ${tw`bg-white max-h-full overflow-y-auto py-12 px-8 rounded text-center mx-2`}
  max-width: 90%;
  width: 480px;
`;

const Title = styled.div`
  ${tw`font-medium text-2xl mb-4`}
`;

const Text = styled.div`
  ${tw`font-light`}
`;

const Button = styled.button`
  ${tw`bg-brand py-3 px-6 border-0 text-base text-white mt-8 rounded`}
`;

const Buttons = styled.div`
  ${tw`flex justify-center`}
`;
export default ErrorModal;
