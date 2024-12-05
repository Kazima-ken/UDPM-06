import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style-home.css";

const Home = () => {
  const [nfts, setNfts] = useState([]);
  const apikey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMjAxOGM0OS1jOGUxLTRhODQtODdjYy1kODA4N2Y1YzAwMmQiLCJzdWIiOiJhNzIxZTQyYy0xYTFhLTRmMzUtODQ0Zi0xYThlOGY1YjdjYTAiLCJpYXQiOjE3MzMzMjg2MTh9.1zfRygZl_Nbfeoy0R7xofTlBZPhYXHA5Ewdp3tF00NA`;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const response = await fetch("https://api.gameshift.dev/nx/items", {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-api-key": apikey,
          },
        });
        const data = await response.json();
        setNfts(data.data.map((item) => item.item));
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNfts();
  }, []);

  const handleSell = (id) => navigate(`/donate/${id}`);
  const handleStopSelling = (id) => navigate(`/stop-selling-nft/${id}`);

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;

  if (!nfts || nfts.length === 0)
    return <div className="noNfts">Không có NFT nào để hiển thị.</div>;
  

  return (
    <div className="container">
      <div className="headerContainer">
        <h1 className="title">Danh Sách Các Câu Lạc Bộ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </h1>
        <Link to="/create-nft" className="addButton">
          Thêm mới NFT
        </Link>
      </div>

      <div className="nftList">
        {nfts.map((nft) => (
          <div key={nft.id} className="nftItem">
            <img src={nft.imageUrl} alt={nft.name} className="nftImage" />
            <h3 className="nftName">{nft.name}</h3>
            <p className="nftPrice">{(nft.priceCents / 100).toFixed(2)} USD</p>
            <div className="buttonContainer">
              <button
                className="button sellButton"
                onClick={() => handleSell(nft.id)}
              >
                Donate
              </button>
              {/* <button
                className="button stopButton"
                onClick={() => handleStopSelling(nft.id)}
              >
                Dừng bán
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
