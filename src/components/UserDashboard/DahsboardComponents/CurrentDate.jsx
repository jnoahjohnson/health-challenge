import React from "react";

const monthNames = [
  "Month",
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

const CurrentDate = ({ currWeek, switchWeek, isCurrWeek }) => {
  const getFullDate = (dayOfWeek) => {
    let currentDay = currWeek[dayOfWeek];
    let month;
    let day;

    //Get month int
    if (currentDay !== undefined) {
      month = monthNames[parseInt(currentDay.substr(5, 2))];
      day = currentDay.substr(8, 2);
    } else {
      month = monthNames[0];
      day = 1;
    }

    return `${month} ${day}`;
  };

  return (
    <>
      <h2 className="text-xl mb-2 mt-4">
        Week: <span>{`${getFullDate(0)} - ${getFullDate(6)}`}</span>
      </h2>
      <button
        className="bg-transparent hover:bg-red-600 text-red-600 mb-5 font-semibold hover:text-white py-1 px-3 border border-red-600 hover:border-transparent rounded focus:outline-none"
        onClick={() => switchWeek()}
      >
        {isCurrWeek ? "Go To Previous Week" : "Go to Current Week"}
      </button>
    </>
  );
};

export default CurrentDate;
