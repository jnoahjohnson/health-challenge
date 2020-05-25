import React, { useState, useEffect } from "react";
import View from "../View";
import CurrentDate from "./DahsboardComponents/CurrentDate";
import { getUser } from "../../utils/auth";
import { saveData, getData, getTasks } from "../../utils/data";
import DateSelector from "./DahsboardComponents/DateSelector";
import Checklist from "./DahsboardComponents/Checklist";

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
  //Initial States
  const user = getUser();
  const [dayOfWeek, setDayOfWeek] = useState();
  const [currentWeek, setCurrentWeek] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tasksData, setTasksData] = useState();
  const [isCurrWeek, setIsCurrWeek] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const { displayName } = user;

  const parseData = (data) => {
    if (data !== null && data !== undefined) {
      return JSON.parse(data);
    }

    return data;
  };

  //Initialize dashboard
  useEffect(() => {
    let today = new Date();
    setCurrentWeek(getCurrentWeek());
    setDayOfWeek(today.getDay() === 0 ? 6 : today.getDay() - 1);
    let localCompleted = window.localStorage.getItem("completed");
    let localTasks = window.localStorage.getItem("tasks");

    localCompleted = parseData(localCompleted);
    localTasks = parseData(localTasks);

    const getTaskList = async () => {
      let tasksData = await getTasks();
      if (tasksData !== undefined) {
        setTasksData(tasksData);
      }
    };

    const getCompletedTasks = async () => {
      let userData = await getData();
      if (userData !== undefined) {
        setSelectedItems(userData.completedTasks);
      }
    };

    if (localTasks === undefined || localTasks === null) {
      getTaskList();
    } else {
      setTasksData(localTasks);
    }

    if (localCompleted === undefined || localCompleted === null) {
      getCompletedTasks();
    } else {
      setSelectedItems(localCompleted);
    }

    setLoadingData(false);
  }, []);

  //Deal with the data
  const updateSelectedItems = (itemIndex) => {
    let newArray = [];

    if (selectedItems !== undefined) {
      newArray = [...selectedItems];
    }

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
      setIsCurrWeek(true);
    } else {
      setCurrentWeek(getPreviousWeek());
      setIsCurrWeek(false);
    }
  };

  const updateDate = (newDate) => {
    setDayOfWeek(newDate);
  };

  return (
    <View title={displayName}>
      <CurrentDate
        currWeek={currentWeek}
        switchWeek={switchWeek}
        isCurrWeek={isCurrWeek}
      />
      <DateSelector currDate={dayOfWeek} selectDate={updateDate} />
      <Checklist
        items={tasksData}
        selectedItems={currentSelectedItems()}
        updateSelectedItems={updateSelectedItems}
      />
      <button
        onClick={() => saveData(selectedItems)}
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
