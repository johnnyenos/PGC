import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { Redirect } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, FileCheck, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/navbar";

export default function WaiverPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const signWaiverMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/waiver/sign");
    },
    onSuccess: () => {
      toast({
        title: "Waiver Signed",
        description: "Thank you for signing the digital waiver.",
      });
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

  if (!user.isVerified) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Email Verification Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please verify your email before signing the waiver.</p>
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
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Digital Waiver Form</CardTitle>
            <CardDescription>
              Please read and sign the waiver to participate in Pure Game Classic events
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose max-w-none">
              <h3>Pure Game Classic Participation Waiver</h3>
              <p>
                By signing this waiver, I acknowledge and agree to the following terms and conditions
                for participating in the Pure Game Classic events:
              </p>
              <ul>
                <li>
                  I understand that participation in basketball activities involves risks of serious
                  bodily injury, including permanent disability, paralysis, and death.
                </li>
                <li>
                  I voluntarily and knowingly assume all such risks, both known and unknown, even if
                  arising from the negligence of others.
                </li>
                <li>
                  I agree to comply with all stated and customary terms and conditions for
                  participation in the Pure Game Classic.
                </li>
                <li>
                  I will inspect the facilities and equipment to be used, and if I believe anything
                  is unsafe, I will immediately advise event staff of such condition(s).
                </li>
              </ul>
              <p>
                I acknowledge that this Accident Waiver and Release of Liability Form will be used
                by the event holders, sponsors, and organizers of the Pure Game Classic.
              </p>
            </div>

            {user.hasSignedWaiver ? (
              <div className="flex items-center gap-2 text-green-500">
                <FileCheck className="h-5 w-5" />
                <span>Waiver has been signed</span>
              </div>
            ) : (
              <Button
                onClick={() => signWaiverMutation.mutate()}
                disabled={signWaiverMutation.isPending}
                className="w-full"
              >
                {signWaiverMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing Waiver...
                  </>
                ) : (
                  "Sign Digital Waiver"
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
