import smoothscroll from "smoothscroll";

const animatedScroll = (ev) => {
  ev.preventDefault();
  const href = ev.target.getAttribute("href");
  const el = window.document.querySelector(href);
  if (el) {
    smoothscroll(el);
  }
};

export default animatedScroll;
