import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";

const ModalBackground = (props) => (
  <ModalBackgroundWrap
    defaultStyle={props.defaultStyle}
    lower={props.lower}
    onClick={props.onClick}
  >
    {props.children}
  </ModalBackgroundWrap>
);

const modalanimation = keyframes`
    from {
        background-color: rgba(0, 0, 0, 0);
    }
    to {
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

const contentanimation = keyframes`
    from {
        opacity: 0.5;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const ModalBackgroundWrap = styled.div`
  ${tw`fixed inset-0 z-50 flex items-center justify-center`}
  animation: 0.15s ease-out ${modalanimation};
  animation-fill-mode: forwards;
  ${(props) => props.lower && tw`z-20`}
  ${(props) =>
    !props.defaultStyle &&
    css`
      & > * {
        animation: 0.15s ease-out ${contentanimation};
        animation-fill-mode: forwards;
        box-sizing: border-box;
      }
    `}
`;

export default ModalBackground;
