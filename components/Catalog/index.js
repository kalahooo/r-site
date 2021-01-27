import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ContextCart } from "../../pages/_app";
import { sendAnalytics } from "../../utils/analytics";
import Title from "../common/Title";
import Popup from "./Popup";
import Item from "./Item";
import useCatalog from "./useCatalog";

const Catalog = () => {
  const catalog = useCatalog();
  const router = useRouter();
  const { product } = router.query;

  const { cart, cartDispatch } = React.useContext(ContextCart);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const allCategories = catalog ? catalog.categories : [];
  const allItems = catalog ? catalog.items : [];

  React.useEffect(() => {
    if (product && !selectedItem) {
      const selected = catalog?.items?.find((i) => i.id === Number(product));
      setSelectedItem(selected);
    }
    if (!product && selectedItem) {
      setSelectedItem(null);
    }
  }, [product, catalog]);

  const handleClickItem = React.useCallback((item, ev) => {
    ev.preventDefault();
    router.push(`/?product=${item.id}`);
  });

  const handleCloseItem = React.useCallback(() => {
    router.push(`/`);
  });

  const handleAddItem = React.useCallback((item) => {
    cartDispatch({ type: "add", payload: item });
    sendAnalytics("item-added");
  }, []);

  const handleSetCountItem = React.useCallback((item, count) => {
    cartDispatch({ type: "setcount", payload: { item, count } });
    sendAnalytics("item-added");
  }, []);

  return (
    <CatalogWrap id="catalog">
      <Title>Меню</Title>

      {allCategories.length > 0 &&
        catalog.categories.map((category) => (
          <ItemsRow key={category.id}>
            <CategoryName>{category.titlelong}</CategoryName>

            <Items>
              {allItems
                .filter((item) => item.category === category.id)
                .map((item) => (
                  <Item
                    {...item}
                    count={cart.filter((i) => i === item).length}
                    key={item.id}
                    onAdd={() => handleAddItem(item)}
                    onPreview={(ev) => handleClickItem(item, ev)}
                    onRemove={() =>
                      cartDispatch({ type: "remove", payload: item })
                    }
                    onSetCount={(count) => handleSetCountItem(item, count)}
                  />
                ))}
            </Items>
          </ItemsRow>
        ))}

      {selectedItem && (
        <Popup
          count={cart.filter((i) => i === selectedItem).length}
          id={selectedItem.id}
          onAdd={() => handleAddItem(selectedItem)}
          onClose={handleCloseItem}
          onRemove={() =>
            cartDispatch({ type: "remove", payload: selectedItem })
          }
          onSetCount={(count) => handleSetCountItem(selectedItem, count)}
        />
      )}
    </CatalogWrap>
  );
};

const CatalogWrap = styled.div`
  ${tw`mb-4`}
`;

const ItemsRow = styled.div``;

const CategoryName = styled.div`
  ${tw`text-2xl text-center font-medium mb-8`}
`;

const Items = styled.div`
  ${tw`flex`}
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

export default Catalog;
