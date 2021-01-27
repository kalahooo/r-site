import smoothscroll from "smoothscroll";

const scrollToId = (id) => {
  const el = window.document.querySelector(`#${id}`);
  if (el) {
    smoothscroll(el);
  }
};

export default scrollToId;
