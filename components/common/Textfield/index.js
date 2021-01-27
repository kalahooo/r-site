import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { Field } from "react-final-form";

const Textfield = (props) => (
  <Field {...props}>
    {(fieldRenderProps) => (
      <TextFieldWrap>
        <input
          disabled={props.disabled}
          required
          type="text"
          {...fieldRenderProps.input}
          autoComplete={props.autoComplete}
        />
        <label>{props.title}</label>
      </TextFieldWrap>
    )}
  </Field>
);

const TextFieldWrap = styled.div`
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
  /* input:valid ~ label,
  input:focus ~ label {
    top: -10px;
    font-size: 12px;
  } */
  input ~ label {
    top: -10px;
    font-size: 12px;
  }
`;

export default Textfield;
