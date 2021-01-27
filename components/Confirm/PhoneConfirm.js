import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import formatStringByPattern from "format-string-by-pattern";
import Textfield from "../common/Textfield";

const MASK = "+7 (999) 999-9999";

const Confirm = (props) => {
  React.useEffect(() => {
    const input = window.document.querySelector("[name=phone]");
    input.focus();
  }, []);

  return (
    <PhoneConfirmWrap>
      <Title>Вход или регистрация</Title>

      <Textfield
        name="phone"
        parse={parsePhone}
        title="По номеру телефона"
        validate={(v) => (v?.length >= MASK.length ? undefined : "err")}
      />
      <Button disabled={props.loading || props.invalid}>
        Получить код в СМС
      </Button>
    </PhoneConfirmWrap>
  );
};

const PhoneConfirmWrap = styled.div`
  ${tw``}
`;

const Title = styled.div`
  ${tw`font-medium text-lg mb-12`}
`;

const Button = styled.button`
  ${tw`py-4 mt-10 w-full text-white text-base border-0 bg-brand rounded whitespace-no-wrap`}
  &:disabled {
    ${tw`opacity-25 cursor-not-allowed`}
  }
`;

const parsePhone = (value) => {
  const trimed = value.replace(/\D/g, "");

  if (trimed === "8" || trimed === "7") {
    return "+7";
  }

  if (trimed.length === 1 && trimed !== 7) {
    return `+7 (${trimed}`;
  }

  return formatStringByPattern(MASK)(trimed);
};

export default Confirm;
