import React from "react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CurrentDate = ({ currWeek }) => {
  let startOfWeek = `${monthNames[currWeek[0].month]} ${currWeek[0].day}`;
  let endOfWeek = `${monthNames[currWeek[1].month]} ${currWeek[1].day}`;
  return (
    <h2 className="text-xl mb-2 mt-4">
      Week: <span>{`${startOfWeek} - ${endOfWeek}`}</span>
    </h2>
  );
};

export default CurrentDate;
