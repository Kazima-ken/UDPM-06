import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./style-login.css"

const PhantomConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["walletAddress"]);

  const connectPhantomWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
        checkUser(response.publicKey.toString());
        setCookie("walletAddress", response.publicKey.toString(), { path: "/" });
      } catch (error) {
        setErrorMessage("Failed to connect Phantom Wallet.");
        console.error(error);
      }
    } else {
      setErrorMessage("Phantom Wallet is not installed.");
    }
  };

  const checkUser = async (address) => {
    setIsChecking(true);
    const url = `https://api.gameshift.dev/nx/users/${address}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key":
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMjAxOGM0OS1jOGUxLTRhODQtODdjYy1kODA4N2Y1YzAwMmQiLCJzdWIiOiJhNzIxZTQyYy0xYTFhLTRmMzUtODQ0Zi0xYThlOGY1YjdjYTAiLCJpYXQiOjE3MzMzMjg2MTh9.1zfRygZl_Nbfeoy0R7xofTlBZPhYXHA5Ewdp3tF00NA',
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log("User found:", data);
        navigate("/home");
        setCookie("walletAddress", response.publicKey.toString(), { path: "/" });
      } else if (response.status === 400) {
        console.log("User not found. Showing registration form.");
        setShowRegisterForm(true);
      } else {
        throw new Error("Unexpected error.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setErrorMessage("Failed to fetch user.");
      setShowRegisterForm(true);
    } finally {
      setIsChecking(false);
    }
  };

  const registerUser = async () => {
    const url = "https://api.gameshift.dev/nx/users";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key":
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMjAxOGM0OS1jOGUxLTRhODQtODdjYy1kODA4N2Y1YzAwMmQiLCJzdWIiOiJhNzIxZTQyYy0xYTFhLTRmMzUtODQ0Zi0xYThlOGY1YjdjYTAiLCJpYXQiOjE3MzMzMjg2MTh9.1zfRygZl_Nbfeoy0R7xofTlBZPhYXHA5Ewdp3tF00NA',
      },
      body: JSON.stringify({
        referenceId: walletAddress,
        email: email,
        externalWalletAddress: walletAddress,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        console.log("User registered:", data);
        navigate("/home");
        setCookie("walletAddress", response.publicKey.toString(), { path: "/" });
      } else {
        setErrorMessage(data.message || "Failed to register user.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("Failed to register user.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Phantom Wallet Connection</h2>
      {!walletAddress ? (
        <button className="btn-connect" onClick={connectPhantomWallet}>
          Connect Phantom Wallet
        </button>
      ) : (
        <p className="wallet-address">Wallet Address: {walletAddress}</p>
      )}
      {isChecking && <p className="checking-status">Checking user...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {showRegisterForm && (
        <div className="register-form">
          <h3>Register User</h3>
          <p>Wallet Address: {walletAddress}</p>
          <input
            type="email"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button className="btn-register" onClick={registerUser}>
            Register
          </button>
        </div>
      )}

    </div>
  );
};

export default PhantomConnect;
