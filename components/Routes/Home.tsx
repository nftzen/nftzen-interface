import React from "react";
import { Web3Provider } from "@ethersproject/providers";
import Link from "next/link";
import useSWR from "swr";
import { IoIosDocument } from "react-icons/io";
import { RiGovernmentLine } from "react-icons/ri";
import { GiVote } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
// import Zen from "../../contracts/artifacts/Zen.json";
import { useWeb3React } from "@web3-react/core";

// const zenToken = {
//   address: Zen.networks["4"].address,
//   symbol: "ZEN",
//   name: "ZEN",
//   decimals: 18,
// };

const readFetcher =
  () =>
  (...args) => {
    const [contract, method, ...params] = args;
    return contract[method](...params);
  };

export const Home = () => {
  return (
    <div className="">
      <div className="m-2 mt-12 text-9xl text-center text-cyan-300 styled-font">
        NftZen
      </div>

      <div className="mb-10 text-center text-xl text-cyan-400 font-bold styled-font-shadow">
        Where DeFi meets NFTs
      </div>

      <div className="my-4 text-center">
        <Link href="/crowdfund">
          <button className=" w-full rounded-md p-2 bg-cyan-500 text-black font-bold hover:bg-cyan-600">
            CrowdFund (Starts Sept)
          </button>
        </Link>
      </div>
      {/* <div className="my-4 text-center">
        <button className="w-full rounded-md p-2 bg-gray-500 hover:bg-gray-600 text-black font-bold">
          Go to App (Coming Soon)
        </button>
      </div> */}

      <div className="text-center">
        <div className="flex justify-between">
          <div className="p-2 border-2 rounded-md w-full hover:bg-cyan-500 hover:text-black">
            <a
              href="https://docs.nftzen.org/"
              target="_blank"
              className="flex justify-center items-center"
            >
              <IoIosDocument />
              <p className="ml-2">Docs</p>
            </a>
          </div>
          <div className="mx-2 p-2 border-2 rounded-md w-full hover:bg-cyan-500 hover:text-black">
            <a
              href="https://github.com/nftzen"
              target="_blank"
              className="flex justify-center items-center"
            >
              <FaGithub />
              <p className="ml-2">Github</p>
            </a>
          </div>
          <div className="p-2 border-2 rounded-md w-full hover:bg-cyan-500 hover:text-black">
            <a
              href="https://docs.nftzen.org/governance/overview"
              target="_blank"
              className="flex justify-center items-center"
            >
              <RiGovernmentLine />
              <p className="ml-2">Governance</p>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-lg text-cyan-400">New Here?</p>
        <p>
          Join us on{" "}
          <a href="https://discord.gg/NxyRZtRkxf" target="_blank">
            Discord
          </a>{" "}
          and read this{" "}
          <a
            href="https://docs.nftzen.org/faqs"
            target="_blank"
            className="text-cyan-400"
          >
            FAQ
          </a>{" "}
          to get started .
        </p>
      </div>

      <div className="my-8">
        <div className="flex justify-between">
          <div>
            <div className="mb-2 w-full text-lg text-cyan-400">Community</div>
            <div>
              <a
                href="https://medium.com/@nftzen"
                target="_blank"
                className="hover"
              >
                Medium
              </a>
            </div>
            {/* <div>
              <a href="#">Telegram</a>
            </div> */}
            <div>
              <a href="https://discord.gg/NxyRZtRkxf" target="_blank">
                Discord
              </a>
            </div>
            <div>
              <a href="https://twitter.com/NftZen_Org" target="_blank">
                Twitter
              </a>
            </div>
          </div>
          <div>
            <div className="mb-2 w-full text-lg text-cyan-400">Learn</div>
            <div>
              <a href="https://docs.nftzen.org/faqs" target="_blank">
                FAQ
              </a>
            </div>
            <div>
              <a href="https://docs.nftzen.org" target="_blank">
                Documentation
              </a>
            </div>
            <div>
              <a href="https://github.com/nftzen" target="_blank">
                Code
              </a>
            </div>
          </div>
          <div>
            <div className="mb-2 w-full text-lg text-cyan-400">Others</div>
            <div>
              <a href="https://docs.nftzen.org/faqs" target="_blank">
                Team
              </a>
            </div>
            <div>
              <a href="https://discord.gg/NxyRZtRkxf" target="_blank">
                Forum
              </a>
            </div>
            <div>
              <a
                href="https://docs.nftzen.org/governance/overview"
                target="_blank"
              >
                Governance
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
