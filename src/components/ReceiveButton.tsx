import React from "react";
import { Button } from "./ui/button";
import { FaArrowDown } from "react-icons/fa";

export default function ReceiveButton() {
  return (
    <div className="flex flex-col items-center">
      <Button className="rounded-full" variant={"outline"}>
        <FaArrowDown />
      </Button>
      <label htmlFor="send">Receive</label>
    </div>
  );
}
