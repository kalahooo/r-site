import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import Title from "../common/Title/Title";

const Reviews = () => (
  <ReviewsWrap>
    <Title>Отзывы о нас</Title>
  </ReviewsWrap>
);

const ReviewsWrap = styled.div`
  ${tw`px-6 pb-10`}
`;

export default Reviews;
