import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
  FormItem,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthUser } from "aws-amplify/auth";

export const BidModal = ({
  user,
  auctionId,
  minBidAmount,
}: {
  user: AuthUser;
  auctionId: number;
  minBidAmount: number;
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    amount: z.coerce.number().gt(minBidAmount),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const payload = {
        ...formData,
      };
      const res = await fetch(
        `/api/bids?userId=${user.userId}&auctionId=${auctionId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        return true;
      }
      return false;
    },
    mutationKey: ["auctions"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
      setOpen(!open);
    },
  });

  function onSubmit(data: any) {
    mutation.mutate(data);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-11/12">
        <Button>Bid</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bid</DialogTitle>
          <DialogDescription>
            Enter the dollar amount you wish to offer.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col max-w-sm my-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your bid here."
                      {...field}
                      value={field.value > 0 ? field.value : ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Your bid must be greater than ${minBidAmount}
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="mt-4 md:w-20">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
