import React from "react";

const Checklist = ({ items, selectedItems, updateSelectedItems, week }) => {
  const isSelected = (index) => {
    if (selectedItems.indexOf(index) > -1) {
      return true;
    }

    return false;
  };

  return (
    <div className="my-6">
      <h1 className="text-3xl mb-4 text-mahogany">Items to Complete Today</h1>
      <ul>
        {items === undefined
          ? null
          : items.map((item, index) => {
              return (
                <li className="flex fflex-row items-center my-4">
                  <button
                    className={`w-5 h-5 rounded-full bg-white border-solid border-2 mr-4 focus:outline-none ${
                      isSelected(index) ? "bg-blue" : "bg-white"
                    }`}
                    onClick={() => updateSelectedItems(index, week)}
                  >
                    {" "}
                  </button>
                  <div className="flex-1 flex md:flex-row flex-col md:items-end items-startflex-wrap">
                    <p
                      className={`text-xl font-sans ${
                        item.doubleWeek === week ? "font-bold" : "font-normal"
                      }`}
                    >
                      {item.name}
                      {item.doubleWeek === week ? " (Double Points)" : ""}
                    </p>
                    <p className="text-sm font-sans text-gray-600 ml-2 pb-px">
                      {item.points} Points
                      {item.description !== undefined
                        ? `. ${item.description}.`
                        : null}
                    </p>
                  </div>
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default Checklist;
