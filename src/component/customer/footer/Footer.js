import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import ReactPlayer from "react-player";
import "./style-footer.css";

function Footer() {
  return (
    <div className="footer">
      <Row gutter={40} justify="space-between" className="footer-top">
        <Col span={4} className="footer-branding">
          <p className="footer-description">
            Chúng tôi mang đến cho người dùng nhữ trải nghiệm tốt nhất.
          </p>
        </Col>
        <Col span={4} className="footer-quick-links">
          <h4 className="footer-heading">Danh sách chi nhánh</h4>
          <ul>
            <li>
              <FaMapMarkerAlt /> <Link>Địa chỉ 1 : CD FPT Trịnh Văn Bô</Link>
            </li>
            <li>
              <FaMapMarkerAlt /> <Link>Địa chỉ 2 : CD FPT Kiều Mai</Link>
            </li>
          </ul>
        </Col>
        <Col span={4} className="footer-quick-links">
          <h4 className="footer-heading">Khám Phá</h4>
          <ul>
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/about">Về Chúng Tôi</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/policyy">Chính Sách</Link>
            </li>
            <li>
              <Link to="/contact">Liên Hệ</Link>
            </li>
          </ul>
        </Col>

        <Col span={4} className="footer-contact">
          <h4 className="footer-heading">Liên Hệ</h4>
          <ul>
            <li>
              Hotline: <a href="tel:0906880960">0384.999.999</a>
            </li>
            <li>
              Email: <a href="mailto:sd-32@gmail.com">udpm-06@gmail.com</a>
            </li>
            <li>Địa chỉ: 123 Đường ABC, TP. Hồ Chí Minh</li>
          </ul>
        </Col>

        <Col span={4} className="footer-social">
          <h4 className="footer-heading">Kết Nối Với Chúng Tôi</h4>
          <div className="social-icons">
            <Link
              to="https://facebook.com"
              className="social-icon"
              style={{ paddingRight: "5px" }}
            >
              <FacebookOutlined />
            </Link>
            <Link
              to="https://twitter.com"
              className="social-icon"
              style={{ paddingRight: "5px" }}
            >
              <TwitterOutlined />
            </Link>
            <Link
              to="https://youtube.com"
              className="social-icon"
              style={{ paddingRight: "5px" }}
            >
              <YoutubeOutlined />
            </Link>
            <Link
              to="https://instagram.com"
              className="social-icon"
              style={{ paddingRight: "5px" }}
            >
              <InstagramOutlined />
            </Link>
          </div>
        </Col>
      </Row>

      <Row justify="center" className="footer-bottom-info">
        <Col span={20}>
          <div className="footer-copy">
            <p>
              © 2024 <span className="highlight">UDPM-06</span>. All Rights
              Reserved.
            </p>
            <p className="footer-contact-info">
              Hotline: 0384.999.999 (9h-18h từ Thứ 2 đến Thứ 6)
            </p>
            <p>Email: udpm-06@gmail.com</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
