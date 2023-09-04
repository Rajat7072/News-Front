import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllNewsDetails } from "../ApiCall/GetNewsDetailsApiCall";
import { format } from "date-fns";
import HeaderComponent from "./HeaderComponent";
import SubHeaderComponent from "./SubHeaderComponent";
import Footer from "./Footer";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import NoteContext from "../contextApi/NoteContext";

const Card = () => {
  const cardNoteContext = useContext(NoteContext);
  const { searchAlgo, toggleMedium, setToggleMedium } = cardNoteContext;
  localStorage.clear("ADMIM_LOGIN_RAJA");
  const [loading, setLoading] = useState(true);
  const [dataParams, setDataParams] = useState({
    mode: toggleMedium,
    name: "",
    subname: "",
    page: 1,
  });
  const [responseApi, setResponseApi] = useState([]);
  const handleNext = () => {
    dataParams.page = dataParams.page + 1;
    setDataParams(dataParams);
    thisResponsechange();
  };
  const handlePrevious = () => {
    dataParams.page = dataParams.page - 1;
    setDataParams(dataParams);
    thisResponsechange();
  };
  const thisResponsechange = () => {
    (async function () {
      const result = await fetchAllNewsDetails(dataParams);
      setResponseApi(result);
      setLoading(false);
    })();
  };
  useEffect(() => {
    if (searchAlgo.length === 1) {
      setDataParams({
        ...dataParams,
        name: "",
        subname: "",
        mode: toggleMedium,
      });
    } else {
      setDataParams({
        ...dataParams,
        name: searchAlgo,
        subname: searchAlgo,
        mode: toggleMedium,
      });
    }
    thisResponsechange();
    // eslint-disable-next-line
  }, [searchAlgo, toggleMedium]);

  const navigate = useNavigate();
  const handleClick = (dataOfCard) => {
    navigate("/cardNewsDetails", { state: { dataOfCard } });
  };
  const handleMine = () => {
    const newLanguage = toggleMedium === "English" ? "Hindi" : "English";
    setDataParams({ ...dataParams, mode: newLanguage });
    setToggleMedium(newLanguage);
    toast("आपकी भाषा का परिवर्तन सफलता पूर्वक कर दिया गया है ! 😄", {
      position: "bottom-center",
    });
  };
  return (
    <>
      <HeaderComponent />
      <SubHeaderComponent />
      <div
        style={{
          border: "2px solid black",
          background: "black",
          marginTop: "5px",
        }}
      >
        <button
          className="btn btn-outline-dark"
          style={{ width: "100%", color: "white" }}
          onClick={handleMine}
        >
          हिंदी भाषा में आर्टिकल पढ़ने के लिए यहां क्लिक करें
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="row mediaCardsCss">
            {responseApi.data &&
              responseApi.data.map((element) => (
                <div
                  className="card col-md-3 mx-3 my-3 cardHover"
                  style={{
                    width: "340px",
                    border: "2px solid black",
                    cursor: "pointer",
                  }}
                  key={element._id}
                  onClick={() => handleClick(element)}
                >
                  <div>
                    <h6 style={{ color: "grey" }}>{element.subname} </h6>
                    <h6 style={{ color: "grey" }}>
                      {format(
                        new Date(element.publishedAt),
                        "dd-MMM-yyyy hh:mm a"
                      )}
                    </h6>
                  </div>
                  <img
                    style={{
                      height: "150px",
                      width: "100%",
                    }}
                    src={element.base64Image}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.title}</h5>
                    <p className="card-text">
                      {element.description.split(" ").slice(0, 20).join(" ") +
                        "..."}
                    </p>
                    <Link to={`https://${element.youtubeLink}`} target="_blank">
                      For Detailed Video-YouTube
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          <div className="buttonStyle">
            <button
              disabled={dataParams.page <= 1}
              type="button"
              className="btn btn-success styleButtonLeft"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              disabled={dataParams.page >= responseApi.totalCount / 8}
              type="button"
              className="btn btn-success styleButtonRight"
              onClick={handleNext}
            >
              Next
            </button>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Card;
