import React from "react";
import Head from "next/head";
import { Web3ReactProvider } from "@web3-react/core";
import "../styles/index.css";
import {initApp} from '../state/init'
import { getLibrary } from "../utils";
import Navbar from '../components/Navbar'
initApp();

function MyApp({ Component, pageProps }) {
  return (
    <> 
    <Head>
      <title>NftZen</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="NftZen" />
      <meta name="build version" content={'1.0.0'} /> 
      <link rel="icon" href="/favicon.ico" />
      </Head>    
      <Web3ReactProvider getLibrary={getLibrary}>
        <div className="flex flex-col items-center">
          <div className="max-w-2xl w-full">
            <Navbar />
            <Component {...pageProps} />
          </div>
        </div>
      </Web3ReactProvider>
      
    </>
  )
}

export default MyApp;
