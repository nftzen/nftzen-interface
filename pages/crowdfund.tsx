import React, { useState } from "react";
import moment from "moment";
import { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { BsInfoSquareFill } from "react-icons/bs";
import Balance from "../components/Balance";
import TokenBalance from "../components/TokenBalance";
import Zen from "../contracts/artifacts/Zen.json";
import {
  addSigner,
  zen,
  distributor,
  zenAddress,
  NETWORK,
  distributorAddress,
} from "../contracts";
import { getEthPrice } from "../utils/priceOracle";
import { weiToEth, ethToWei } from "../utils";
import Wallet from "../components/wallet";

const zenToken = {
  address: zenAddress[NETWORK],
  symbol: "ZEN",
  name: "Zen",
  decimals: 18,
};

const readFetcher =
  () =>
  (...args) => {
    const [contract, method, ...params] = args;
    return contract[method](...params);
  };

const asyncFetch =
  () =>
  (...args) => {
    const [method, ...params] = args;
    return method(...params);
  };

export const Home = () => {
  const { account, library } = useWeb3React<Web3Provider>();
  const { data: totalSupply } = useSWR([zen, "totalSupply"], readFetcher());
  const { data: balance } = useSWR([zen, "balanceOf", account], readFetcher());
  const { data: capLeft } = useSWR([distributor, "capLeft"], readFetcher());
  const { data: round } = useSWR([distributor, "round"], readFetcher());
  const { data: rate } = useSWR([distributor, "rate"], readFetcher());
  const { data: ethPrice } = useSWR([getEthPrice], asyncFetch());

  const rateNumber = rate ? rate.toNumber() : 0;

  const [fundAmount, setFundAmount] = useState(0);
  const onInputChange = (e) => {
    const value = e.target.value.replace(/\D/, "");
    console.log("e", value);
    setFundAmount(value);
  };

  const onClick = () => {
    // TODO: should get signer when logging in.
    if (library) {
      addSigner(library.getSigner());
    }
    console.log("buy", account, distributor);
    const amountInWei = ethToWei(fundAmount.toString());
    distributor.buyTokens(account, {
      // gasLimit: 100000,
      value: amountInWei,
    });
  };

  const date = moment().add(10, "days").toDate();
  // const ethPrice = getEthPrice();
  console.log("ethPrice", ethPrice);

  const finalPrice = 15000;
  const discounts = [0.9, 0.85, 0.8, 0.75, 0.65, 0.5, 0.45, 0.3, 0.15, 0];
  const rounds = discounts.map((discount, i) => {
    return {
      round: i + 1,
      price: finalPrice / (1 - discount),
      discount,
    };
  });

  const max = rounds.slice(-1).pop()!.price;

  return (
    <div className="my-8 mx-2">
      <div className="my-4">
        <p className="mb-2 my-2 text-3xl text-cyan-400">
          ZEN Community Release
        </p>
      </div>

      <p className="my-2 text-lg">
        New here?{" "}
        <a
          className="text-cyan-400"
          href="https://docs.nftzen.org/tokenomics/zen-token"
          target="_blank"
        >
          Read about <span className="font-bold">ZEN</span>
        </a>
      </p>

      <div className="my-4 text-center">
        {/* <p>Round 1 Starts in... </p> */}
        {/* <Countdown date={date}></Countdown> */}
        <p className="text-lg text-cyan-400">Round 1 Starts</p>
        <p className="mb-2 text-4xl font-bold underline text-cyan-400">
          Sept 2021
        </p>
        <p className="italic text-sm">
          (Follow our{" "}
          <a
            href="https://twitter.com/NftZen_Org"
            target="_blank"
            className="text-cyan-400"
          >
            socials
          </a>{" "}
          for the exact time)
        </p>
        {/* <p>Be the first to participate</p> */}
      </div>

      <div className="my-4">
        <p className="my-4 text-3xl text-cyan-400">Pricing Table</p>
        <table className="w-full text-center table-fixed">
          <thead>
            <tr>
              <td className="">Round</td>
              <td className="w-1/4">ZEN / Eth</td>
              <td className="w-1/4">Discount</td>
              <td className="w-1/4">Price*</td>
              {/* <td className="w-1/5">Gain by Launch</td> */}
              {/* <td>Cap Added</td> */}
              {/* <td>% Increase</td> */}
            </tr>
          </thead>
          <tbody>
            {rounds.map((round, i) => {
              return (
                <tr key={i}>
                  <td>{round.round}</td>
                  <td>{round.price.toFixed(0)}</td>
                  <td>{(round.discount * 100).toFixed(0)} %</td>
                  <td>$ {(ethPrice / round.price).toFixed(3)}</td>
                  {/* <td>
                    {(((round.price - finalPrice) / finalPrice) * 100).toFixed(
                      0
                    )}{" "}
                    %
                  </td> */}
                  {/* <td>{round.cap} ETH</td> */}
                  {/* <td>{((max-round.price)/max*100).toPrecision(3)} %</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="my-2">
        * Based on Realtime Eth price ( $ {ethPrice} ) from Uniswap
      </p>
      <p className="">Each round will last approx ~3 days</p>

      <div className="my-8">
        <p className="mb-4 text-3xl text-cyan-400">Participate:</p>
        <div className="mb-2 p-4 border rounded-md">
          <div className="text-lg">
            <p className="text-lg font-bold">Round Info:</p>
            <div className="flex">
              <div className="mr-2 text-cyan-400">Current Round: </div>
              <div className="">{round ? round.toString() : null}</div>
            </div>
            <div className="flex">
              <div className="mr-2 text-cyan-400">Current Rate: </div>
              <div className="">{rate ? rate.toString() : null} ZEN / Eth</div>
              {/* <div className="">$ {(rate * ethPrice).toFixed(4)}</div> */}
            </div>
            <div className="flex">
              <div className="mr-2 text-cyan-400">Current Discount: </div>
              {/* <div className="">$ {(rate * ethPrice).toFixed(4)}</div> */}
              {/* <div>{(((max - rateNumber) / max) * 100).toPrecision(3)} %</div> */}
              <div>90%</div>
            </div>
            {/* <div className="flex">
                  <div className="mr-2 text-cyan-400">Round Ends in:</div>
                  <div className="">28 hours</div>
                </div> */}
            <div className="flex">
              <div className="mr-2 text-cyan-400">Cap left:</div>
              <div className="">
                {capLeft ? weiToEth(capLeft.toString()) : null} Eth
              </div>
            </div>

            <p className="mt-4 font-bold text-lg">Wallet Info:</p>
            <div className="flex">
              <div className="mr-2 text-cyan-400">Your Address:</div>
              <div className="">{account ? account : "Not connected"}</div>
            </div>
            {/* <div className="flex">
                  <div className="mr-2 text-cyan-400">Contract Address:</div>
                  <div className="">'asdfasdfsdf' [etherscan]</div>
                </div> */}
            <div className="flex">
              <div className="mr-2 text-cyan-400">Eth Balance:</div>
              <div className="">
                <Balance />
              </div>
            </div>
            <div className="flex">
              <div className="mr-2 text-cyan-400">ZEN Balance:</div>
              <div className="">
                <TokenBalance key={zenToken.address} {...zenToken} />
              </div>
            </div>
          </div>

          <hr className="my-4" />
          <p className="my-4 text-xl font-bold text-cyan-400">
            How to Participate:
          </p>
          <div>
            <p>a) Connect with Metamask, and use the simple UI below.</p>

            {account ? (
              <div className="m-4 text-center">
                <input
                  type="number"
                  className="p-2 rounded-md rounded-r-none text-black outline-none"
                  placeholder="Eth"
                  min={0}
                  value={fundAmount}
                  onChange={onInputChange}
                />
                <button
                  type="button"
                  onClick={onClick}
                  className="p-2 rounded-md rounded-l-none bg-pink-600 border-black"
                >
                  Buy with Eth
                </button>
                {fundAmount > 0 ? (
                  <div className="my-2">
                    To receive{" "}
                    <span className="text-bold text-cyan-400">
                      {fundAmount * rate} ZEN
                    </span>
                  </div>
                ) : null}
              </div>
            ) : (
              // <div>*Connect Wallet To Access*</div>
              <div className="m-4 text-center ">
                <Wallet />
              </div>
            )}

            <p>
              b) Directly send Eth to the Crowdsale contract address:
              <br />
              <a
                href="https://etherscan.io/address/0xD93078e25A86FDd0a2EEEd3ABdb3Eb1E2973bFdE"
                target="_blank"
                className="text-sm text-cyan-400"
              >
                {distributorAddress[NETWORK]}
              </a>
            </p>

            <hr className="my-4" />

            <div>
              <p className="my-4 text-xl font-bold text-cyan-400">
                Additional Info:
              </p>
              <ul>
                <li>- a & b trigger the same method.</li>
                <li>- You should receive ZEN tokens right away.</li>
                <li>- Ensure to send enough gas to cover the transaction.</li>
              </ul>

              <p className="my-4 text-lg">
                Check the{" "}
                <a
                  className="text-cyan-400"
                  href="https://docs.nftzen.org/faqs"
                  target="_blank"
                >
                  FAQ{" "}
                </a>
                for common questions
              </p>

              <div className="row">
                <p className="italic">
                  Disclaimer: NftZen is an experimental protocol and the
                  contracts are yet undergoing through an audit. Participate at
                  your own risk. The ZEN token itself is to be used for utility
                  purposes of this protocol and is in no way should be seen as
                  an investment vehicle or security. US & Canadian citizens are
                  prohibited from purchasing the ZEN token. There may be other
                  countries and jurisdictions which prohibit the purchase of
                  ERC-20 tokens. It is the responsibility of you, the
                  individual, to determine if purchasing our token is permitted
                  in your country. By purchasing, you agree to the terms of this
                  disclaimer and will only use the ZEN for its utility
                  functions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ETH: <Balance />
            ZEN: <TokenBalance key={zenToken.address} {...zenToken} />
        <div>
          Show contract info: <br/>
          Minted: {totalSupply? totalSupply.toString(): null} <br/>
          Balance: {balance? balance.toString(): null} <br/>
          CapLeft: {capLeft? capLeft.toString(): null} wei <br/>
          Round: {round? round.toString(): null} <br/>
          Rate: {rate? rate.toString(): null} <br/>
        </div> */}
    </div>
  );
};

export default Home;
