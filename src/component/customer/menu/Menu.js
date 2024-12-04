import { useState, useEffect } from "react";
import "./style-menu.css";
import logo from "./../../../assets/images/logo_banner_2.png";
import { deleteToken } from "../../../helper/useCookies";
import { Link, useNavigate } from "react-router-dom";
import { Select, Input, Button, Menu, Badge } from "antd";
import {
  SearchOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  MenuFoldOutlined,
  FileSearchOutlined,
  UserOutlined,
} from "@ant-design/icons";




const { Option } = Select;
function HeaderMenu() {
  const [isOptionVisible, setOptionVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeField, setActiveField] = useState("");
  const idAccount = sessionStorage.getItem("idAccount");
  const [openInfor, setOpenInfo] = useState(false);
  const nav = useNavigate();
 
  const fields = [
    {
      className: "title-menu",
      title: "TRANG CHỦ",
      href: "/home",
    },
    {
      className: "title-menu",
      title: "VỀ CHÚNG TÔI",
      href: "/about-us",
    },
    // {
    //   className: "title-menu",
    //   title: "SALE OFF",
    // },
  ];
  const logout = () => {
    deleteToken();
    sessionStorage.removeItem("idAccount");
    window.location.href = "/home";
  };
  const handleMenuHover = (title) => {
    setOptionVisible(true);
    setActiveField(title);
    setOpenInfo(true);
  };

  const handleMenuLeave = () => {
    setOptionVisible(false);
    setActiveField("");
    setOpenInfo(false);
  };

  const handleHover = (title) => {
    setOptionVisible(true);
    setActiveField(title);
  };

  const handleLeave = () => {
    setOptionVisible(false);
    setActiveField("");
  };

  const onSearch = () => {
    setModal(true);
  };

  const offSearch = () => {
    setModal(false);
  };

  return (
    <div className="menu">
      <div className="menu-content">
        <div className="logo-menu">
          <Link to="/home">
            {" "}
            <img className="logo-img" src={logo} alt="..." />
          </Link>
        </div>
        <div className="space-menu">
          {fields.map((field, index) => {
            return (
              <div
                className={field.className}
                key={index}
                onMouseEnter={() => handleHover(field.title)}
                onMouseLeave={handleLeave}
              >
                <Link to={field.href} className="link-menu">
                  {field.title}
                </Link>
                {field.option &&
                  isOptionVisible &&
                  activeField === field.title && (
                    <Menu className="option-container">
                      {field.option.map((option, optionIndex) => (
                        <Link to="/diem">
                          <div key={optionIndex} className={option.className}>
                            {option.title}
                          </div>
                        </Link>
                      ))}
                    </Menu>
                  )}
              </div>
            );
          })}
        </div>
        <div className="right-menu">
          <div className="search-menu">
            <SearchOutlined
              style={{ fontSize: "20px" }}
              onClick={() => onSearch()}
            />
          </div>
          {/* |
          <div
            className="content-menu-account"
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            <Link
              to={idAccount === null ? "/login" : "#"}
              className="title-menu-account"
            >
              <span className="menu-icon">
                <UserOutlined />
              </span>{" "}
              {idAccount === null ? "Đăng nhập" : "Thông tin"}
            </Link>
            {openInfor && idAccount !== null ? (
              <ul className="dropdown-list-mn">
                <li
                  className="dropdown-item-mn"
                  onClick={() => nav("/profile")}
                >
                  Tài khoản của tôi
                </li>
                <li
                  className="dropdown-item-mn"
                  onClick={() => nav("/purchase")}
                >
                  Đơn mua
                </li>
                <li className="dropdown-item-mn" onClick={logout}>
                  Đăng xuất
                </li>
              </ul>
            ) : (
              ""
            )}
          </div> */}
          <div className="icon-menu-block">
            <MenuFoldOutlined />
          </div>
        </div>
      </div>

      {/* <div> */}

      <div className={`search-panel ${modal === true ? "visible" : "hidden"}`}>
        <div className="header-search">
          <div className="text-search">Tìm kiếm sản phẩm</div>

          <div className="exit-search">
            <LoginOutlined style={{ color: "#ff4400" }} onClick={offSearch} />
          </div>
        </div>

        {/* content */}
        <div>
          <Input className="input-search-products" placeholder="Sản phẩm..." />

          <Select className=" custom-select" style={{ width: "100%" }}>
            <Option>aa</Option>
          </Select>

          <Button className=" button-search">Tìm kiếm</Button>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default HeaderMenu;
