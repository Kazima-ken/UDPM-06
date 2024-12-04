import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const Home = () => {
  const [response, setResponse] = useState(false);
  const navigate = useNavigate(); // Khai báo useNavigate

  const handleSubmit = () => {
    // Điều hướng người dùng đến trang login
    navigate("/login"); // Thay "/login" bằng đường dẫn trang đăng nhập của bạn
  };

  return (
    <div>
    </div>
  );
};

export default Home;
