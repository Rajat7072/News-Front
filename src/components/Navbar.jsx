import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../contextApi/NoteContext";

const Navbar = () => {
  const navigate = useNavigate();
  //const [search_word, setSearch_word] = useState("");
  const { searchAlgo, setSearchAlgo } = useContext(NoteContext);
  const handleChange = (e) => {
    setSearchAlgo(e.target.value);
  };
  const handleClickNav = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
        <div className="container-fluid">
          <div className="navbar-brand" onClick={handleClickNav}>
            <b>
              <i
                style={{
                  fontSize: "25px",
                  color: "white",
                  cursor: "default",
                }}
              >
                Agastya ( अगस्त्य )
              </i>
            </b>
          </div>

          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchAlgo}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
