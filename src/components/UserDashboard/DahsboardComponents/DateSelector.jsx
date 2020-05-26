import React from "react";
import { DaysWrapper, DayOfWeek } from "./styles";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DateSelector = ({ currDate, selectDate }) => {
  return (
    <>
      <DaysWrapper>
        {daysOfWeek.map((item, index) => {
          return (
            <DayOfWeek
              key={item}
              className={`rounded-full h-16 w-16 flex items-center justify-center border-solid border-2 hover:bg-blue hover:text-white m-1 focus:outline-none
              ${
                index === currDate
                  ? "border-blue text-blue"
                  : "bg-white text-black"
              } `}
              onClick={() => selectDate(index)}
            >
              {item[0]}
            </DayOfWeek>
          );
        })}
      </DaysWrapper>
    </>
  );
};

export default DateSelector;
