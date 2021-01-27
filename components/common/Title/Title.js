import styled from "@emotion/styled";
import tw from "tailwind.macro";

const TitleWrap = styled.div`
  ${tw`text-3xl text-center font-medium my-4 mb-8`}
`;

const Title = ({ children }) => <TitleWrap>{children}</TitleWrap>;

export default Title;
