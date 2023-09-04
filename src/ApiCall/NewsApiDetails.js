import axios from "axios";
import { toast } from "react-toastify";

export const updateAllNewsDetails = async ({
  name,
  subname,
  author,
  title,
  description,
  base64Image,
  youtubeLink,
  telegramLink,
}) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/api/news-details`,
      {
        name,
        subname,
        author,
        title,
        description,
        base64Image,
        youtubeLink,
        telegramLink,
      },
      {
        headers: {
          getContentType: "application/json",
        },
      }
    );
    const json_data = await response.data;
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
    toast(error, {
      position: "bottom-left",
      icon: "❗",
    });
  }
};
