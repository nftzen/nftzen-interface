import { Web3Provider } from "@ethersproject/providers";
import { formatEther, formatUnits } from "@ethersproject/units";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import useSWR from "swr";
import ERC20ABI from "../../contracts/artifacts/ERC20.json";

const fetcher =
  (library: Web3Provider, abi?: any) =>
  (...args: [any, any, ...any[]]) => {
    const [arg1, arg2, ...params] = args;
    // it's a contract
    if (utils.isAddress(arg1)) {
      const address = arg1;
      const method = arg2;
      const contract = new Contract(address, abi, library.getSigner());
      return contract[method](...params);
    }
    // it's a eth call
    const method = arg1;
    return library[method](arg2, ...params);
  };

export const TokenBalance = ({ symbol, address, decimals }) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const { data: balance, mutate } = useSWR(
    [address, "balanceOf", account],
    fetcher(library as Web3Provider, ERC20ABI.abi)
  );

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`);
    if (library) {
      const contract = new Contract(address, ERC20ABI.abi, library.getSigner());
      const fromMe = contract.filters.Transfer(account, null);
      library.on(fromMe, (from, to, amount, event) => {
        console.log("Transfer|sent", { from, to, amount, event });
        mutate(undefined, true);
      });
      const toMe = contract.filters.Transfer(null, account);
      library.on(toMe, (from, to, amount, event) => {
        console.log("Transfer|received", { from, to, amount, event });
        mutate(undefined, true);
      });
      // remove listener when the component is unmounted
      return () => {
        library.removeAllListeners(toMe);
        library.removeAllListeners(fromMe);
      };
    }
    // trigger the effect only on component mount
  }, []);

  if (!balance) {
    return <div>...</div>;
  }
  return (
    <div>
      {parseFloat(formatEther(balance))} {symbol}
    </div>
  );
};

export default TokenBalance;
