import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [searchAlgo, setSearchAlgo] = useState("");
  const [toggleMedium, setToggleMedium] = useState("English");
  return (
    <>
      <NoteContext.Provider
        value={{ searchAlgo, setSearchAlgo, toggleMedium, setToggleMedium }}
      >
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
