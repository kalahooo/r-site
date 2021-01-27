import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { Field, Form } from "react-final-form";
import React from "react";

const CodeConfirm = (props) => {
  React.useEffect(() => {
    const input = window.document.querySelector("[name=code]");
    input.focus();
  }, []);

  const onSubmitPhone = React.useCallback((code) => {
    if (code.length >= 4) {
      const input = window.document.querySelector("[name=code]");
      input.blur();
      props.onSubmit({ ...props.values, code });
    }
  });

  return (
    <PhoneConfirmWrap>
      <Title>Введите код из СМС</Title>

      <Form onSubmit={onSubmitPhone}>
        {() => (
          <form autoComplete="off">
            <Field name="code" parse={(v) => v.slice(0, 4)}>
              {(fieldRenderProps) => (
                <>
                  <CodeInput
                    {...fieldRenderProps.input}
                    autocomplete="one-time-code"
                    inputmode="numeric"
                    onChange={(ev) => {
                      fieldRenderProps.input.onChange(ev);
                      onSubmitPhone(ev.target.value);
                    }}
                    onFocus={(ev) => {
                      fieldRenderProps.input.onFocus(ev);
                      fieldRenderProps.input.onChange("");
                    }}
                    pattern="[0-9]*"
                  />
                  <Dash />
                </>
              )}
            </Field>
          </form>
        )}
      </Form>
    </PhoneConfirmWrap>
  );
};

const PhoneConfirmWrap = styled.div`
  ${tw``}
`;

const Title = styled.div`
  ${tw`font-medium text-lg mb-8`}
`;

const CodeInput = styled.input`
  ${tw`bg-white border-0`}
  letter-spacing: 15px;
  width: 150px;
  margin-right: -25px;
  padding-left: 2px;
  font-family: monospace;
  font-size: 32px;
  overflow: hidden;
`;

const Dash = styled.div`
  ${tw`mx-auto`}
  height: 3px;
  width: 130px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23EC3463' stroke-width='8' stroke-dasharray='18%2c 16' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
`;

export default CodeConfirm;
