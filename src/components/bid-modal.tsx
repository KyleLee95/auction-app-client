import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const BidModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-11/12">
        <Button>Bid</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Bid</DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col max-w-sm"
              onSubmit={() => console.log("submit bid logic")}
            >
              <Input placeholder="Enter your bid amount here" />
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
