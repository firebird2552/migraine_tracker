import React from "react";

import { EventList } from "./EventList";

export const Main = ({ migraineData }) => {
  return (
    <div className="main-container">
      <EventList migraineData={migraineData} userId={5} />
    </div>
  );
};
