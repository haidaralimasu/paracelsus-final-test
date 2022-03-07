import React from "react";
import { useEthers } from "@usedapp/core";
import { notifyNetwork } from "../toast";

const Home = () => {
  const { account, activateBrowserWallet } = useEthers();

  const onError = () => {
    notifyNetwork();
  };

  return (
    <div>
      <div className="container container-home">
        <img
          width={150}
          src="https://images.squarespace-cdn.com/content/v1/6209e559b78d4f4169421a26/7d53e6d5-83fa-4d51-9e63-fc816ad4b705/whitelogo.png?format=1500w"
        />
        <h1 className="heading-primary">Welcome To Paracelsus</h1>

        <div>
          {account ? (
            <button className="btn">{`${account.slice(0, 6)}...${account.slice(
              -6
            )}`}</button>
          ) : (
            <button
              onClick={() => activateBrowserWallet(onError)}
              className="btn"
            >
              CONNECT WALLET
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
