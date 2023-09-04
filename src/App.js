import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import CardDetails from "./components/CardDetails";
import NoteState from "./contextApi/NoteState";
import PageNotFound from "./components/PageNotFound";
import NewsDetailsEnter from "./components/NewsDetailsEnter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <NoteState>
          <Navbar />
          <Routes>
            <Route index element={<Card />}></Route>
            <Route path="/cardNewsDetails" element={<CardDetails />}></Route>
            <Route path="/adminLogin" element={<NewsDetailsEnter />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </NoteState>
      </BrowserRouter>
    </>
  );
}

export default App;
