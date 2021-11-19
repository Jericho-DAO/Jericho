import React from "react";
import logo from "../../images/Logo.png";

export function NoWalletDetected() {
  return (
      <div className="flex flex-col items-center bg-black text-white h-screen">
        <img src={logo} className="w-52 h-52" alt="logo" />
        <div className="p-4 text-center">
          <h1 className="text-5xl mt-2">The Forge</h1>
          <p className="mt-2">
            A place where crypto entrepreneurs learn, meet and buidl together.
          </p>
          <p className="mt-12 font-bold">
            No Ethereum wallet was detected. <br />
            Please install{" "}
            <a
              href="http://metamask.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              MetaMask
            </a>
            .
          </p>
        </div>
      </div>
  );
}
