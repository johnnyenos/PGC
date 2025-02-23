import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from "./lib/protected-route";

import HomePage from "@/pages/home-page";
import PlayersPage from "@/pages/players-page";
import ThreePointPage from "@/pages/three-point-page";
import DunkContestPage from "@/pages/dunk-contest-page";
import AllStarsPage from "@/pages/all-stars-page";
import GiveawayPage from "@/pages/giveaway-page";
import AuthPage from "@/pages/auth-page";
import VerifyEmailPage from "@/pages/verify-email";
import WaiverPage from "@/pages/waiver-page";
import GiveawayEntriesPage from "@/pages/admin/giveaway-entries";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/players" component={PlayersPage} />
      <Route path="/three-point" component={ThreePointPage} />
      <Route path="/dunk-contest" component={DunkContestPage} />
      <Route path="/all-stars" component={AllStarsPage} />
      <ProtectedRoute path="/giveaway" component={GiveawayPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/verify-email" component={VerifyEmailPage} />
      <ProtectedRoute path="/waiver" component={WaiverPage} />
      <ProtectedRoute path="/admin/giveaway-entries" component={GiveawayEntriesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;