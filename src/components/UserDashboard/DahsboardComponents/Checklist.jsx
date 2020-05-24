import React, { useState } from "react";

const Checklist = ({ items, selectedItems, updateSelectedItems }) => {
  // const handleClick = (index) => {
  //   if (isSelected(index)) {
  //     let oldIndex = selectedItems.indexOf(index);
  //     let newArray = [...selectedItems];
  //     if (oldIndex > -1) {
  //       newArray.splice(oldIndex, 1);
  //       setSelectedItems(newArray);
  //     }
  //     return;
  //   }

  //   setSelectedItems([...selectedItems, index]);
  // };

  const isSelected = (index) => {
    if (selectedItems.indexOf(index) > -1) {
      return true;
    }

    return false;
  };

  return (
    <div className="my-5">
      <h1 className="text-xl">Items to Complete Today</h1>
      <ul>
        {items.map((item, index) => {
          return (
            <li className="flex flex-row items-center my-2">
              <button
                className={`w-4 h-4 bg-white border-solid border-2 mr-2 focus:outline-none ${
                  isSelected(index) ? "bg-red-700" : "bg-white"
                }`}
                onClick={() => updateSelectedItems(index)}
              >
                {" "}
              </button>
              <p>{`${item.name} - ${item.points} points`}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Checklist;
