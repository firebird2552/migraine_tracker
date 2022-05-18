import React from "react";

export const MigraineEvent = ({ event }) => {
  return (
    <div className="event-container">
      <div className="quick-details">
        <div className="severity">{event.severity}/10</div>
        <div className="event-date">{event.date}</div>
        <div className="event-cause">{event.potential_cause}</div>
        <div className="event-length">{event.length}</div>
      </div>
      <div className="symptoms-container">
        <div className="symptoms-header">Symptoms</div>
        <Symptoms symptoms={event.symptoms} />
      </div>
      <div className="button-bar">
        <div className="edit-button button">Edit</div>
        <div className="delete-button button">Delete</div>
      </div>
    </div>
  );
};

const Symptoms = ({ symptoms }) => {
  return (
    <div className="symptom-list">
      {symptoms.map((symptom, idx) => (
        <div key={idx} className="symptom">
          {symptom}
        </div>
      ))}
    </div>
  );
};
