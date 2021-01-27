import tw from "tailwind.macro";
import styled from "@emotion/styled";
import React from "react";
import { useRouter } from "next/router";
import Loader from "../common/Loader";
import Title from "../common/Title";
import Item from "./Item";
import Popup from "./Popup";
import useTechnics from "./useTechnics";

const Technics = () => {
  const technics = useTechnics();
  const router = useRouter();
  const { technic } = router.query;

  const [selectedItem, setSelectedItem] = React.useState(null);

  React.useEffect(() => {
    if (technic && !selectedItem) {
      const selected = technics?.find((i) => i.id === Number(technic));
      setSelectedItem(selected);
    }
    if (!technic && selectedItem) {
      setSelectedItem(null);
    }
  }, [technic, technics]);

  const handleClickItem = React.useCallback((item) => {
    router.push(`/?technic=${item.id}`);
  });

  const handleCloseItem = React.useCallback(() => {
    router.push(`/`);
  });

  if (!technics) {
    return <Loader />;
  }

  return (
    <TechnicsWrap id="technics">
      <Title>Техника REDMOND за баллы</Title>

      <ItemsRow>
        <Items>
          {technics.map((technic) => (
            <Item
              key={technic.id}
              {...technic}
              onClick={() => handleClickItem(technic)}
            />
          ))}
        </Items>
      </ItemsRow>

      {selectedItem && <Popup id={selectedItem.id} onClose={handleCloseItem} />}
    </TechnicsWrap>
  );
};

const TechnicsWrap = styled.div`
  ${tw`mt-8`}
  @media (max-width: 767px) {
    ${tw`mb-12`}
  }
`;

const ItemsRow = styled.div``;

const Items = styled.div`
  ${tw`flex`}
  @media (min-width: 768px) {
    ${tw`flex-wrap pr-6`}
    & > * {
      ${tw`w-1/3 mb-12 pl-6`}
      box-sizing: border-box;
    }
  }
  @media (max-width: 767px) {
    ${tw`overflow-x-auto`}
    & > * {
      ${tw`w-10/12 pl-6`}
      flex-shrink: 0
    }
    &::after {
      content: "";
      display: block;
      min-width: 1.5rem;
    }
  }
`;

export default Technics;
