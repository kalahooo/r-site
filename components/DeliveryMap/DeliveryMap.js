import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { Suspense } from "react";
import tw from "tailwind.macro";
import ModalBackground from "../common/ModalBackground";
import Portal from "../common/Portal";
import { axiosInstance } from "../../utils/axios";

const DeliveryMapLazy = React.lazy(() => import("./DeliveryMapLazy"));

const DeliveryMap = () => {
  const router = useRouter();
  const { showmap } = router.query;

  const [polygons, setPolygons] = React.useState([]);

  React.useEffect(() => {
    if (showmap && polygons.length === 0) {
      axiosInstance.get("/api/v1/app/polygons").then(({ data }) => {
        setPolygons(data.map((d) => d.points));
      });
    }
  }, [showmap, polygons]);

  const onDismiss = React.useCallback(() => {
    router.push("/");
  }, []);

  if (!showmap || !polygons.length) {
    return null;
  }

  return (
    <Portal>
      <ModalBackground onClick={onDismiss}>
        <ModalContent onClick={(ev) => ev.stopPropagation()}>
          <Suspense fallback={<div>Загрузка...</div>}>
            <DeliveryMapLazy polygons={polygons} />
          </Suspense>
        </ModalContent>
      </ModalBackground>
    </Portal>
  );
};

const ModalContent = styled.div`
  ${tw`m-a p-2 flex justify-center items-center bg-white`}
  max-width: 90%;
  max-height: 80%;
  width: 600px;
  height: 600px;
  & > * {
    width: 100% !important;
    height: 100% !important;
  }
`;

export default DeliveryMap;
