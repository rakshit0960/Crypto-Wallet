import React, { ReactNode } from "react";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

export default function CopyButton({
  children,
  text,
  message,
}: {
  children: ReactNode;
  text: string;
  message: string;
}) {
  const { toast } = useToast();

  const copyText = (text: string, message: string) => {
    try {
      navigator.clipboard.writeText(text);
      toast({
        description: message,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  return <div onClick={() => copyText(text, message)}>{children}</div>;
}
