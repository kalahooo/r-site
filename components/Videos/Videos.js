import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Title from "../common/Title/Title";
import ModalBackground from "../common/ModalBackground";
import Item from "./Item";

const data = [
  {
    id: "3"
  },
  {
    id: "1"
  },
  {
    id: "2"
  }
];

const Video3 = () => (
  <iframe
    allowFullScreen
    frameBorder="0"
    height="360"
    src="https://vk.com/video_ext.php?oid=565002504&id=456239033&hash=ced64787ae8e9e2b"
    width="640"
  />
);

const Video1 = () => (
  <iframe
    allowFullScreen
    frameBorder="0"
    height="360"
    src="https://vk.com/video_ext.php?oid=-187400392&id=456239037&hash=07b7f876d127317e"
    width="640"
  />
);

const Video2 = () => (
  <iframe
    allowFullScreen
    frameBorder="0"
    height="400"
    src="https://vk.com/video_ext.php?oid=-187400392&id=456239029&hash=ba16fd1fa545f2dd"
    width="760"
  />
);

const Videos = () => {
  const [opened, setOpened] = React.useState();

  const handleClose = React.useCallback(() => {
    setOpened(undefined);
  }, []);

  return (
    <VideosWrap>
      <Title>Видео о нас</Title>
      <Items>
        {data.map((row) => (
          <LazyLoadImage
            key={row.id}
            onClick={() => setOpened(row.id)}
            src={require(`./video${row.id}.jpg`)}
            srcSet={`${require(`./video${row.id}@2x.jpg`)} 2x`}
          />
        ))}
      </Items>

      {opened != undefined && (
        <ModalBackground onClick={handleClose}>
          <Item onClose={handleClose}>
            {opened === "2" && <Video1 />}
            {opened === "1" && <Video2 />}
            {opened === "3" && <Video3 />}
          </Item>
        </ModalBackground>
      )}
    </VideosWrap>
  );
};

const VideosWrap = styled.div`
  ${tw``}
`;

const Items = styled.div`
  ${tw`flex`}
  & > * {
    ${tw`rounded cursor-pointer`}
  }
  @media (min-width: 768px) {
    ${tw`flex-wrap pr-6`}
    & > * {
      ${tw`w-1/3 pl-6 mb-12`}
      box-sizing: border-box;
    }
  }
  @media (max-width: 767px) {
    ${tw`overflow-x-auto pb-6`}
    & > * {
      ${tw`w-10/12 ml-6`}
      flex-shrink: 0
    }
    &::after {
      content: "";
      display: block;
      min-width: 1.5rem;
    }
  }
`;

export default Videos;
