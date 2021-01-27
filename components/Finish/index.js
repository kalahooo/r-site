import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import { useForm } from "react-final-form";
import ModalBackground from "../common/ModalBackground";
import Loader from "../common/Loader";
import { sendAnalytics } from "../../utils/analytics";

const Finish = (props) => {
  const form = useForm();
  React.useEffect(() => {
    form.change("save", true);
    setTimeout(() => {
      sendAnalytics("order-created");
      props.onSubmit();
    }, 200);
  }, []);

  return (
    <ModalBackground onClick={props.onClose}>
      <FinishWrap onClick={(ev) => ev.stopPropagation()}>
        {props.loading ? (
          <LoaderWrap>
            <Loader />
          </LoaderWrap>
        ) : (
          <>
            <Back onClick={props.onClose}>
              <img src={require("./icons8-cancel 1.svg")} />
            </Back>
            <Title>Спасибо за заказ!</Title>
            <Text>{props.message}</Text>

            {props.bonus && (
              <BonusInfo>
                <Divider />
                <Text>
                  <Strong>Баллы за заказ</Strong>
                </Text>
                <TextSm>Будут перечислены после доставки заказа</TextSm>

                <Bonus>
                  <img src={require("./Layer 2.svg")} />
                  <Count>{props.bonus.title}</Count>
                  <TextXs>{props.bonus.subtitle}</TextXs>
                </Bonus>
              </BonusInfo>
            )}
          </>
        )}
      </FinishWrap>
    </ModalBackground>
  );
};

const FinishWrap = styled.div`
  ${tw`bg-white max-h-full overflow-y-auto pt-12 px-6 pb-6 rounded text-center mx-2 my-2 relative`}
  width: 320px;
  max-height: 97%;
`;

const Title = styled.div`
  ${tw`font-Bold text-2xl mb-4`}
`;

const Strong = styled.div`
  ${tw`font-bold mb-2`}
`;
const Text = styled.div`
  ${tw`text-sm`}
  white-space: pre-wrap;
`;

const TextSm = styled.div`
  ${tw`text-sm`}
`;

const TextXs = styled.div`
  ${tw`text-xs`}
`;

const BonusInfo = styled.div`
  ${tw`text-left`}
`;

const Divider = styled.div`
  ${tw`h-1 -mx-4 bg-gray-200 my-8`}
`;

const Bonus = styled.div`
  ${tw`bg-gray-200 p-4 mt-4 rounded flex flex-col justify-center relative`}
  min-height: 100px;
  padding-left: 4.5rem;
  img {
    ${tw`absolute left-0`}
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Count = styled.div`
  ${tw`font-bold text-brand mb-2`}
`;

const LoaderWrap = styled.div`
  ${tw`flex justify-center pb-6`}
`;

const Back = styled.button`
  ${tw`rounded-full border-0 bg-white absolute left-0 top-0 w-12 h-12`}
`;

export default Finish;
