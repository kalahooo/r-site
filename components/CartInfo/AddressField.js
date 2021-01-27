import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { Field } from "react-final-form";
import React from "react";
import { css } from "@emotion/core";
import { axiosInstance } from "../../utils/axios";
import Loader from "../common/Loader";

const suggestRequest = async (string, location) => {
  const { data } = await axiosInstance.get(
    `/api/v1/app/addresses?str=${string}&location=${location}`
  );
  return data;
};

const AddressField = (props) => {
  const [suggests, setSuggests] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const timeout = React.useRef();

  const handleChangeText = React.useCallback((str) => {
    clearTimeout(timeout.current);
    if (str.length > 3) {
      timeout.current = setTimeout(async () => {
        setLoading(true);
        const data = await suggestRequest(str, 4);
        setSuggests(data);
        setLoading(false);
      }, 400);
    } else {
      setSuggests([]);
    }
  }, []);

  return (
    <Field {...props}>
      {(fieldRenderProps) => (
        <AddressFieldWrap>
          <input
            disabled={props.disabled}
            id="addressfield"
            required
            type="text"
            {...fieldRenderProps.input}
            autoComplete={props.autoComplete}
            onBlur={(ev) => {
              fieldRenderProps.input.onBlur(ev);
              setTimeout(() => setSuggests([]), 300);
            }}
            onChange={(ev) => {
              fieldRenderProps.input.onChange(ev);
              handleChangeText(ev.target.value);
            }}
          />
          <label>{props.title}</label>

          {suggests.length > 0 && (
            <Variants>
              {suggests.map((row) => (
                <Variant
                  key={row.address}
                  onClick={() => {
                    if (!row.ishouse) {
                      fieldRenderProps.input.onChange(row.address + ", ");
                      handleChangeText(row.address);
                    } else {
                      fieldRenderProps.input.onChange(row.address);
                      setSuggests([]);
                    }
                    window.document.querySelector("#addressfield")?.focus();
                  }}
                >
                  {row.address}
                </Variant>
              ))}
            </Variants>
          )}

          {loading && (
            <LoaderWrap>
              <Loader />
            </LoaderWrap>
          )}
        </AddressFieldWrap>
      )}
    </Field>
  );
};

const AddressFieldWrap = styled.div`
  position: relative;
  label {
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 16px;
    transition: all 0.3s ease-in-out;
    ${tw`text-gray-600 font-light`}
  }
  input {
    background: transparent;
    padding: 8px 0 5px 0;
    font-size: 16px;
    -webkit-appearance: none;
    border-radius: 0;
    ${tw`text-black w-full border-0 border-b border-solid border-gray-300 relative outline-none`}
    z-index: 1;
  }
  input:focus {
    outline: none;
    ${tw`border-brand`}
  }
  input:disabled {
    ${tw`border-0`}
  }
  input ~ label {
    top: -10px;
    font-size: 12px;
  }
`;

const Variants = styled.div`
  ${tw`absolute left-0 bg-gray-100`}
  max-height: 240px;
  overflow-x: hidden;
  overflow-y: auto;
  top: 100%;
  z-index: 2;
`;

const Variant = styled.div`
  ${tw`py-3 px-3 text-sm leading-none border-0 border-bottom border-gray-200 border-solid cursor-pointer`}
  &:hover {
    ${tw`bg-gray-400`}
  }
`;

const LoaderWrap = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;
export default AddressField;
