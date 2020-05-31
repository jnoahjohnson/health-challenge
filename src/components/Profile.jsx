import React, { useState, useEffect } from "react";
import View from "./View";

import { getUserPoints } from "../utils/data";

const Profile = () => {
  const [userPoints, setUserPoints] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPoints = async () => {
      let points = await getUserPoints();
      setUserPoints(points);
      setLoading(false);
    };

    getPoints();
  });

  return (
    <View title="Leaderboard">
      <div>
        <table className="table-auto text-center">
          <tr>
            <td>Position</td>
            <td>1000</td>
          </tr>
        </table>
        <h1>User Points</h1>
        <p>
          {loading
            ? "Loading..."
            : userPoints === undefined
            ? "No Points"
            : userPoints}
        </p>
      </div>
    </View>
  );
};

export default Profile;
