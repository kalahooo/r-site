import styled from "@emotion/styled";
import tw from "tailwind.macro";
import { format } from "date-fns";
import locale from "date-fns/locale/ru";
import { useField } from "react-final-form";
import React from "react";
import Selectfield from "../common/Selectfield";

const parseDate = (v) => new Date(v);

const DateGroup = (props) => {
  const field = useField("date");

  const handleChangeDay = React.useCallback((day) => {
    const currentOption = props.date?.options?.find((opt) => opt.date === day);
    const minTime = currentOption?.min;
    field.input.onChange(minTime);
  }, []);

  return (
    <Flex>
      <Selectfield name="day" onChange={handleChangeDay} title="Дата доставки">
        {props.date?.options && makeOptionsForDay(props.date.options)}
      </Selectfield>
      <Selectfield name="date" parse={parseDate} title="Время доставки">
        {props.date?.options &&
          makeOptionsForTime(
            props.date.options.find((opt) => opt.date === props.day)
          )}
      </Selectfield>
    </Flex>
  );
};

const Flex = styled.div`
  ${tw`flex -mx-2`}
  & > * {
    ${tw`mx-2 flex-1`}
  }
`;

function makeOptionsForDay(options) {
  return options.map((row) => (
    <option key={row.date} value={row.date}>
      {format(new Date(row.date), "d MMMM, iiiiii", { locale })}
    </option>
  ));
}

function makeOptionsForTime(row) {
  if (!row) {
    return null;
  }
  return row.intervals.map((interval) => (
    <option key={interval.title} value={new Date(interval.value)}>
      {interval.title}
    </option>
  ));
}

export default DateGroup;
