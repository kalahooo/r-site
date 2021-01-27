import { useRouter } from "next/router";
import React from "react";
import Popup from "../../components/Catalog/Popup";

const ReceiptPage = () => {
  const router = useRouter();
  const orderitem = router.query.id;

  const handleClose = React.useCallback(() => {
    router.push("/");
  }, []);

  if (!orderitem) {
    return null;
  }

  return <Popup onClose={handleClose} orderitem={orderitem} />;
};

ReceiptPage.propTypes = {};

ReceiptPage.defaultProps = {};

export default ReceiptPage;
