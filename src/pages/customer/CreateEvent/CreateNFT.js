import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style-create-nft.css";

const CreateNFT = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [userReferenceId, setUserReferenceId] = useState("");
  const [price, setPrice] = useState("");
  const [nftResult, setNftResult] = useState(null);
  const [marketUrl, setMarketUrl] = useState("");
  const [error, setError] = useState(null);
  const apikey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMjAxOGM0OS1jOGUxLTRhODQtODdjYy1kODA4N2Y1YzAwMmQiLCJzdWIiOiJhNzIxZTQyYy0xYTFhLTRmMzUtODQ0Zi0xYThlOGY1YjdjYTAiLCJpYXQiOjE3MzMzMjg2MTh9.1zfRygZl_Nbfeoy0R7xofTlBZPhYXHA5Ewdp3tF00NA`;

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get("collectionId");
    if (id) {
      setCollectionId(id);
    }
  }, [search]);

  const handleCreateNFT = async (event) => {
    event.preventDefault();
    setError(null);

    if (!imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i)) {
      setError("Please enter a valid image URL.");
      return;
    }

    try {
      const response = await fetch(
        "https://api.gameshift.dev/nx/unique-assets",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "x-api-key": apikey,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            details: {
              collectionId,
              description,
              imageUrl,
              name,
            },
            destinationUserReferenceId: userReferenceId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create NFT: ${response.statusText}`);
      }

      const data = await response.json();
      setNftResult(data);

      // Chuyển hướng đến trang /manage-nft sau khi thành công
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleListForSale = async () => {
    setError(null);

    if (price <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.gameshift.dev/nx/unique-assets/${nftResult.id}/list-for-sale`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "x-api-key": apikey,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            price: { currencyId: "USDC", naturalAmount: price },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to list NFT for sale: ${response.statusText}`);
      }

      const data = await response.json();
      setMarketUrl(data.consentUrl);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Create Event</h1>
      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}
      <form onSubmit={handleCreateNFT}>
        <div>
          <label>Tên Câu Lạc Bộ:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mô Tả:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL Ảnh:</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID Bộ Sưu Tập:</label>
          <input
            type="text"
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID Người Nhận:</label>
          <input
            type="text"
            value={userReferenceId}
            onChange={(e) => setUserReferenceId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>

      {nftResult && (
        <div>
          <h3>NFT Event Successfully!</h3>
          <p>
            <strong>ID:</strong> {nftResult.id}
          </p>
          <p>
            <strong>Name:</strong> {nftResult.name}
          </p>
          <p>
            <strong>Description:</strong> {nftResult.description}
          </p>
          <img src={nftResult.imageUrl} alt="NFT" />
        </div>
      )}

      {nftResult && !marketUrl && (
        <div>
          <h3>Set Price for NFT</h3>
          <div>
            <label>Price (in USDC):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button onClick={handleListForSale}>List NFT for Sale</button>
        </div>
      )}

      {marketUrl && (
        <div>
          <h3>Confirm Listing</h3>
          <p>
            Click the link to confirm the listing of your NFT:
            <br />
            <a href={marketUrl} target="_blank" rel="noopener noreferrer">
              Confirm Listing
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateNFT;
