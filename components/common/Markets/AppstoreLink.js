import { LazyLoadImage } from "react-lazy-load-image-component";
import { APPSTORE } from "../../../constants/urls";

const AppstoreLink = ({ onClick }) => (
  <a href={APPSTORE} onClick={onClick} rel="noreferrer" target="_blank">
    <LazyLoadImage
      alt="Приложение Redmond.еда AppStore"
      height="48"
      src={require("./image 32.png")}
      width="152"
    />
  </a>
);

AppstoreLink.defaultProps = {
  onClick: () => {}
};

export default AppstoreLink;
