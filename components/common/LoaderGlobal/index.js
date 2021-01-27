import tw from "tailwind.macro";
import styled from "@emotion/styled";
import Loader from "../Loader";
import Portal from "../Portal";

const LoaderGlobal = () => (
  <Portal scrollable={false}>
    <LoaderGlobalWrap>
      <Loader />
    </LoaderGlobalWrap>
  </Portal>
);

const LoaderGlobalWrap = styled.div`
  ${tw`fixed inset-0 flex items-center justify-center`}
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11;
`;
export default LoaderGlobal;
