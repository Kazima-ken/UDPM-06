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
import { Color } from "antd/es/color-picker";
function SalesHeader() {
  const idUser = sessionStorage.getItem("walletAddress");
  const [openInfor, setOpenInfo] = useState(false);

  const [cookies] = useCookies(["walletAddress"]);
  const nav = useNavigate();

  useEffect(() => {
    console.log(idUser);
  }, []);
  const handleMenuHover = () => {
    setOpenInfo(true);
  };

  const handleMenuLeave = () => {
    setOpenInfo(false);
  };

  const logout = () => {
    deleteToken();
    sessionStorage.removeItem("walletAddress");
    window.location.href = "/home";
  };

  return (
    <div className="header">
      
      
      <div
        className="content-header-account"
        onMouseEnter={handleMenuHover}
        onMouseLeave={handleMenuLeave}
      >
        <p style={{ color: "white",  display: "flex", justifyContent: "center", alignItems: "center"}}>{cookies.walletAddress || "No wallet connected"}</p>
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
            <li className="dropdown-item" onClick={() => nav("/profile")}>
              Tài khoản của tôi
            </li>
            <li className="dropdown-item" onClick={() => nav("/purchase")}>
              Đơn mua
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
