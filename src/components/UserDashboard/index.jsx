import React, { useState, useEffect } from "react";
import View from "../View";
import CurrentDate from "./DahsboardComponents/CurrentDate";
import UserDatabase from "./DahsboardComponents/UserDatabase";
import { getUser } from "../../utils/auth";
import { saveData, getData } from "../../utils/data";
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
  //Firebase Variables
  const [firebase, setFirebase] = useState();
  const [loadingData, setLoadingData] = useState(true);

  //Initial States
  const user = getUser();
  const [dayOfWeek, setDayOfWeek] = useState();
  const [currentWeek, setCurrentWeek] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { displayName } = user;

  //Initialize Firebase and get data
  useFirebase((fb) => {
    setFirebase(fb);
    const setUserData = async (fb) => {
      let userData = await getData(fb);
      if (userData !== undefined) {
        setSelectedItems(userData.completedTasks);
      }
      setLoadingData(false);
    };
    setUserData(fb);
  }, []);

  //Initialize dashboard
  useEffect(() => {
    let today = new Date();
    setCurrentWeek(getCurrentWeek());
    setDayOfWeek(today.getDay() === 0 ? 6 : today.getDay() - 1);
  }, []);

  //Deal with the data
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
        week: currentWeek,
      });
    }

    setSelectedItems(newArray);
  };

  const currentSelectedItems = () => {
    let arr = [];

    console.log(selectedItems);

    if (selectedItems !== undefined) {
      selectedItems.forEach((item) => {
        if (item.day === dayOfWeek && item.week.join() === currentWeek.join()) {
          arr.push(item.index);
        }
      });
    }

    return arr;
  };

  //Dealing with the week

  const getCurrentWeek = () => {
    let curr = new Date();
    let week = [];

    for (let i = 1; i <= 7; i++) {
      let initialDay = curr.getDay() === 0 ? 7 : curr.getDay();
      let first = curr.getDate() - initialDay + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }

    return week;
  };

  const getPreviousWeek = () => {
    let curr = new Date();
    let week = [];

    for (let i = 1; i <= 7; i++) {
      let initialDay = curr.getDay() === 0 ? 7 : curr.getDay();
      let first = curr.getDate() - initialDay + i;
      let day = new Date(curr.setDate(first));
      day = new Date(day.setDate(day.getDate() - 7)).toISOString().slice(0, 10);
      week.push(day);
    }

    return week;
  };

  const switchWeek = () => {
    if (getCurrentWeek().join() !== currentWeek.join()) {
      setCurrentWeek(getCurrentWeek());
    } else {
      setCurrentWeek(getPreviousWeek());
    }
  };

  const updateDate = (newDate) => {
    setDayOfWeek(newDate);
  };

  return (
    <View title={displayName}>
      <CurrentDate currWeek={currentWeek} switchWeek={switchWeek} />
      <DateSelector currDate={dayOfWeek} selectDate={updateDate} />
      <UserDatabase />
      <Checklist
        items={sampleItems}
        selectedItems={currentSelectedItems()}
        updateSelectedItems={updateSelectedItems}
      />
      <button
        onClick={() => saveData(firebase, selectedItems)}
        className="bg-transparent hover:bg-red-600 text-red-600 mb-5 font-semibold hover:text-white py-1 px-3 border border-red-600 hover:border-transparent rounded"
      >
        Save
      </button>
      {loadingData ? <div>Loading...</div> : null}
      <br></br>
      This is the user dashboard
    </View>
  );
};

export default UserDashboard;
