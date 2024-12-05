import {
  EnvironmentOutlined,
  FileSearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style-header.css";
import { deleteToken } from "../../../helper/useCookies";
import { useCookies } from "react-cookie";

function SalesHeader() {
  const [cookies, setCookies, removeCookies] = useCookies(["walletAddress"]); // Sử dụng useCookies để lấy địa chỉ ví từ cookies
  const [openInfor, setOpenInfo] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    console.log(cookies.walletAddress); 
  }, [cookies.walletAddress]);

  const handleMenuHover = () => {
    setOpenInfo(true);
  };

  const handleMenuLeave = () => {
    setOpenInfo(false);
  };

  const logout = () => {
    // Xóa cookies và sessionStorage
    deleteToken();
    removeCookies("walletAddress", { path: "/" }); // Xóa địa chỉ ví khỏi cookies
    sessionStorage.removeItem("walletAddress"); // Xóa thông tin ví khỏi sessionStorage
    window.location.href = "/home"; // Điều hướng về trang chủ
  };

  const walletAddress = cookies.walletAddress || "No wallet connected";
  const idUser = walletAddress !== "No wallet connected" ? walletAddress : null;

  return (
    <div className="header">
      <a
          style={{
            color: "white",
          }}
        >
          {walletAddress} |&nbsp;
        </a>
      <div
        className="content-header-account"
        onMouseEnter={handleMenuHover}
        onMouseLeave={handleMenuLeave}
      >
        
        <Link
          to={idUser === null ? "/login" : "#"}
          className="title-header-account"
        >
          <span className="header-icon">
            <UserOutlined />
          </span>{" "}
          {idUser === null ? "Đăng nhập" : "Thông tin"}
        </Link>
        {openInfor && idUser !== null ? (
          <ul className="dropdown-list">
            <li className="dropdown-item" onClick={() => nav("/home")}>
               Tài khoản của tôi
            </li>
            
            <li className="dropdown-item" onClick={logout}>
             Đăng xuất
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SalesHeader;
