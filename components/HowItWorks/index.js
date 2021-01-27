import tw from "tailwind.macro";
import styled from "@emotion/styled";
import Item from "./Item";

const HowItWorks = () => (
  <Items>
    <Item
      src={require("./1.jpg")}
      text="У нас есть блюда как для одного
 человека, так и для семьи."
      title="Выбирайте и заказывайте"
    />
    <Item
      src={require("./2.jpg")}
      text="Ингредиенты заранее подготовлены. 
      Доставка бесплатно."
      title="Курьер привезет наборы ингредиентов"
    />
    <Item
      src={require("./3.jpg")}
      text="Вы готовите блюда из наборов по 
рецептам, а фольгированные формы
 сразу ставите в духовку или гриль."
      title="Приготовьте за 15 минут"
    />
    <Item
      src={require("./4.jpg")}
      text="С нашим сервисом у вас останется
 больше времени на свое хобби и семью."
      title="Наслаждайтесь едой!"
    />
    <Item
      src={require("./5.jpg")}
      text="Получайте баллы за каждый заказ. 
С ними вы сможете купить 
технику REDMOND за полцены. "
      title="Копите баллы на технику"
    />
    <Item
      src={require("./6.jpeg")}
      text="Модули и упаковку можно вернуть при повторном заказе для последующей утилизации"
      title="Мы за экологию"
    />
  </Items>
);

const Items = styled.div`
  ${tw`pt-2 flex flex-wrap items-start`}
  & > * {
    ${tw`w-1/3 px-6 mb-8`}
    box-sizing: border-box;
  }
  @media (max-width: 1024px) {
    ${tw``}
  }
  @media (max-width: 767px) {
    & > * {
      ${tw`w-full`}
    }
  }
`;

export default HowItWorks;
