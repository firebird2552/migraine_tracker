import React, { useEffect, useState } from "react";

import { AddMigraine } from "./components/AddMigraine";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import "./styles/main.scss";
import { data } from "./api/data";
import axios from "axios";

export default function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [migraineData, setMigraineData] = useState(data);

  useEffect(() => {
    axios.get("https://leuoxk.sse.codesandbox.io/").then((req, res) => {
      console.log(res);
    });
  }, []);

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="App">
      <Header openModal={openModal} />
      <Main migraineData={migraineData} />
      <AddMigraine
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        migraineData={migraineData}
        setMigraineData={setMigraineData}
      />
    </div>
  );
}
