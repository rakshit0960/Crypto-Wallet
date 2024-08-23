"use client";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { GoEyeClosed } from "react-icons/go";
import { IconContext } from "react-icons";

export default function ShowHideContent({ content }: { content: string }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <IconContext.Provider value={{ className: "cursor-pointer", size: "23" }}>
      <div className="flex items-center gap-10">
        {isVisible ? (
          <div>{content}</div>
        ) : (
          <>
            <div>{content.split("").map((ch) => "*")}</div>
          </>
        )}
        <div onClick={() => setIsVisible((preVal) => !preVal)}>
          {isVisible ? <GoEyeClosed />:<IoEyeOutline /> }
        </div>
      </div>
    </IconContext.Provider>
  );
}
