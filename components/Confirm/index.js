import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import { Form } from "react-final-form";
import Portal from "../common/Portal";
import ModalBackground from "../common/ModalBackground";
import { axiosInstance } from "../../utils/axios";
import storage from "../../utils/storage";
import PhoneConfirm from "./PhoneConfirm";
import CodeConfirm from "./CodeConfirm";

const requestVerificationCode = (data) =>
  axiosInstance.post("/api/v1/app/sendverificationcode", data);

const requestSignin = (data) => axiosInstance.post("/api/v1/app/signin", data);

const Confirm = (props) => {
  const [confirmOpened, setConfirmOpened] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onSubmitPhone = React.useCallback((data) => {
    props.setLoading(true);
    requestVerificationCode(data).then(() => {
      props.setLoading(false);
      setConfirmOpened(true);
    });
  });

  const onSubmitCode = React.useCallback((data) => {
    props.setLoading(true);
    setError(null);
    requestSignin(data)
      .then(({ data }) => {
        props.setLoading(false);
        setConfirmOpened(true);
        storage.permanent.setValue("token", data.token);
        props.onSubmit();
      })
      .catch((err) => {
        setError(err.response?.data?.error);
      });
  });

  return (
    <Portal>
      <ModalBackground onClick={props.onClose}>
        <ConfirmWrap onClick={(ev) => ev.stopPropagation()}>
          <Form onSubmit={onSubmitPhone}>
            {(formRenderProps) => (
              <form autoComplete="off" onSubmit={formRenderProps.handleSubmit}>
                {confirmOpened ? (
                  <CodeConfirm
                    error={error}
                    onSubmit={onSubmitCode}
                    values={formRenderProps.values}
                  />
                ) : (
                  <PhoneConfirm
                    invalid={formRenderProps.invalid}
                    loading={props.loading}
                  />
                )}
              </form>
            )}
          </Form>
          {error && <Error>{error}</Error>}
        </ConfirmWrap>
      </ModalBackground>
    </Portal>
  );
};

const ConfirmWrap = styled.div`
  ${tw`bg-white max-h-full overflow-y-auto py-12 px-8 rounded text-center mx-2`}
  min-width: 320px;
`;

const Error = styled.div`
  ${tw`text-brand mt-8`}
`;

export default Confirm;
