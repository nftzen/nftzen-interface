import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../../utils";
import { addSigner } from "../../contracts";

export const Wallet = () => {
  const { activate, active } = useWeb3React<Web3Provider>();

  const onClick = async () => {
    activate(injectedConnector);
  };

  return (
    <div>
      {active ? (
        <div className="p-2 rounded-md bg-pink-600 border-black">
          Connected{" "}
        </div>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="p-2 rounded-md bg-white hover:bg-pink-600 text-black hover:text-white"
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default Wallet;
