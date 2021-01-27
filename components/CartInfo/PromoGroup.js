import styled from "@emotion/styled";
import tw from "tailwind.macro";
import { useField, useFormState } from "react-final-form";
import React from "react";
import Textfield from "../common/Textfield";
import { ContextCart } from "../../pages/_app";
import { axiosInstance } from "../../utils/axios";
import groupItems from "../../utils/groupItems";

const checkPromo = (data) =>
  axiosInstance.post("/api/v2/app/order/checkcode", data);

const PromoGroup = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { errorDispatch, cart, order } = React.useContext(ContextCart);
  const formState = useFormState();
  const field = useField("promo");
  const fieldtmp = useField("promotmp");
  const isAccepted = !!order.promo;

  const check = React.useCallback(() => {
    setIsLoading(true);

    const items = groupItems(cart).map((item) => ({
      id: item.id,
      count: cart.filter((i) => i === item).length
    }));

    checkPromo({ code: formState.values.promotmp, items })
      .then(() => {
        field.input.onChange(formState.values.promotmp);
      })
      .catch((e) => {
        const text = e.response?.data?.error;
        if (text) {
          errorDispatch({
            type: "show",
            payload: { title: "Ошибка", text, dismissable: true }
          });
        }
        if (field.input.value) {
          field.input.onChange(undefined);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const handleCancel = React.useCallback(() => {
    field.input.onChange(undefined);
  }, []);

  return (
    <Flex>
      <Textfield disabled={isAccepted} name="promotmp" title="Промокод" />
      {isAccepted ? (
        <Button onClick={handleCancel} type="button">
          Отменить
        </Button>
      ) : (
        <Button
          disabled={fieldtmp.input.value.length === 0 || isLoading}
          onClick={check}
          type="button"
        >
          {isLoading ? "Проверка" : "Проверить"}
        </Button>
      )}
    </Flex>
  );
};

const Flex = styled.div`
  ${tw`flex`}
  input {
    ${tw`w-48`}
    @media (max-width: 767px) {
      width: 10rem;
    }
    @media (max-width: 424px) {
      &::placeholder {
        ${tw`text-sm`}
      }
    }
  }
`;

const Button = styled.button`
  ${tw`ml-8 border-0 rounded bg-brand text-white py-1 px-2 outline-none whitespace-no-wrap`}
  &:disabled {
    ${tw`opacity-50 cursor-not-allowed`}
  }
  @media (max-width: 767px) {
    ${tw`ml-4`}
  }
`;

export default PromoGroup;
