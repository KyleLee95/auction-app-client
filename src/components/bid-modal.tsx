import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  FormItem,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
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
  const [open, setOpen] = useState(false);
  const formSchema = z.object({
    amount: z.number().gt(minBidAmount),
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

      const data = await res.json();
      return data;
    },
    mutationKey: ["auctions"],
  });

  function onSubmit(data: any) {
    mutation.mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-11/12">
        <Button>Bid</Button>
      </DialogTrigger>
      <DialogContent className="pointer-events-auto">
        <DialogHeader>
          <DialogTitle>Enter Bid</DialogTitle>
          <DialogDescription></DialogDescription>
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
                        type="number"
                        placeholder="Enter your bid here."
                        {...field}
                        value={field.value > 0 ? field.value : ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Your bid must be greater than ${minBidAmount}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4 md:w-20">
                Submit
              </Button>
            </form>

            <FormMessage />
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
