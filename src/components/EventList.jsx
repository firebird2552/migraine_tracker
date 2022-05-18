import React, { useEffect, useState } from "react";

import { MigraineEvent } from "./MigraineEvent";

export const EventList = ({ migraineData, userId }) => {
  useEffect(() => {
    console.log(migraineData);
  }, [migraineData]);

  return (
    <div className="event-list">
      <div className="list-header">
        <div className="severity">Severity</div>
        <div className="date">Date</div>
        <div className="cause">Cause</div>
        <div className="length">Length</div>
      </div>
      {migraineData !== undefined ? (
        migraineData.events
          .filter((event) => event.userId === userId)
          .map((event) => <MigraineEvent key={event.date} event={event} />)
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
