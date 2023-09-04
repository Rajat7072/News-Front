import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";

const CardDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dataOfCard } = location.state || {};

  useEffect(() => {
    if (location.state === null || location.state === undefined) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <>
      {dataOfCard && (
        <div>
          <Modal dataOfCard={dataOfCard} />
          <div className="cardDetailHeader">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                height: "7vh",
              }}
            >
              <h1>
                <i>{dataOfCard.subname}</i>
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                height: "5vh",
              }}
            >
              <h3>{dataOfCard.title}</h3>
            </div>
            <div style={{ border: "1px solid black" }}></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid black",
                height: "40vh",
              }}
            >
              <img
                className="imageStyle"
                src={dataOfCard.base64Image}
                alt="news..."
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              />
            </div>
            <div
              style={{
                display: "flex",
                margin: "0 10px 0 10px",
              }}
            >
              {dataOfCard.description}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginRight: "5px",
                height: "8vh",
                position: "fixed",
                bottom: 0,
                width: "100%",
                background: "black",
                color: "white",
                paddingTop: "5px",
                paddingRight: "10px",
              }}
            >
              <h6>
                <i>Published By: {dataOfCard.author}</i>{" "}
              </h6>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardDetails;
