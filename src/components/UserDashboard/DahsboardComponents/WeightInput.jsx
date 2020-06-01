import React, { useState, useEffect } from "react";

const WeightInput = ({ submit, weightData, currentWeek }) => {
  const [input, setInput] = useState("");
  const [edited, setEdited] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const getInitialWeight = () => {
    if (weightData === undefined || weightData === null) {
      return "";
    }

    let initialWeight = weightData.filter((item) => {
      return item.week.join() === currentWeek.join();
    });

    if (initialWeight[0] === undefined) {
      return "";
    }

    return initialWeight[0].weight;
  };

  useEffect(() => {
    if (!edited) {
      setInput(getInitialWeight());
    }
  });

  return (
    <div className="mt-6">
      <h1 className="text-mahogany text-3xl">
        Submit Weight Points for the Week
      </h1>
      <p className="mb-2 mt-1">
        5 points for maintaining lowest/highest weight. <br></br>10 points for
        every pound lost/gained toward your goal.
      </p>
      <div className="flex flex-row items-center">
        <p className="text-xl text-gray-600 font-sans">Total Points: </p>
        <input
          className="text-center border-solid font-sans border-blue border rounded p-2 w-10 text-lg mx-3"
          type="text"
          value={input}
          onChange={(e) => {
            setEdited(true);
            setInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            submit(input);
            setEdited(false);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 1500);
          }}
          className="bg-transparent hover:bg-blue text-blue font-semibold hover:text-white py-1 px-3 border border-blue font-sans hover:border-transparent rounded"
        >
          Save
        </button>
        <p
          className={`ml-3 text-gray-600 text-sm font-sans transition duration-500 ${
            !isSaved ? "opacity-0" : "opacity-100"
          }`}
        >
          Saved
        </p>
      </div>
    </div>
  );
};

export default WeightInput;
