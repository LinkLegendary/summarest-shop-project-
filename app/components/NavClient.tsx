"use client";

import Image from "next/image";

// import { useAuth } from "../context/AuthContext";
import { useAuth } from "@/context/AuthContext";


export const NavClient = () => {
  const { openAuthModal } = useAuth();

  return (
    <>
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Image
              className="nav__img"
              src="/logo.png"
              alt="logo"
              width={120}
              height={40}
            />
          </figure>

          <ul className="nav__list--wrapper">
              <li className="nav__list nav__list--login" onClick={openAuthModal}>Login</li> 
             
           
           

            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavClient;