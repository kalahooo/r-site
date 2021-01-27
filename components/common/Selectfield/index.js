import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { Field } from "react-final-form";

const Selectfield = (props) => (
  <Field name={props.name} parse={props.parse}>
    {(fieldRenderProps) => (
      <SelectFieldWrap>
        <select
          {...fieldRenderProps.input}
          onChange={(ev) => {
            fieldRenderProps.input.onChange(ev);
            props.onChange?.(ev.target.value);
          }}
        >
          {props.children}
        </select>
        <label>{props.title}</label>
      </SelectFieldWrap>
    )}
  </Field>
);

const SelectFieldWrap = styled.div`
  position: relative;
  label {
    position: absolute;
    left: 0px;
    transition: all 0.3s ease-in-out;
    ${tw`text-gray-600 font-light`}
    top: -10px;
    font-size: 12px;
  }
  select {
    background: transparent;
    padding: 8px 0 5px 0;
    font-size: 16px;
    -webkit-appearance: none;
    border-radius: 0;
    ${tw`text-black w-full border-0 border-b border-solid border-gray-300 relative outline-none`}
    z-index: 1;
  }
  select:active {
    outline: none;
    ${tw`border-brand`}
  }
`;

export default Selectfield;
