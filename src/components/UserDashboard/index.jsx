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
  handleVersion,
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

  const [isSaved, setIsSaved] = useState(false);

  const [isCurrWeek, setIsCurrWeek] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  //Firebase User Name
  const { displayName } = user;

  const parseData = async (data) => {
    let parsedData = "";
    if (data === null || data === "undefined" || data === undefined) {
      return parsedData;
    }
    parsedData = await JSON.parse(data);
    return parsedData;
  };

  //Initialize dashboard
  useEffect(() => {
    let today = new Date();
    setCurrentWeek(getCurrentWeek());
    setDayOfWeek(today.getDay() === 0 ? 6 : today.getDay() - 1);

    let localCompleted;
    let localTasks;
    let localWeightData;

    //Get local data if any exists

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

    const getLocalData = async () => {
      await handleVersion();
      localCompleted = window.localStorage.getItem("completed");
      localTasks = window.localStorage.getItem("tasks");
      localWeightData = window.localStorage.getItem("weight");

      localCompleted = await parseData(localCompleted);
      localTasks = await parseData(localTasks);
      localWeightData = await parseData(localWeightData);

      if (localTasks === "") {
        getTaskList();
      } else {
        setTasksData(localTasks);
      }

      if (localCompleted === "") {
        getCompletedTasks();
      } else {
        setSelectedItems(localCompleted);
      }

      if (localWeightData === "") {
        getWeightData();
      } else {
        setWeightData(localWeightData);
      }

      return "Done Parsing";
    };

    getLocalData();

    setLoadingData(false);
  }, []);

  //Deal with the data
  const updateSelectedItems = (itemIndex) => {
    let newArray = [];
    if (
      selectedItems !== undefined &&
      selectedItems !== null &&
      selectedItems !== []
    ) {
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

    if (
      selectedItems !== undefined &&
      selectedItems !== null &&
      selectedItems !== [] &&
      selectedItems.length > 0
    ) {
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
      curr.setDate(curr.getDate() - 7);
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
      curr.setDate(curr.getDate() - 14);
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

    if (weightData !== undefined && weightData !== null && weightData !== "") {
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
      <div className="flex flex-row items-end">
        <button
          onClick={() => {
            saveData(selectedItems);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 1500);
          }}
          className="bg-transparent hover:bg-blue mr-2 text-blue font-semibold hover:text-white py-1 px-3 border border-blue font-sans hover:border-transparent rounded"
        >
          Save
        </button>
        <p
          className={`text-gray-600 text-sm font-sans transition duration-500 ${
            !isSaved ? "opacity-0" : "opacity-100"
          }`}
        >
          Saved
        </p>
      </div>
    </View>
  );
};

export default UserDashboard;
