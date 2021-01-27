import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import declOfNum from "../../utils/declOfNum";
import CountSelect from "./CountSelect";

const portions_str = ["порция", "порции", "порций"];
const pieces_str = ["штука", "штуки", "штук"];

const Control = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(
    (ev) => {
      if (!open) {
        ev.stopPropagation();
        setOpen(true);
      }
    },
    [open]
  );

  const handleClose = React.useCallback(() => {
    setOpen(false);
  });

  const handleSelectCount = React.useCallback((count) => {
    handleClose();
    props.onSetCount(count);
  });

  return (
    <>
      <ControlWrap flat={props.flat} onClick={handleOpen}>
        {props.count > 0 ? (
          <Count>
            {props.count}{" "}
            {props.unit === "PORTION"
              ? declOfNum(props.count, portions_str)
              : declOfNum(props.count, pieces_str)}
          </Count>
        ) : (
          <>
            <Count>+</Count>
            <img
              alt="Добавить в корзину"
              height="20"
              src={require("./cart.svg")}
              width="20"
            />
          </>
        )}
        {open && (
          <CountSelect
            handleSelectCount={handleSelectCount}
            onClose={handleClose}
            unit={props.unit}
            variants={props.variants}
            zeroVisible={props.count > 0}
          />
        )}
      </ControlWrap>
    </>
  );
};

const ControlWrap = styled.div`
  ${tw`bg-brand rounded-full px-4 flex items-center justify-center border-2 border-solid border-white cursor-pointer`}
  ${(props) =>
    props.flat &&
    tw`bg-transparent p-0 border-dashed border-black rounded-none border-l-0 border-r-0 border-t-0 mt-2`}
  button {
    ${(props) => props.flat && tw`h-auto text-gray-800 p-0`}
  }
`;

const Count = styled.button`
  ${tw`text-base font-light text-white whitespace-no-wrap rounded-full border-none h-10 p-0 outline-none bg-transparent`}
  & + img {
    ${tw`ml-2`}
  }
`;

const Empty = styled.button`
  ${tw`w-10 h-10 p-0 border-0 bg-transparent outline-none`}
`;

export const ControlSkeleton = styled(ControlWrap)`
  ${tw`bg-gray-200`}
`;
export const EmptySkeleton = styled(Empty)`
  ${tw`bg-gray-200 rounded-full`}
  background-image: none;
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

export default React.memo(Control);
