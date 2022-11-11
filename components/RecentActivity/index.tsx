import React, { useState } from "react";

export default function RecentActivity() {
  const [activityList, setActivityList] = useState([]);

  return (
    <div>
      <div>最近动态</div>
      <div>
        <ul>{}</ul>
      </div>
    </div>
  );
}
