import { LazyLoadImage } from "react-lazy-load-image-component";
import { GOOGLEPLAY } from "../../../constants/urls";

const GoogleplayLink = ({ onClick }) => (
  <a href={GOOGLEPLAY} onClick={onClick} rel="noreferrer" target="_blank">
    <LazyLoadImage
      alt="Приложение Redmond.еда Google Play"
      height="48"
      src={require("./image 31.png")}
      width="152"
    />
  </a>
);

GoogleplayLink.defaultProps = {
  onClick: () => {}
};

export default GoogleplayLink;
