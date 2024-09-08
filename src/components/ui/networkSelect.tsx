import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";

export default function NetworkSelect() {
  const { network, setNetwork } = useStore(
    useShallow((state) => ({
      network: state.network,
      setNetwork: state.setNetwork,
    }))
  );

  return (
    <Select onValueChange={setNetwork}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={network} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="mainnet">Mainnet</SelectItem>
          <SelectItem value="devnet">Devnet</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
