import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

function useQueryParams() {
  const [location] = useLocation();
  return new URLSearchParams(location.split("?")[1]);
}

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const params = useQueryParams();
  const token = params.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided");
      return;
    }

    fetch(`/api/verify-email?token=${token}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to verify email");
        }
        setStatus("success");
        setMessage("Email verified successfully!");
      })
      .catch((error) => {
        setStatus("error");
        setMessage(error.message);
      });
  }, [token]);

  return (
    <div className="container min-h-screen grid place-items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4 py-4">
            {status === "loading" && (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Verifying your email...</p>
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <p className="text-center">{message}</p>
                <Link href="/auth">
                  <Button>Proceed to Login</Button>
                </Link>
              </>
            )}
            {status === "error" && (
              <>
                <XCircle className="h-8 w-8 text-red-500" />
                <p className="text-center text-red-500">{message}</p>
                <Link href="/auth">
                  <Button variant="outline">Back to Login</Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
