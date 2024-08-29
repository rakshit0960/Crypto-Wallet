import { FaArrowUp } from "react-icons/fa";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

export default function SendButton() {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex flex-col items-center">
          <Button id="send" className="rounded-full" variant={"outline"}>
            <FaArrowUp />
          </Button>
          <label htmlFor="send
          ">Send</label>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
