import styled from "@emotion/styled";
import tw from "tailwind.macro";
import Textfield from "../common/Textfield";
import Selectfield from "../common/Selectfield";
import AddressField from "./AddressField";

const AddressGroup = () => (
  <>
    <Selectfield name="address.city" parse={Number} title="Город">
      <option value="4">Москва</option>
    </Selectfield>
    <br />
    <AddressField
      autoComplete="address"
      name="address.address"
      title="Улица и дом"
    />
    <br />
    <Flex>
      <Textfield autoComplete="flat" name="address.flat" title="Кв/офис" />
      <Textfield autoComplete="porch" name="address.porch" title="Подъезд" />
      <Textfield autoComplete="floor" name="address.floor" title="Этаж" />
    </Flex>
  </>
);

const Flex = styled.div`
  ${tw`flex -mx-2`}
  & > * {
    ${tw`mx-2 flex-1`}
  }
`;

export default AddressGroup;
