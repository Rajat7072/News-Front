import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateAllNewsDetails } from "../ApiCall/NewsApiDetails";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const NewsDetailsEnter = () => {
  const [content, SetContent] = useState("");
  const editor = useRef(null);
  const navigate = useNavigate();
  const logPassCheck = localStorage.getItem("ADMIM_LOGIN_RAJA");
  useEffect(() => {
    if (
      logPassCheck === undefined ||
      logPassCheck !== "Admin7985247262adityabharbhwaj@gmail.com"
    ) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [logPassCheck]);
  const [publish, setPublish] = useState({
    mode: "",
    name: "",
    subname: "",
    author: "",
    title: "",
    firstDescription: "",
    description: "",
    base64Image: "",
    youtubeLink: "",
    telegramLink: "",
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let fileSize = file.size / 1e6;
    const fileLength = file.type.split("/").length - 1;
    const fileFormat = file.type.split("/")[fileLength];
    if (fileSize > 5) {
      toast("Max file size supported is 5MB", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: "😅",
      });
    } else if (!["jpg", "jpeg", "png"].includes(fileFormat)) {
      toast("Only Image Formats are supported ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: "😅",
      });
    } else {
      reader.onloadend = () => {
        setPublish({ ...publish, base64Image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (e) => {
    setPublish({ ...publish, [e.target.name]: e.target.value });
    // console.log(publish);
  };
  const handleBlur = (e) => {
    setPublish({ ...publish, description: content });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      publish.author.length === 0 ||
      publish.base64Image.length === 0 ||
      publish.description.length === 0 ||
      publish.firstDescription === 0 ||
      publish.mode.length === 0 ||
      publish.name.length === 0 ||
      publish.subname.length === 0 ||
      publish.youtubeLink.length === 0 ||
      publish.telegramLink.length === 0 ||
      publish.title.length === 0
    ) {
      toast("Please Fill All The Feilds", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: "😅",
      });
    } else if (
      publish.firstDescription.length < 100 ||
      publish.firstDescription.length > 120
    ) {
      toast("First Description should be in between 100 to 120 letters", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: "😅",
      });
    } else {
      //console.log(publish);
      updateAllNewsDetails(publish);
    }
  };
  return (
    <div className="step2">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <h2>
          <b>A leap to fill the world with Knowledge !</b>{" "}
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            <h6>Mode</h6>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputTopic"
            aria-describedby="emailHelp"
            name="mode"
            value={publish.mode}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            <h6>Topic</h6>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputTopic"
            aria-describedby="emailHelp"
            name="name"
            value={publish.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <h6>SubTopic</h6>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputsubTopic"
            name="subname"
            value={publish.subname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <h6>Title</h6>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputsubTitle"
            name="title"
            value={publish.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <h6>First Description</h6>
          </label>
          <textarea
            type="text"
            className="form-control"
            id="exampleInputsubFirstDesc"
            maxLength={120}
            rows={5}
            name="firstDescription"
            value={publish.firstDescription}
            onChange={handleChange}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            {`${publish.firstDescription.length}/120`}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <h6>Image</h6>
          </label>
          <input
            type="file"
            className="form-control"
            id="exampleInputsubImage"
            name="base64Image"
            onChange={handleImage}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <h6>Image Display</h6>
          </label>
          <img
            className="form-control"
            style={{
              display: "flex",
              width: "100%",
              height: "60vh",
              border: "2px solid black",
            }}
            src={publish.base64Image}
            alt="Upload Here..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <h6>Description</h6>
          </label>
          {/* <textarea
            type="text"
            className="form-control"
            id="exampleInputsubDesc"
            maxLength={5000}
            rows={12}
            name="description"
            value={publish.description}
            onChange={handleChange}
          /> */}
          <JoditEditor
            ref={editor}
            value={content}
            name="description"
            onChange={(newContent) => SetContent(newContent)}
            onBlur={handleBlur}
          />
          {/* <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            {`${publish.description.length}/5000`}
          </div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <h6>YouTube Link</h6>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputsubYouTubeLink"
            name="youtubeLink"
            value={publish.youtubeLink}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <h6>Telegram Link</h6>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputsubTelegramLink"
            name="telegramLink"
            value={publish.telegramLink}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <h6>Published By</h6>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputsubAuthor"
            name="author"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewsDetailsEnter;
