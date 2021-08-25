import { providers, Contract, Wallet, utils } from "ethers";
import Zen from "./artifacts/Zen.json";
import Distributor from "./artifacts/Distributor.json";

export let zen: Contract;
export let distributor: Contract;

export enum PublicNetworks {
  DEVELOPMENT = "development",
  RINKEBY = "rinkeby",
  GOERLI = "goerli",
  MAIN = "main",
}
export enum PublicNetworkID {
  RINKEBY = "4",
  MAIN = "1",
}

export const NETWORK = 4;
export const zenAddress = { };
export const distributorAddress = {};

function setReadContracts() {
  const networkId = PublicNetworkID.RINKEBY;

  // TODO: env this.
  const provider = new providers.JsonRpcProvider(
    "https://rinkeby.infura.io/v3/"
  );
  zen = new Contract(zenAddress[networkId], Zen.abi, provider);
  distributor = new Contract(
    distributorAddress[networkId],
    Distributor.abi,
    provider
  );
}

setReadContracts();

// signer or provider
export function addSigner(signer) {
  console.log("addSigner", signer);

  zen = zen.connect(signer);
  distributor = distributor.connect(signer);
}
