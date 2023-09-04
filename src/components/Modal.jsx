import React from "react";

const Modal = (props) => {
  const { dataOfCard } = props;
  const { name, base64Image } = dataOfCard;
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{
                background: "#0e717c",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "85vh",
                  border: "2px solid black",
                  borderRadius: "5px",
                }}
                src={base64Image}
                alt="Something went wrong..."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
