import { EnvironmentOutlined, FileSearchOutlined, UserOutlined } from "@ant-design/icons";
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
    console.log(cookies.walletAddress); // In ra địa chỉ ví từ cookies khi component được render
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

  // Kiểm tra xem đã kết nối ví hay chưa, nếu có thì sử dụng walletAddress từ cookies
  const walletAddress = cookies.walletAddress || "No wallet connected";
  const idUser = walletAddress !== "No wallet connected" ? walletAddress : null;

  return (
    <div className="header">
      <div
        className="content-header-account"
        onMouseEnter={handleMenuHover}
        onMouseLeave={handleMenuLeave}
      >
        <p style={{ color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {walletAddress} {/* Hiển thị địa chỉ ví hoặc thông báo chưa kết nối ví */}
        </p>
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
