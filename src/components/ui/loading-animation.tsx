import { SymbolIcon } from "@radix-ui/react-icons";

export function LoadingAnimation() {
  return (
    <div className="h-72 grid place-content-center text-center gap-2">
      <SymbolIcon className="animate-spin h-100 mx-auto mb-2" width="40" height="40" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  );
}