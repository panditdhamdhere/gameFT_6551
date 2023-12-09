"use client ";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import styles from "../app/globals.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { darkTheme, lightTheme } from "@thirdweb-dev/react";

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";

let customDarkTheme;
const Navbar = () => {
  const address = useAddress();
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonNumber) => {
    setActiveButton(buttonNumber);

    customDarkTheme = darkTheme({
      fontFamily: "Inter, sans-serif",
      colors: {
        modalBg: "#000000",
        accentText: "red",
      },
    });
  };
  return (
    <div>
      <main className="navbar-main">
        <div className="navbar-component">
          <Image
            src="/assets/imgs/walletlogo.png"
            className="logo"
            height={80}
            width={80}
          />
          <div className="position1">
            <div className="line-circle">
              <div className="circle"></div>
              <div className="line"></div>
            </div>
            <div className="links">
              <div className="toggle-container">
                {/* {address && ( */}
                <Link href={`/profile/${address}`}>
                  <button
                    className={`toggle-button ${
                      activeButton === 1 ? "active" : ""
                    }`}
                    onClick={() => handleClick(1)}
                  >
                    Profile
                  </button>
                </Link>
                {/* )} */}

                <Link href="/buy">
                  <button
                    className={`toggle-button ${
                      activeButton === 2 ? "active" : ""
                    }`}
                    onClick={() => handleClick(2)}
                  >
                    Marketplace
                  </button>
                </Link>
                <Link href="/sell">
                  <button
                    className={`toggle-button ${
                      activeButton === 3 ? "active" : ""
                    }`}
                    onClick={() => handleClick(3)}
                  >
                    Sell
                  </button>
                </Link>
                <div
                  className={`slider ${
                    activeButton === 1
                      ? "pos1"
                      : activeButton === 2
                      ? "pos2"
                      : "pos3"
                  }`}
                />
              </div>
            </div>
            <div className="line-circle">
              <div className="line"></div>
              <div className="circle"></div>
            </div>
          </div>

          <div className="">
            <ConnectWallet theme={customDarkTheme} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Navbar;
