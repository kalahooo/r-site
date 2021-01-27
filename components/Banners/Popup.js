import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import Portal from "../common/Portal";
import ModalBackground from "../common/ModalBackground";
import { axiosInstance } from "../../utils/axios";

const stop = (ev) => ev.stopPropagation();
const fetchCatalog = (id) => axiosInstance.get(`/api/v1/app/banners/${id}`);

const Popup = (props) => {
  const [bannerInfo, setBannerInfo] = React.useState(null);

  React.useEffect(() => {
    fetchCatalog(props.bannerId).then(({ data }) => setBannerInfo(data));
  }, [props.bannerId]);

  if (!bannerInfo) {
    return null;
  }

  return (
    <Portal scrollable={false}>
      <ModalBackground onClick={props.onClose}>
        <PopupContent onClick={stop}>
          <Image src={bannerInfo.imageUrl} />
          <Title>{bannerInfo.title}</Title>
          <Text>{bannerInfo.text}</Text>
        </PopupContent>
      </ModalBackground>
    </Portal>
  );
};

const PopupContent = styled.div`
  ${tw`bg-white max-h-full overflow-y-auto p-12 rounded mx-2`}
  width: 320px;
  max-width: 100%;
  @media (max-width: 767px) {
    ${tw`p-6`}
  }
`;

const Image = styled.img`
  ${tw`mb-8 w-full rounded`}
`;
const Title = styled.div`
  ${tw`text-2xl font-medium mb-8`}
`;

const Text = styled.div`
  ${tw`font-light`}
  white-space: break-spaces;
`;

export default Popup;
