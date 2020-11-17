import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic
} from "@fortawesome/free-solid-svg-icons";
const Nav = ({activeLibrary,setActiveLibrary}) => {
  const handleToggleLibrary = ()=> {
    setActiveLibrary(!activeLibrary)
  }
  return (
    <div className="nav">
      <h1>Music</h1>
      <div className="toggle-library">
        <button onClick={handleToggleLibrary} className={activeLibrary?"active": ""}>
          <FontAwesomeIcon icon={faMusic} />
          <span>Library</span>
        </button>
      </div>
    </div>
  );
};

export default Nav;
