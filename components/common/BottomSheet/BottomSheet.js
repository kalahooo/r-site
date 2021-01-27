import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";
import Portal from "../Portal";
import ModalBackground from "../ModalBackground";

const stop = (ev) => ev.stopPropagation();

const BottomSheet = ({ children, onClose, y, x }) => {
  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    window.document.addEventListener("click", handleClose);
    // eslint-disable-next-line no-undef
    window.document.body.classList.add("mobilemodal");
    return () => {
      // eslint-disable-next-line no-undef
      let bottomsheets = window.document.querySelectorAll(".bottomsheet");
      [].forEach.call(bottomsheets, (bottomsheet) => {
        bottomsheet.classList.remove("opened");
        bottomsheet.classList.add("hiding");
      });

      // eslint-disable-next-line no-undef
      window.document.body.classList.remove("mobilemodal");
      // eslint-disable-next-line no-undef
      window.document.removeEventListener("click", handleClose);
    };
  }, []);

  const handleClose = React.useCallback(() => {
    setTimeout(onClose, 150);

    // eslint-disable-next-line no-undef
    let bottomsheets = window.document.querySelectorAll(".bottomsheet");
    [].forEach.call(bottomsheets, (bottomsheet) => {
      bottomsheet.classList.remove("opened");
      bottomsheet.classList.add("hiding");
    });

    // eslint-disable-next-line no-undef
    window.document.body.classList.remove("mobilemodal");
    // eslint-disable-next-line no-undef
    window.document.removeEventListener("click", handleClose);
  }, []);

  return (
    <>
      <DesktopContainer>
        <BottomSheetWrap
          className="bottomsheet opened"
          onClick={stop}
          x={x}
          y={y}
        >
          {children}
        </BottomSheetWrap>
      </DesktopContainer>
      <Portal scrollable>
        <MobileContainer>
          <ModalBackground defaultStyle onClick={handleClose}>
            <BottomSheetWrap className="bottomsheet opened" onClick={stop}>
              <Header />
              {children}
            </BottomSheetWrap>
          </ModalBackground>
        </MobileContainer>
      </Portal>
    </>
  );
};

const bottomSheetSelectPopupContentAnimation = keyframes`
  from {
    transform: translateY(120%);
  }
  to {
    transform: translateY(0);
  }
`;

const bottomSheetDeselectPopupContentAnimation = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(120%);
  }
`;

const desctopBottomSheetSelectPopupContentAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BottomSheetWrap = styled.div`
  @media (min-width: 768px) {
    ${tw`bg-white py-2 rounded absolute z-40`}
    min-width: 240px;
    ${(props) =>
      props.y === "bottom"
        ? css`
            top: 100%;
            right: 0;
            margin-top: 10px;
          `
        : css`
            bottom: 10%;
            right: 100%;
            margin-right: 10px;
          `}

    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.16);
  }

  @media (max-width: 767px) {
    ${tw`bg-white fixed bottom-0 left-0 w-full pb-4`}
  }

  &.opened {
    @media (min-width: 768px) {
      animation: 0.15s ease-out ${desctopBottomSheetSelectPopupContentAnimation}
        forwards;
    }
    @media (max-width: 767px) {
      animation: 0.15s ease-out ${bottomSheetSelectPopupContentAnimation}
        forwards;
    }
  }
  &.hiding {
    @media (min-width: 768px) {
      opacity: 0;
    }
    @media (max-width: 767px) {
      animation: 0.15s ease-out ${bottomSheetDeselectPopupContentAnimation}
        forwards;
    }
  }
`;

const Header = styled.div`
  ${tw`hidden`}
  @media(max-width: 767px) {
    ${tw`block bg-white absolute left-0 w-full pt-4`}
    box-sizing: border-box;
    bottom: 100%;
    border-radius: 1rem 1rem 0 0;
  }
`;

const MobileContainer = styled.div`
  @media (min-width: 768px) {
    ${tw`hidden`}
  }
`;

const DesktopContainer = styled.div`
  @media (max-width: 767px) {
    ${tw`hidden`}
  }
`;

export default BottomSheet;
