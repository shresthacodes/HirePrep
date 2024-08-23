"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function Header() {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="flex p-3 items-center justify-between  shadow-md">
      <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
      <ul className=" hidden md:flex gap-6">
        <li
          className={`hover:text-[#d10a54] hover:font-bold hover:transition-all cursor-pointer
            ${path == "/dashboard" && "text-[#d10a54] font-bold"}`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-[#d10a54] hover:font-bold hover:transition-all cursor-pointer
            ${path == "/dashboard/questions" && "text-[#d10a54] font-bold"}`}
        >
          Question
        </li>
        <li
          className={`hover:text-[#d00d54] hover:font-bold hover:transition-all cursor-pointer 
          ${path == "/dashboard/upgrade" && "text-[#d10a54] font-bold"}`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-[#d10a54] hover:font-bold hover:transition-all cursor-pointer
            ${path == "/dashboard/how" && "text-[#d10a54] font-bold"}`}
        >
          How it Works?
        </li>
      </ul>

      <UserButton />
    </div>
  );
}

export default Header;
