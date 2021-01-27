import styled from "@emotion/styled";
import { css } from "@emotion/core";

const Loader = (props) => (
  <LoaderWrap className={props.className} float={props.float}>
    <div></div>
    <div></div>
  </LoaderWrap>
);

const LoaderWrap = styled.div`
  display: inline-block;
  position: relative;
  width: 24px;
  height: 24px;

  ${(props) =>
    props.float &&
    css`
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `}

  div {
    position: absolute;
    border: 4px solid #ccc;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-of-type(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 12px;
      left: 12px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 24px;
      height: 24px;
      opacity: 0;
    }
  }
`;

export default Loader;
