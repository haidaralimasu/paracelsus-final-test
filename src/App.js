import React from "react";
import { ChainId, DAppProvider } from "@usedapp/core";
import Routes from "./router/Routes";
import { ToastContainer } from "react-toastify";
import Salp from "./components/salp/Salp";
import "react-toastify/dist/ReactToastify.css";

const config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]:
      "https://rinkeby.infura.io/v3/70ced43c56d248f18566ebe01e2d9fbe",
  },
  supportedChains: [ChainId.Rinkeby],
};

const App = () => {
  return (
    <DAppProvider config={config}>
      <ToastContainer />
      <Routes />
    </DAppProvider>
  );
};

export default App;
