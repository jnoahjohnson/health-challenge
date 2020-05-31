import React from "react";

const Checklist = ({ items, selectedItems, updateSelectedItems }) => {
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
                <li className="flex flex-row items-center my-4">
                  <button
                    className={`w-5 h-5 rounded-full bg-white border-solid border-2 mr-2 focus:outline-none ${
                      isSelected(index) ? "bg-blue" : "bg-white"
                    }`}
                    onClick={() => updateSelectedItems(index)}
                  >
                    {" "}
                  </button>
                  <p className="text-xl font-sans">{`${item.name} - ${item.points} points`}</p>
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default Checklist;
