const groupItems = (items) =>
  items.reduce(
    (acc, item) => (acc.includes(item) ? acc : acc.concat(item)),
    []
  );

export default groupItems;
