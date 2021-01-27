import React from "react";
import { Map, Polygon, YMaps } from "react-yandex-maps";

const DeliveryMapLazy = ({ polygons }) => (
  <YMaps>
    <Map
      defaultState={{
        center: [55.731734, 37.610528],
        zoom: 10
      }}
    >
      <Polygon
        geometry={polygons.map((group) =>
          group.map((point) => [point[1], point[0]])
        )}
        options={{
          fillColor: "#00FF00",
          strokeColor: "#0000FF",
          opacity: 0.5,
          strokeWidth: 2,
          strokeStyle: "shortdash"
        }}
      />
    </Map>
  </YMaps>
);

export default DeliveryMapLazy;
