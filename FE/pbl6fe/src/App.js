import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import Login from './pages/auth/login.jsx'
import './styles/index.css';
import Register from "./pages/auth/register";
import Test from "./pages/auth/test";
import CsrfTokenFetcher from "./pages/auth/ CsrfTokenFetcher";
import ListHotel from "./pages/home/list_hotel/ListHotel";
import DetailHotel from "./pages/home/detail_hotel/DetailHotel";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="token" element={<CsrfTokenFetcher urlServer="http://127.0.0.1:8000/" />} />
          <Route path="register" element={<Register />} />
          <Route path="listhotel" element={<ListHotel />} />
          <Route path="detailhotel/:slug" element={<DetailHotel />} />
          <Route path="contact" element={<div>Contact</div>} />
          <Route path="*" element={<div>1</div>} />
      </Routes>
    </BrowserRouter>
    // <div>
    //   <CsrfTokenFetcher/>
    // </div>
  );
}

