import { ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";

export const getEthPrice = async () => {
  const DAI = new Token(
    ChainId.MAINNET,
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    18
  );

  const USDC = new Token(
    ChainId.MAINNET,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    18
  );

  const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
  const route = new Route([pair], WETH[DAI.chainId]);

  console.log(route.midPrice.toSignificant(6)); // 201.306
  console.log(route.midPrice.invert().toSignificant(6)); // 0.00496756
  return route.midPrice.toSignificant(6);
};
