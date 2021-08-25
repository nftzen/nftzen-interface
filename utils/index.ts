import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { utils } from "ethers";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
});

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);

  library.pollingInterval = 12000;
  return library;
}

export function weiToEth(wei: string) {
  return utils.formatEther(wei); // formatUnits(value, "ether").
}

export function ethToWei(eth: string) {
  return utils.parseEther(eth);
}
