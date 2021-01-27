import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";

const Tab = (props) => {
  const handleClick = React.useCallback(() => {
    props.onClick(props.id);
  });

  return (
    <TabWrap active={props.active} onClick={handleClick}>
      {props.title}
    </TabWrap>
  );
};

const TabWrap = styled.div`
  ${tw`mx-1 p-2 text-gray-600 cursor-pointer select-none`}
  ${(props) => props.active && tw`text-white bg-gray-700 rounded`}
`;

export const TabSkeleton = styled.div`
  ${tw`mx-2 my-2 p-2 w-12 bg-gray-200 rounded`}
`;

export default Tab;
