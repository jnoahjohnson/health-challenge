import React, { useState, useEffect } from "react";
import View from "../View";
import CurrentDate from "./DahsboardComponents/CurrentDate";
import UserDatabase from "./DahsboardComponents/UserDatabase";
import { getUser } from "../../utils/auth";
import { saveData } from "../../utils/data";
import DateSelector from "./DahsboardComponents/DateSelector";
import Checklist from "./DahsboardComponents/Checklist";
import { useFirebase } from "gatsby-plugin-firebase";

const sampleItems = [
  {
    name: "Exercise",
    points: 10,
  },
  {
    name: "Read",
    points: 20,
  },
  {
    name: "Kiss my wife",
    points: 100000,
  },
];

const UserDashboard = () => {
  const [firebase, setFirebase] = useState();

  useFirebase((fb) => {
    setFirebase(fb);
  }, []);

  const user = getUser();
  const [dayOfWeek, setDayOfWeek] = useState();
  const [currentWeek, setCurrentWeek] = useState([
    { day: 1, month: 1 },
    { day: 1, month: 1 },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { displayName } = user;

  const updateSelectedItems = (itemIndex) => {
    let newArray = [...selectedItems];
    let selected = false;
    newArray.forEach((item) => {
      if (item.day === dayOfWeek && item.index === itemIndex) {
        selected = true;
      }
    });

    if (selected === true) {
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].day === dayOfWeek && itemIndex === newArray[i].index) {
          newArray.splice(i, 1);
          break;
        }
      }
    } else {
      newArray.push({
        day: dayOfWeek,
        index: itemIndex,
      });
    }

    setSelectedItems(newArray);
  };

  const currentSelectedItems = () => {
    let arr = [];

    selectedItems.forEach((item) => {
      if (item.day === dayOfWeek) {
        arr.push(item.index);
      }
    });

    return arr;
  };

  useEffect(() => {
    let today = new Date();
    var first = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    setCurrentWeek([
      { day: first, month: 4 },
      { day: last, month: 4 },
    ]);
    setDayOfWeek(today.getDay() - 1);
  }, []);

  const updateDate = (newDate) => {
    setDayOfWeek(newDate);
  };

  return (
    <View title={displayName}>
      <CurrentDate currWeek={currentWeek} />
      <DateSelector currDate={dayOfWeek} selectDate={updateDate} />
      <UserDatabase />
      <Checklist
        items={sampleItems}
        selectedItems={currentSelectedItems()}
        updateSelectedItems={updateSelectedItems}
      />
      <button
        onClick={() => saveData(firebase, selectedItems)}
        class="bg-transparent hover:bg-red-600 text-red-600 mb-5 font-semibold hover:text-white py-1 px-3 border border-red-600 hover:border-transparent rounded"
      >
        Save
      </button>
      <br></br>
      This is the user dashboard
    </View>
  );
};

export default UserDashboard;
