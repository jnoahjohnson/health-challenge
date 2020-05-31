import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../utils/data";
import View from "./View";

import { getUserPoints } from "../utils/data";

const Profile = () => {
  const [userPoints, setUserPoints] = useState();
  const [loading, setLoading] = useState(true);

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const getPoints = async () => {
      let points = await getUserPoints();
      setUserPoints(points);
      setLoading(false);
    };

    const updateLeaderboard = async () => {
      let serverLeaderboard = await getLeaderboard();
      setLeaderboard(serverLeaderboard);
      console.log(serverLeaderboard);
    };

    getPoints();
    updateLeaderboard();
  }, []);

  console.log("Leaderboard: ", leaderboard);

  return (
    <View title="Leaderboard">
      <div>
        <h1 className="text-xl">
          Your Points -{" "}
          {loading
            ? "Loading..."
            : userPoints === undefined
            ? "No Points"
            : userPoints}{" "}
        </h1>

        <div classNmae="flex flex-col w-64 text-center">
          <div className="flex flex-row justify-center text-center">
            <h1 className="w-1/6 text-xl text-blue">Position</h1>
            <div className="w-10"></div>
            <h1 className="w-1/6 text-xl text-blue">Points</h1>
          </div>
          {loading ? (
            <div className="flex flex-row justify-center text-center">
              Loading...
            </div>
          ) : null}
          {leaderboard === [] && !loading ? (
            <div className="flex flex-row justify-center text-center">
              No Points Recorded Yet
            </div>
          ) : (
            leaderboard.map((item, index) => {
              return (
                <div className="flex flex-row justify-center text-center">
                  <p className="w-1/6 text-lg">{index + 1}</p>
                  <div className="w-10"></div>
                  <p className="w-1/6 text-lg">{item}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </View>
  );
};

export default Profile;
