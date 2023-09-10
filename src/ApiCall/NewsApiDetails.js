import axios from "axios";
import { toast } from "react-toastify";

export const updateAllNewsDetails = async ({
  mode,
  name,
  subname,
  author,
  title,
  firstDescription,
  description,
  base64Image,
  youtubeLink,
  telegramLink,
}) => {
  try {
    //console.log("First point of connection");
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/api/news-details`,
      {
        mode,
        name,
        subname,
        author,
        title,
        firstDescription,
        description,
        base64Image,
        youtubeLink,
        telegramLink,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json_data = await response.data;
    //console.log(json_data);
    if (json_data.success === true) {
      toast("Article uploaded successfully 😄", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } else {
      toast.error("Some Error Occurred Please Try after Some Time", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: "❗",
      });
      localStorage.clear("ADMIM_LOGIN_RAJA");
    }
  } catch (error) {
    //console.log("Some Bad Happened");
    toast(error, {
      position: "bottom-left",
      icon: "❗",
    });
    console.log(error);
  }
};
