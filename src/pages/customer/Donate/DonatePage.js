import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Buffer } from "buffer"; // Import Buffer
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const DonatePage = () => {
  const { nftId } = useParams(); // Lấy nftId từ URL params
  const [price, setPrice] = useState("");
  const [nft, setNft] = useState(null);
  const [confirmationLink, setConfirmationLink] = useState(null);
  const [error, setError] = useState(null);
  const apikey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMjAxOGM0OS1jOGUxLTRhODQtODdjYy1kODA4N2Y1YzAwMmQiLCJzdWIiOiJhNzIxZTQyYy0xYTFhLTRmMzUtODQ0Zi0xYThlOGY1YjdjYTAiLCJpYXQiOjE3MzMzMjg2MTh9.1zfRygZl_Nbfeoy0R7xofTlBZPhYXHA5Ewdp3tF00NA`;
  const [cookies, setCookie] = useCookies(["walletAddress"]);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const senderAddress = cookies.walletAddress;

  useEffect(() => {
    if (!nftId) {
      setError("Invalid NFT ID");
      return;
    }

    const fetchNft = async () => {
      try {
        const url = `https://api.gameshift.dev/nx/items/${nftId}`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-api-key": apikey,
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        setRecipient(data.item.owner.address);
        console.log(recipient);
        if (data && data.item) {
          setNft(data.item);
        } else {
          setError("NFT not found");
        }
      } catch (err) {
        setError("An error occurred while fetching NFT details");
        console.error(err);
      }
    };

    fetchNft();
  }, [nftId]);

  const transferSOL = async () => {
    try {
      if (!senderAddress) {
        setStatus("Bạn Chưa Đăng Nhập.");
        return;
      }

      if (!window.solana || !window.solana.isPhantom) {
        setStatus("Vui lòng cài đặt ví Phantom.");
        return;
      }

      const provider = window.solana;
      await provider.connect();

      const connection = new Connection(
        "https://api.mainnet-beta.solana.com",
        "confirmed"
      );
      const sender = new PublicKey(senderAddress);

      const recipientPublicKey = new PublicKey(recipient);
      const amountInLamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: sender,
          toPubkey: recipientPublicKey,
          lamports: amountInLamports,
        })
      );

      transaction.feePayer = sender;
      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;

      // Ký giao dịch
      const signedTransaction = await provider.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      await connection.confirmTransaction(signature, "confirmed");

      setStatus(`Chuyển thành công! Mã giao dịch: ${signature}`);
    } catch (error) {
      console.error("Lỗi:", error);
      setStatus("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      {nft ? (
        <div className="nftWrapper">
          <div className="nftDetailsLeft">
            <img src={nft.imageUrl} alt={nft.name} className="nftImage" />
            <h2>{nft.name}</h2>
            <p>{nft.description || "No description available"}</p>
            <p>{recipient || "No walletAddress"}</p>
          </div>
        </div>
      ) : (
        <div className="loading">
          <p>Loading NFT details...</p>
        </div>
      )}
      <div className="nftDetails">
        <div>
          <label>
            Số lượng SOL:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Nhập số lượng SOL"
            />
          </label>
        </div>
        <button onClick={transferSOL}>Chuyển tiền</button>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default DonatePage;
