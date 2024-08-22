import Link from "next/link";
import { ModeToggle } from "./ui/themeModeToggle";

export default function Nav() {
  return (
    <div>
      <nav className="border-b px-[12%] py-2 flex justify-between items-center backdrop-blur-sm fixed w-full z-50">
        <Link href="/">
          <h1>Crypto Wallet</h1>
        </Link>
        <ModeToggle />
      </nav>
      <div className="py-8"></div>
    </div>
  );
}
