import React, { useState, useEffect } from "react";
import View from "../View";
import CurrentDate from "./DahsboardComponents/CurrentDate";
import { getUser } from "../../utils/auth";
import {
  saveData,
  getUserCompleted,
  getUserWeightData,
  getTasks,
  saveWeight,
} from "../../utils/data";
import DateSelector from "./DahsboardComponents/DateSelector";
import Checklist from "./DahsboardComponents/Checklist";
import WeightInput from "./DahsboardComponents/WeightInput.jsx";

const UserDashboard = () => {
  //Initial States
  const user = getUser();
  const [dayOfWeek, setDayOfWeek] = useState();
  const [currentWeek, setCurrentWeek] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tasksData, setTasksData] = useState();
  const [weightData, setWeightData] = useState();

  const [weightInit, setWeightInit] = useState("");

  const [isCurrWeek, setIsCurrWeek] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  //Firebase User Name
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

    //Get local data if any exists
    let localCompleted = window.localStorage.getItem("completed");
    let localTasks = window.localStorage.getItem("tasks");
    let localWeightData = window.localStorage.getItem("weight");

    localCompleted = parseData(localCompleted);
    localTasks = parseData(localTasks);
    localWeightData = parseData(localWeightData);

    const getTaskList = async () => {
      let tasksData = await getTasks();
      if (tasksData !== undefined) {
        setTasksData(tasksData);
      }
    };

    const getCompletedTasks = async () => {
      let userCompletedTasks = await getUserCompleted();
      setSelectedItems(userCompletedTasks);
    };

    const getWeightData = async () => {
      let userWeightData = await getUserWeightData();
      setWeightData(userWeightData);
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

    if (localWeightData === undefined || localWeightData === null) {
      getWeightData();
    } else {
      setWeightData(localWeightData);
    }

    setLoadingData(false);
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

    if (selectedItems !== undefined || selectedItems !== null) {
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

    if (curr.getDay() === 0) {
      curr.setDate(curr.getDate() - 6);
    } else {
      curr.setDate(curr.getDate() - curr.getDay() + 1);
    }

    const firstDate = curr.getDate();

    for (let i = 0; i < 7; i++) {
      curr.setDate(firstDate + i);
      week.push(curr.toISOString().slice(0, 10));
    }

    return week;
  };

  const getPreviousWeek = () => {
    let curr = new Date();
    let week = [];

    if (curr.getDay() === 0) {
      curr.setDate(curr.getDate() - 12);
    } else {
      curr.setDate(curr.getDate() - curr.getDay() - 6);
    }

    const firstDate = curr.getDate();

    for (let i = 0; i < 7; i++) {
      curr.setDate(firstDate + i);
      week.push(curr.toISOString().slice(0, 10));
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

  //Weight
  const submitWeight = (weight) => {
    let newWeightData = [];

    if (weightData !== undefined || weightData !== null) {
      weightData.forEach((item) => {
        if (item.week.join() !== currentWeek.join()) {
          newWeightData.push(item);
        }
      });
    }

    newWeightData.push({
      weight: weight,
      week: currentWeek,
    });

    setWeightData(newWeightData);
    saveWeight(newWeightData);
  };

  return (
    <View title={displayName}>
      <CurrentDate
        currWeek={currentWeek}
        switchWeek={switchWeek}
        isCurrWeek={isCurrWeek}
      />
      <DateSelector currDate={dayOfWeek} selectDate={updateDate} />
      {loadingData ? <div>Loading...</div> : null}
      {dayOfWeek === 6 ? (
        <WeightInput
          submit={submitWeight}
          weightData={weightData}
          currentWeek={currentWeek}
        />
      ) : null}
      <Checklist
        items={tasksData}
        selectedItems={currentSelectedItems()}
        updateSelectedItems={updateSelectedItems}
      />
      <button
        onClick={() => saveData(selectedItems)}
        className="bg-transparent hover:bg-blue text-blue mb-5 font-semibold hover:text-white py-1 px-3 border border-blue font-sans hover:border-transparent rounded"
      >
        Save
      </button>
    </View>
  );
};

export default UserDashboard;
