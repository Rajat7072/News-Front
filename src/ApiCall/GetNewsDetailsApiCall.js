import axios from "axios";
import { toast } from "react-toastify";

export const fetchAllNewsDetails = async (props) => {
  const { mode, name, subname, page } = props;
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/api/news/get-details?name=${name}&subname=${subname}&page=${page}&mode=${mode}`
    );
    const json_data = await response.data;
    if (json_data.success === true) {
      return json_data;
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
      window.location.href("/");
    }
  } catch (error) {
    toast(error, {
      position: "bottom-left",
      icon: "❗",
    });
  }
};
