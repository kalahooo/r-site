import styled from "@emotion/styled";
import React from "react";
import tw from "tailwind.macro";
import ModalBackground from "../common/ModalBackground";
import Portal from "../common/Portal";

const StopModal = () => {
  const [opened, setOpened] = React.useState(false);

  React.useEffect(() => {
    setOpened(true);
  }, []);

  const handleClickDismiss = React.useCallback(() => {
    setOpened(false);
  }, []);

  return (
    opened && (
      <Portal>
        <ModalBackground onClick={handleClickDismiss}>
          <ModalContent onClick={(ev) => ev.stopPropagation()}>
            <Text>
              <p>Друзья!</p>{" "}
              <p>
                Сообщаем, что мы временно приостановили оформление новых
                заказов. Мы берём паузу, чтобы стать лучше, удобнее и вкуснее и
                сообщим когда запустимся вновь. Спасибо что остаётесь с нами,
                надеемся, что Вам было вкусно и удобно. Приносим извинения за
                доставленные неудобства в связи с остановкой сервиса.
              </p>
              <p>
                И ещё, накопленные баллы никуда не пропадут, и вы сможете
                воспользоваться ими как только мы возобновим работу в
                Петербурге. Оставайтесь на связи! До скорого!
              </p>
            </Text>
            <Buttons>
              <Button onClick={handleClickDismiss}>Закрыть</Button>
            </Buttons>
          </ModalContent>
        </ModalBackground>
      </Portal>
    )
  );
};

const ModalContent = styled.div`
  ${tw`bg-white max-h-full overflow-y-auto py-12 px-8 rounded text-center mx-2`}
  max-width: 90%;
  width: 480px;
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

export default StopModal;
