import { useState, useEffect } from "react";
import axios from "axios";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { ShyftSdk, Network } from "@shyft-to/js";
import { signAndConfirmTransactionFe } from "./utilityfunc";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // Import useCookies

const Login = () => {
  const navigate = useNavigate();
  const xKey = "wMY8M5zVBxtllE1N";
  const [wallID, setWallID] = useState("");
  const [network, setNetwork] = useState("devnet");
  const [connStatus, setConnStatus] = useState(false);
  const [dataFetched, setDataFetched] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const shyft = new ShyftSdk({ apiKey: xKey, network: Network.Devnet });

  // Khai báo sử dụng cookies
  const [cookies, setCookie] = useCookies(["walletAddress"]);

  const solanaConnect = async () => {
    console.log("clicked solana connect");
    const { solana } = window;
    if (!solana) {
      alert("Please Install Solana");
      return;
    }

    try {
      const phantom = new PhantomWalletAdapter();
      await phantom.connect();
      const rpcUrl = clusterApiUrl(network);
      const connection = new Connection(rpcUrl, "confirmed");
      const wallet = {
        address: phantom.publicKey.toString(),
      };

      if (wallet.address) {
        console.log(wallet.address);
        setWallID(wallet.address);
        setConnStatus(true);

        // Lưu địa chỉ ví vào cookies
        setCookie("walletAddress", wallet.address, { path: "/" });

        // Lấy thông tin tài khoản ví từ Solana
        const accountInfo = await connection.getAccountInfo(
          new PublicKey(wallet.address),
          "confirmed"
        );
        console.log(accountInfo);

        // Chuyển hướng sang trang Home
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNFTs = (e) => {
    e.preventDefault();

    let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${wallID}`;
    axios({
      url: nftUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
    })
      .then((res) => {
        console.log(res.data);
        setDataFetched(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const send = async (nftAddress) => {
    console.log(nftAddress);
    const nguoiNhan = prompt("Địa chỉ người nhận : ");
    console.log(nguoiNhan);
    if (nguoiNhan == null || nguoiNhan.trim() === "") {
      alert("Không để trống địa chỉ");
    } else {
      const rs = await shyft.nft.transfer({
        mint: nftAddress,
        fromAddress: wallID,
        toAddress: nguoiNhan,
      });
      signAndConfirmTransactionFe(Network.Devnet, rs);
    }
  };

  useEffect(() => {
    document.title = "Login By Phantom";
  }, []);

  return (
    <div className="grd-back">
      <div className="container-lg">
        <div className="py-4 text-center">
          <h1>Login Your Phantom Account</h1>
        </div>
      </div>

      <div className="container-lg">
        {!connStatus && (
          <div className="card border border-primary rounded py-3 px-5 w-50 mx-auto">
            <div className="card-body text-center">
              <h2 className="card-title p-2">Connect Your Wallet</h2>
              <p className="card-text p-1">
                You need to connect your wallet to deploy and interact with your contracts.
              </p>
              <button
                className="btn btn-primary mt-5 px-3"
                onClick={solanaConnect}
              >
                Connect Phantom Wallet
              </button>
            </div>
          </div>
        )}
      </div>

      {/* <div className="container-lg">
        <div className="py-4">
          <h3>Wallet Address: {wallID}</h3>
        </div>
        <div className="cards-section py-4">
          <div className="row">
            {isLoaded &&
              dataFetched.result.map((item) => (
                <div className="col-xs-12 col-sm-3 p-3" key={item.mint}>
                  <div className="card nft-card">
                    <div className="card-body">
                      <a
                        href={`/get-details?token_address=${item.mint}&apiKey=${xKey}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="img-fluid"
                          src={item.image_uri}
                          alt="img"
                        />
                      </a>
                      <a
                        href={`/get-details?token_address=${item.mint}&apiKey=${xKey}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <h5>{item.name}</h5>
                      </a>
                      <h5>Địa chỉ: {item.mint}</h5>
                    </div>
                    <button
                      type="button"
                      class="btn btn-outline-warning"
                      onClick={() => send(item.mint)}
                    >
                      Send NFT
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Login;
