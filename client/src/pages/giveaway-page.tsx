import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { CheckCircle2, Loader2 } from "lucide-react";

const giveawaySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type GiveawayForm = z.infer<typeof giveawaySchema>;

export default function GiveawayPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Check if user has already entered
  const { data: existingEntry, isLoading: checkingEntry } = useQuery({
    queryKey: ["/api/giveaway/status"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/giveaway/status");
        if (!res.ok) throw new Error("Failed to check entry status");
        return res.json();
      } catch (error) {
        console.error("Error checking entry status:", error);
        return null;
      }
    },
  });

  const form = useForm<GiveawayForm>({
    resolver: zodResolver(giveawaySchema),
    defaultValues: {
      name: user?.username || "",
      email: user?.email || "",
      phone: "",
    },
  });

  const giveawayMutation = useMutation({
    mutationFn: async (data: GiveawayForm) => {
      await apiRequest("POST", "/api/giveaway", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been entered into the giveaway. Check your email for confirmation.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/giveaway/status"] });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!user) {
    return <Redirect to="/auth" />;
  }

  if (checkingEntry) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (existingEntry) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                Entry Confirmed
              </CardTitle>
              <CardDescription>
                You're already entered in the Pure Game Classic giveaway. Good luck!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Winners will be announced after the event. Keep an eye on your email for updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Enter the Giveaway</CardTitle>
              <CardDescription>
                Complete the form below to enter our exclusive giveaway for a chance to win amazing prizes!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => giveawayMutation.mutate(data))} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={giveawayMutation.isPending}
                  >
                    {giveawayMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Enter Giveaway"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}