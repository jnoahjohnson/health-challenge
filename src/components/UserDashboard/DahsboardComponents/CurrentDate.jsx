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
    <div className="flex flex-row justify-start items-center items-center mt-1 mb-4">
      <h2 className="text-2xl mr-6">
        Week: <span>{`${getFullDate(0)} - ${getFullDate(6)}`}</span>
      </h2>

      <button
        className="bg-transparent text-sm hover:bg-mahogany text-mahogany font-semibold hover:text-white py-1 px-3 border border-mahogany font-sans hover:border-transparent rounded focus:outline-none"
        onClick={() => switchWeek()}
      >
        {isCurrWeek ? "Go To Previous Week" : "Go to Current Week"}
      </button>
    </div>
  );
};

export default CurrentDate;
