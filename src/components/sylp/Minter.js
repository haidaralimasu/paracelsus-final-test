import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import { notifyNetwork, notifyError, notifyMintSuccess } from "../../toast";
import { ethers } from "ethers";
import { drup as address } from "../../contracts";
import nftabi from "../../contracts/NFT.json";
import {
  useBalanceOf,
  useCost,
  useWeiCost,
  useTotalSupply,
  useMaxSupply,
  useIsWhitelisted,
  useNftPerAddressLimit,
  useOnlyWhitelisted,
} from "./hooks";

const Sylp = () => {
  const nftInterface = new ethers.utils.Interface(nftabi);

  const { account, activateBrowserWallet } = useEthers();
  const [amount, setAmount] = useState(1);
  const [minting, setMinting] = useState(false);

  const cost = useCost();
  const weiCost = useWeiCost();
  const isWhitelisted = useIsWhitelisted(account);
  const onlyWhitelisted = useOnlyWhitelisted();
  const totalSupply = useTotalSupply();
  const maxSupply = useMaxSupply();
  const limit = useNftPerAddressLimit();
  const balance = useBalanceOf(account);

  const onError = () => {
    notifyNetwork();
  };

  const increase = () => {
    if (amount < limit) {
      setAmount(amount + 1);
    }
  };

  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  async function handleMint() {
    try {
      setMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const txCost = Number(weiCost) * amount;
      let nftcontract = new ethers.Contract(address, nftInterface, signer);
      let transaction = await nftcontract.mint(amount, {
        value: txCost.toString(),
      });
      await transaction.wait();
      setMinting(false);
      setAmount(1);
      notifyMintSuccess();
    } catch (error) {
      notifyError();
      setAmount(1);
      console.log(error);
      setMinting(false);
    }
  }

  return (
    <div className="container container-3">
      <img
        width={150}
        style={{ marginTop: 50 }}
        src="https://images.squarespace-cdn.com/content/v1/6209e559b78d4f4169421a26/7d53e6d5-83fa-4d51-9e63-fc816ad4b705/whitelogo.png?format=1500w"
      />
      <h1 className="heading-primary">Sylp Land Mint</h1>
      <div>
        {account ? (
          <>
            {onlyWhitelisted ? (
              <>
                {isWhitelisted ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button className="btn">{`${account.slice(
                      0,
                      6
                    )}...${account.slice(-6)}`}</button>
                    <div>
                      <button onClick={() => decrease()} className="btn">
                        -
                      </button>
                      <button
                        onClick={() => handleMint()}
                        style={{ marginRight: 10, marginLeft: 10 }}
                        className="btn"
                      >
                        {minting ? "Please Wait" : `MINT ${amount}`}
                      </button>
                      <button onClick={() => increase()} className="btn">
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    style={{ marginRight: 10, marginLeft: 10 }}
                    className="btn"
                  >
                    Please Wait Public Sale
                  </button>
                )}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button className="btn">{`${account.slice(
                  0,
                  6
                )}...${account.slice(-6)}`}</button>
                <div>
                  <button onClick={() => decrease()} className="btn">
                    -
                  </button>
                  <button
                    onClick={() => handleMint()}
                    style={{ marginRight: 10, marginLeft: 10 }}
                    className="btn"
                  >
                    {minting ? "Please Wait" : `MINT ${amount}`}
                  </button>
                  <button onClick={() => increase()} className="btn">
                    +
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => activateBrowserWallet(onError)}
            className="btn"
          >
            CONNECT WALLET
          </button>
        )}
      </div>

      {totalSupply < maxSupply ? (
        <div className="minter-status">
          <div className="minter-status-card">
            <h6>Status</h6>
            <h2>{onlyWhitelisted ? "Greenlist Mint" : "Publicsale"}</h2>
          </div>
          <div className="vl"></div>
          <div className="minter-status-card">
            <h6>Mint Price</h6>
            <h2>{cost} ETH</h2>
          </div>
          <div className="vl"></div>

          {account ? (
            <>
              <div className="minter-status-card">
                <h6>Your Mints</h6>
                <h2>
                  {balance}/{limit}
                </h2>
              </div>
              <div className="vl"></div>
            </>
          ) : null}

          <div className="minter-status-card">
            <h6>To Be Minted</h6>
            <h2>{maxSupply - totalSupply}</h2>
          </div>
        </div>
      ) : (
        <div className="minter-status">
          <div className="minter-status-card">
            <h6>Status</h6>
            <h2>Ended</h2>
          </div>
          <div className="vl"></div>

          <div className="minter-status-card">
            <h6>To Be Minted</h6>
            <h2>{maxSupply - totalSupply}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sylp;
