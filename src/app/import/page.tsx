import MnemonicInput from "@/components/MnemonicInput";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="py-8 w-full h-screen flex flex-col gap-10 items-start px-[10%]">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Secret Recovery Phrase
        </h2>
        <p className="text-xl text-muted-foreground">
          Enter your 12 word phrase. or leave empty to generate a
          random phrase.
        </p>
        <MnemonicInput  />
      </div>
    </>
  );
}
