import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";

import "../styles/AddMigraine.scss";
import { writeFile } from "../scripts/UpdateData";

Modal.setAppElement("#root");
export const AddMigraine = ({
  modalIsOpen,
  setIsOpen,
  migraineData,
  setMigraineData
}) => {
  const [date, setDate] = useState(new Date());
  const [severity, setSeverity] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [cause, setCause] = useState("");
  const [length, setLength] = useState("");
  const [medications, setMedications] = useState([]);
  const [symptom, setSymptom] = useState("");
  const [toDelete, setToDelete] = useState([]);
  const [side_effects, setSideEffects] = useState([]);
  const [errors, setErrors] = useState({
    severity: false,
    cause: false,
    date: false,
    length: false,
    symptoms: false
  });

  useEffect(() => {}, []);

  const ModalStyle = {
    content: {
      top: "5%",
      left: "5%",
      right: "5%",
      bottom: "5%",
      boxShadow: "-5px 5px 10px 9px rgba(59,59,59,0.8)"
    }
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    const symptomInput = document.getElementById("symptoms-input");
    symptomInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("addSymptomButton").click();
      }
    });
  };

  function closeModal() {
    setDate(new Date());
    setSeverity("");
    setSymptoms([]);
    setCause("");
    setLength("");
    setMedications([]);
    setSymptom("");
    setToDelete([]);
    setIsOpen(false);
    setErrors({
      severity: false,
      cause: false,
      date: false,
      length: false,
      symptoms: false
    });
  }

  const handleAddSymptom = (e) => {
    const symptomInput = document.getElementById("symptoms-input");

    if (symptomInput.value === "") {
      symptomInput.focus();
      return;
    }
    setSymptom("");
    let tempSymptoms = [...symptoms];
    tempSymptoms.push(symptom);
    symptomInput.focus();
    setSymptoms(tempSymptoms);
    setErrors({ ...errors, symptoms: false });
  };

  const handleDeleteSymptom = () => {
    let tempSymptoms = [...symptoms];
    for (let i = 0; i < toDelete.length; i++) {
      const index = tempSymptoms.indexOf(toDelete[i]);
      if (index !== -1) {
        tempSymptoms.splice(index, 1);
      }
    }
    setToDelete([]);
    setSymptoms(tempSymptoms);
  };

  const handleSaveEvent = () => {
    let tempErrors = {
      severity: false,
      cause: false,
      date: false,
      length: false,
      symptoms: false
    };
    let foundErrors = false;
    if (severity === "") {
      tempErrors.severity = true;
      foundErrors = true;
    }
    if (cause === "") {
      tempErrors.cause = true;
      foundErrors = true;
    }
    if (length === "") {
      tempErrors["length"] = true;
      foundErrors = true;
    }
    if (symptoms.length === 0) {
      tempErrors.symptoms = true;
      foundErrors = true;
    }
    if (date > new Date()) {
      tempErrors.date = true;
      foundErrors = true;
    }
    setErrors(tempErrors);
    if (foundErrors) return;
    const newEvent = {
      userId: 5,
      date: date.toDateString(),
      length: length,
      severity: severity,
      symptoms: symptoms,
      medications: medications,
      side_effect: side_effects
    };
    let events = [...migraineData.events];
    events.push(newEvent);
    let tempData = { ...migraineData, events };
    setMigraineData(tempData);
    writeFile(tempData);
    closeModal();
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={ModalStyle}
    >
      <div className="add-migraine-page">
        <div className="header">Add a Migraine Event</div>
        <div className="error-box">
          {errors.severity ? (
            <div className="error">Severity is required</div>
          ) : null}
          {errors.date ? (
            <div className="error">Date can not be in the future</div>
          ) : null}
          {errors.cause ? <div className="error">Cause is required</div> : null}
          {errors["length"] ? (
            <div className="error">Length is required</div>
          ) : null}
          {errors.symptoms ? (
            <div className="error">At least one symptom is required</div>
          ) : null}
        </div>
        <div className="container severity-container">
          <div className="label">Severity (1- 10):</div>
          <input
            type="text"
            name="severity-input"
            id="severity-input"
            value={severity}
            placeholder="5"
            className={errors["severity"] ? "input error" : "input"}
            onChange={(e) => {
              const value = e.target.value;
              if (value !== "") {
                if (value < 1 || value > 10) {
                  alert(
                    "The value entered is outside the range 1 - 10. Please try again"
                  );
                  return;
                }
              }
              setSeverity(e.target.value);
              setErrors({ ...errors, severity: false });
            }}
          />
        </div>
        <div className="container date-container">
          <div className="label">Date:</div>
          <DatePicker
            selected={date}
            type="date"
            name="date-input"
            id="date-input"
            className={errors["date"] ? "input error" : "input"}
            onChange={(e) => {
              const date = new Date(e);
              setDate(date);

              setErrors({ ...errors, date: false });
            }}
          />
        </div>
        <div className="container cause-container">
          <div className="label" htmlFor="cause-input">
            Cause:
          </div>
          <input
            type="text"
            name="cause-input"
            id="cause-input"
            placeholder="Stress"
            value={cause}
            className={errors["cause"] ? "input error" : "input"}
            onChange={(e) => {
              setCause(e.target.value);
              setErrors({ ...errors, cause: false });
            }}
          />
        </div>
        <div className="container length-container">
          <div className="label">Length:</div>
          <input
            type="text"
            name="length-input"
            id="length-input"
            placeholder="2 hrs"
            value={length}
            className={errors["length"] ? "input error" : "input"}
            onChange={(e) => {
              setLength(e.target.value);
              setErrors({ ...errors, length: false });
            }}
          />
        </div>
        <div className="container symptoms-container">
          <div className="label">Symptom:</div>
          <input
            type="text"
            name="symptoms-input"
            id="symptoms-input"
            className={errors["symptoms"] ? "input error" : "input"}
            placeholder="Neausea"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
          />
        </div>
        <div className="button-container">
          <div className="button-bar">
            <div
              id="addSymptomButton"
              className="button add-syptom"
              onClick={() => handleAddSymptom()}
            >
              Add Symptom
            </div>
          </div>
        </div>
        {symptoms.length !== 0 ? (
          <div className="symptoms-list-container">
            <div className="symptom-list-header">Symptoms</div>
            <div className="symptom-list">
              {symptoms.map((symptom, index) => {
                return (
                  <div key={`${index}-${symptom}`} className="symptom">
                    <input
                      type="checkbox"
                      name={`symptom-checkbox-${symptom}`}
                      id={`symptom-checkbox-${symptom}`}
                      className={`checkbox input symptom-checkbox-${symptom}`}
                      onChange={(e) => {
                        let tempToDelete = [...toDelete];
                        if (e.target.checked) {
                          tempToDelete.push(e.target.labels[0].innerHTML);
                        } else {
                          const index = tempToDelete.indexOf(
                            e.target.labels[0].innerHTML
                          );
                          if (index !== -1) {
                            tempToDelete.splice(index, 1);
                          }
                        }
                        setToDelete(tempToDelete);
                      }}
                    />
                    <label htmlFor={`symptom-checkbox-${symptom}`}>
                      {symptom}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        {toDelete.length !== 0 ? (
          <div className="button-container">
            <div className="button-bar">
              <div
                className="button delete-syptom"
                onClick={() => handleDeleteSymptom()}
              >
                Delete Checked
              </div>
            </div>
          </div>
        ) : null}
        {medications.length !== 0 ? (
          <div className="medication-container">
            <div className="label">Medications:</div>
          </div>
        ) : null}
        <div className="button-container">
          <div className="button-bar">
            <div className="button save" onClick={() => handleSaveEvent()}>
              Save
            </div>
            <div className="button close" onClick={() => closeModal()}>
              Close
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
